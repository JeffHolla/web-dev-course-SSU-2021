class GameManager {
  constructor(size, InputManager, HTMLChangeManager, StorageManager) {
    this.size = size; // Размер сетки для игры
    this.inputManager = new InputManager;
    this.storageManager = new StorageManager;
    this.htmlManager = new HTMLChangeManager;

    this.startTiles = 2; // Кол-во стартовых тайлов

    this.inputManager.on("move", this.move.bind(this));
    this.inputManager.on("restart", this.restart.bind(this));

    this.setup();
  }

  // Метод для перезапуска игры
  restart() {
    this.storageManager.clearGameState();
    this.htmlManager.continueGame(); // Просто очищает сообщение о состоянии игры
    this.setup();
  }

  // Кнопка продолжения игры
  keepPlaying() {
    this.keepPlaying = true;
    this.htmlManager.continueGame(); // Очищаем сообщения о победе/проигрыше
  }

  // Уничтожаем игру, если выиграли или рестартнули
  isGameTerminated() {
    return this.over || (this.won && !this.keepPlaying);
  }

  // Первоначальная настройка игры (чтобы всё не выносить в конструктор)
  setup() {
    var previousState = this.storageManager.getGameState();

    // Если есть что-то у нас в localStorage, то пытаемся восстановит состояния
    if (previousState) {
      // Для этого просто воссоздаём сетку снова
      this.grid = new Grid(previousState.grid.size, previousState.grid.cells); 
      this.score = previousState.score;
      this.over = previousState.over;
      this.won = previousState.won;
      this.keepPlaying = previousState.keepPlaying;
    } else {
      this.grid = new Grid(this.size);
      this.score = 0;
      this.over = false;
      this.won = false;
      this.keepPlaying = false;

      // Добавляем парочку начальных тайлов (случайным образом выбираем)
      for (var i = 0; i < this.startTiles; i++) {
        this.addRandomTile();
      }
    }

    // Обновляем ченджер
    this.toChange();
  }

  // Добавляем тайл в случаное СВОБОДНОЕ место
  addRandomTile() {
    if (this.grid.cellsAvailable()) {
      var value = Math.random() < 0.9 ? 2 : 4;
      // В randomAvaibleCell ищем свободное место
      var tile = new Tile(this.grid.randomAvailableCell(), value);

      this.grid.insertTile(tile);
    }
  }

  // Выполняем действия с ченджером html (производим всю обработку внешнюю)
  toChange() {
    // Берём из localStorage BestScore и, если больше, сохраняем обратно 
    if (this.storageManager.getBestScore() < this.score) {
      this.storageManager.setBestScore(this.score);
    }

    // Сохраняем состояние игры в localStorage
    if (this.over) {
      this.storageManager.clearGameState();
    } else {
      this.storageManager.setGameState(this.serialize());
    }

    this.htmlManager.toChange(this.grid, {
      score: this.score,
      over: this.over,
      won: this.won,
      bestScore: this.storageManager.getBestScore(),
      terminated: this.isGameTerminated()
    });

  }

  // ToString
  serialize() {
    return {
      grid: this.grid.serialize(),
      score: this.score,
      over: this.over,
      won: this.won,
      keepPlaying: this.keepPlaying
    };
  }

  // Сохраняем состояния всех тайлов во время передвижения
  prepareTiles() {
    this.grid.eachCell(function (x, y, tile) {
      if (tile) {
        tile.mergedFrom = null;
        tile.savePosition();
      }
    });
  }

  // Сдвигаем ОДИН тайл
  moveTile(tile, cell) {
    this.grid.cells[tile.x][tile.y] = null;
    this.grid.cells[cell.x][cell.y] = tile;
    tile.updatePosition(cell);
  }

  // Сдвигаем ВСЕ тайлы в направлении
  move(direction) {
    // 0: up, 1: right, 2: down, 3: left
    var self = this;

    var cell, tile;

    var vector = this.getVector(direction);
    var traversals = this.buildTraversals(vector);
    var moved = false;

    // Сохраняем состояния всех тайлов во время передвижения
    this.prepareTiles();

    // Сдвигаем по осям и делаем слияние тайлов, если есть
    traversals.x.forEach(function (x) {
      traversals.y.forEach(function (y) {
        cell = { x: x, y: y };
        tile = self.grid.cellContent(cell);

        if (tile) {
          var positions = self.findMostFarPosition(cell, vector);
          var next = self.grid.cellContent(positions.next);

          // Если в ряду только одно слияние, то делаем его и уничтожаем идущее за ним
          if (next && next.value === tile.value && !next.mergedFrom) {
            var merged = new Tile(positions.next, tile.value * 2);
            merged.mergedFrom = [tile, next];

            self.grid.insertTile(merged);
            self.grid.removeTile(tile);

            // Обновляем позицию соединённых тайлов
            tile.updatePosition(positions.next);

            // Обновлем очки
            self.score += merged.value;

            // Если счёт полученного тайла равен 2048,
            // То считаем, что игрок выиграл
            if (merged.value === 2048)
              self.won = true;
          } else {
            self.moveTile(tile, positions.farthest);
          }
          
          // Если текущее положение не равно преддыщему
          if (!self.positionsEqual(cell, tile)) {
            moved = true; // Значит запоминаем, что клетка двинулась
          }
        }
      });
    });

    // Проверям двинулась ли хоть одна клетка
    if (moved) {
      this.addRandomTile();

      // Если ни одна клетка не двинулась, то есть нет доступных движений
      if (!this.movesAvailable()) {
        this.over = true; // Тогда считаем, что игрок проиграл
      }

      this.toChange();
    }
  }

  // Мапа для направлений по координатам
  getVector(direction) {
    var map = {
      0: { x: 0, y: -1 },//Up
      1: { x: 1, y: 0 }, // Down
      2: { x: 0, y: 1 }, // Right
      3: { x: -1, y: 0 } // Left
    };

    return map[direction];
  }

  // Важный метод, который строит пути перещения клеток
  buildTraversals(vector) {
    var traversals = { x: [], y: [] };

    for (var pos = 0; pos < this.size; pos++) {
      traversals.x.push(pos);
      traversals.y.push(pos);
    }

    // Строим пути перемещения с самого дальнего тайла
    if (vector.x === 1)
      traversals.x = traversals.x.reverse();
    if (vector.y === 1)
      traversals.y = traversals.y.reverse();

    return traversals;
  }

  // Ищем самую дальнюю позицию
  findMostFarPosition(cell, vector) {
    var previous;

    // Прокладываем путь до того момента, как упрёмся в тупик
    do {
      previous = cell;
      cell = { x: previous.x + vector.x, y: previous.y + vector.y };
    } while (this.grid.withinBounds(cell) &&
      this.grid.cellAvailable(cell));

    return {
      farthest: previous,
      next: cell // Если нашли тупик, но можем при этом сделать слияние
    };
  }

  // Есть ли вообще ходы
  movesAvailable() {
    return this.grid.cellsAvailable() || this.tileMatchesAvailable();
  }

  // Проверка на возможность слияния (нужно два одинаковых по значению тайла)
  tileMatchesAvailable() {
    var self = this;

    var tile;

    for (var x = 0; x < this.size; x++) {
      for (var y = 0; y < this.size; y++) {
        tile = this.grid.cellContent({ x: x, y: y });

        if (tile) {
          for (var direction = 0; direction < 4; direction++) {
            var vector = self.getVector(direction);
            var cell = { x: x + vector.x, y: y + vector.y };

            var other = self.grid.cellContent(cell);

            // Если же их значения равны, то тогда можем их соединить
            if (other && other.value === tile.value) {
              return true; 
            }
          }
        }
      }
    }

    return false;
  }

  // Проверка на движение
  positionsEqual(first, second) {
    return first.x === second.x && first.y === second.y;
  }
}