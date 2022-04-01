class KeyboardInputManager {
  constructor() {
    this.events = {};

      this.eventTouchstart = "touchstart";
      this.eventTouchmove = "touchmove";
      this.eventTouchend = "touchend";

    this.listen();
  }

  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }
  
  emit(event, data) {
    var callbacks = this.events[event];
    if (callbacks) {
      callbacks.forEach(function (callback) {
        callback(data);
      });
    }
  }
  
  listen() {
    var self = this;

    // Button : Direction
    var map = {
      38: 0,
      39: 1,
      40: 2,
      37: 3,
      75: 0,
      76: 1,
      74: 2,
      72: 3,
      87: 0,
      68: 1,
      83: 2,
      65: 3
    };

    // Листнер для нажания кнопок направления
    document.addEventListener("keydown", function (event) {
      var modifiers = event.altKey || event.ctrlKey || event.metaKey ||
        event.shiftKey;
      var mapped = map[event.which];

      if (!modifiers) {
        if (mapped !== undefined) {
          event.preventDefault();
          self.emit("move", mapped);
        }
      }

      // R key - restart
      if (!modifiers && event.which === 82) {
        self.restart.call(self, event);
      }
    });

    // Бинды на кнопки рестарта
    this.bindButtonPress(".retry-button", this.restart);
    this.bindButtonPress(".restart-button", this.restart);

    // Получает контейнер с игрой, чтобы понять в какую сторону двигать по координатам
    var touchStartClientX, touchStartClientY;
    var gameContainer = document.getElementsByClassName("game-container")[0];

    // Листнер для гейм контейнера
    gameContainer.addEventListener(this.eventTouchstart, function (event) {
      if (window.navigator.msPointerEnabled) {
        touchStartClientX = event.pageX;
        touchStartClientY = event.pageY;
      } else {
        touchStartClientX = event.touches[0].clientX;
        touchStartClientY = event.touches[0].clientY;
      }

      event.preventDefault();
    });

    gameContainer.addEventListener(this.eventTouchmove, function (event) {
      event.preventDefault();
    });

    gameContainer.addEventListener(this.eventTouchend, function (event) {
      var touchEndClientX, touchEndClientY;

      if (window.navigator.msPointerEnabled) {
        touchEndClientX = event.pageX;
        touchEndClientY = event.pageY;
      } else {
        touchEndClientX = event.changedTouches[0].clientX;
        touchEndClientY = event.changedTouches[0].clientY;
      }

      var dx = touchEndClientX - touchStartClientX;
      var absDx = Math.abs(dx);

      var dy = touchEndClientY - touchStartClientY;
      var absDy = Math.abs(dy);

      if (Math.max(absDx, absDy) > 10) {
        // (right : left) : (down : up)
        self.emit("move", absDx > absDy ? (dx > 0 ? 1 : 3) : (dy > 0 ? 2 : 0));
      }
    });
  }

  restart(event) {
    event.preventDefault();
    this.emit("restart");
  }

  bindButtonPress(selector, fn) {
    var button = document.querySelector(selector);
    button.addEventListener("click", fn.bind(this));
    button.addEventListener(this.eventTouchend, fn.bind(this));
  }
}







