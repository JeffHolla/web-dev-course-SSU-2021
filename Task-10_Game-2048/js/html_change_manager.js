class HTMLStructChanger {
  constructor() {
    this.tileContainer = document.querySelector(".tile-container");
    this.scoreContainer = document.querySelector(".score-container");
    this.bestContainer = document.querySelector(".best-container");
    this.messageContainer = document.querySelector(".game-message");

    this.score = 0;
  }

  toChange(grid, metadata) {
    var self = this;

    window.requestAnimationFrame(function () {
      self.clearContainer(self.tileContainer);

      grid.cells.forEach(function (column) {
        column.forEach(function (cell) {
          if (cell) {
            self.addTile(cell);
          }
        });
      });

      self.updateScore(metadata.score);
      self.updateBestScore(metadata.bestScore);

      if (metadata.terminated) {
        if (metadata.over) {
          self.message(false); // Выводим сообщение о проигрыше
        } else if (metadata.won) {
          self.message(true); // Выводим сообщение о победе
        }
      }

    });
  }

  // Очищаем сообщения об окончании игры
  continueGame() {
    this.clearMessage();
  }

  // Удаляем из контейнера все элементы
  clearContainer(container) {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  }

  // Добавляем тайл визуально
  addTile(tile) {
    var self = this;

    var wrapper = document.createElement("div");
    var inner = document.createElement("div");
    var position = tile.previousPosition || { x: tile.x, y: tile.y };
    var positionClass = this.positionClass(position);

    var classes = ["tile", "tile-" + tile.value, positionClass];

    if (tile.value > 2048)
      classes.push("tile-super");

    this.applyClasses(wrapper, classes);

    inner.classList.add("tile-inner");
    inner.textContent = tile.value;

    if (tile.previousPosition) {
      window.requestAnimationFrame(function () {
        classes[2] = self.positionClass({ x: tile.x, y: tile.y });
        self.applyClasses(wrapper, classes); // Обновляем визуально клетки
      });
    } else if (tile.mergedFrom) {
      // classes.push("tile-merged");
      // this.applyClasses(wrapper, classes);

      // // Попытка сделать анимацию слияния тайлов, но так себе
      // tile.mergedFrom.forEach(function (merged) {
      //   self.addTile(merged);
      // });
    } else {
      classes.push("tile-new");
      this.applyClasses(wrapper, classes);
    }

    wrapper.appendChild(inner);

    // Расставляем все тайлы
    this.tileContainer.appendChild(wrapper);
  }

  // Применяет класс к элементу (для изменения цвета у тайлов)
  applyClasses(element, classes) {
    element.setAttribute("class", classes.join(" "));
  }

  normalizePosition(position) {
    return { x: position.x + 1, y: position.y + 1 };
  }

  // Обрабатывает позии тайлов
  positionClass(position) {
    position = this.normalizePosition(position);
    return "tile-position-" + position.x + "-" + position.y;
  }

  // Обновление очков после каждого хода
  updateScore(score) {
    this.clearContainer(this.scoreContainer);

    this.score = score;

    this.scoreContainer.textContent = this.score;
  }

  // Метод для обновления лучших очков
  // Работает через localStorage
  updateBestScore(bestScore) {
    this.bestContainer.textContent = bestScore;
  }

  // Меняем и выводим список сообщений
  message(won) {
    var type = won ? "game-won" : "game-over";
    var message = won ? "You win!" : "Game over!";

    this.messageContainer.classList.add(type);
    this.messageContainer.getElementsByTagName("p")[0].textContent = message;
  }
  
  // Очищаем список сообщений
  clearMessage() {
    this.messageContainer.classList.remove("game-won");
    this.messageContainer.classList.remove("game-over");
  }
}












