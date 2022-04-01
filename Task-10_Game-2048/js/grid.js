class Grid {
  constructor(size, previousState) {
    this.size = size;
    this.cells = previousState ? this.fromState(previousState) : this.empty();
  }

  // Создаём сетку с параметрами, которые переданны через конструктор
  empty() {
    var cells = [];

    for (var x = 0; x < this.size; x++) {
      var row = cells[x] = [];

      for (var y = 0; y < this.size; y++) {
        row.push(null);
      }
    }

    return cells;
  }

  fromState(state) {
    var cells = [];

    for (var x = 0; x < this.size; x++) {
      var row = cells[x] = [];

      for (var y = 0; y < this.size; y++) {
        var tile = state[x][y];
        row.push(tile ? new Tile(tile.position, tile.value) : null);
      }
    }

    return cells;
  }

  // Находим первую рандомную пустую клетку
  randomAvailableCell() {
    var cells = this.availableCells();

    if (cells.length) {
      return cells[Math.floor(Math.random() * cells.length)];
    }
  }

  availableCells() {
    var cells = [];

    this.eachCell(function (x, y, tile) {
      if (!tile) {
        cells.push({ x: x, y: y });
      }
    });

    return cells;
  }

  // Применяем действие для каждой клетки, он же callBack в js
  eachCell(callback) {
    for (var x = 0; x < this.size; x++) {
      for (var y = 0; y < this.size; y++) {
        callback(x, y, this.cells[x][y]);
      }
    }
  }

  // Проверка на доступность клеток
  cellsAvailable() {
    return !!this.availableCells().length;
  }

  cellAvailable(cell) {
    return !this.cellOccupied(cell);
  }

  cellOccupied(cell) {
    return !!this.cellContent(cell);
  }

  cellContent(cell) {
    // если в пределах границ
    if (this.withinBounds(cell)) {
      return this.cells[cell.x][cell.y];
    } else {
      return null;
    }
  }

  // Добавляем тайл
  insertTile(tile) {
    this.cells[tile.x][tile.y] = tile;
  }

  // Удаляем тайл довольно простым способом, просто присваиваем null
  removeTile(tile) {
    this.cells[tile.x][tile.y] = null;
  }

  // Проверяем границы
  withinBounds(position) {
    return position.x >= 0 && position.x < this.size &&
      position.y >= 0 && position.y < this.size;
  }

  // ToString
  serialize() {
    var cellState = [];

    for (var x = 0; x < this.size; x++) {
      var row = cellState[x] = [];

      for (var y = 0; y < this.size; y++) {
        row.push(this.cells[x][y] ? this.cells[x][y].serialize() : null);
      }
    }

    return {
      size: this.size,
      cells: cellState
    };
  }
}














