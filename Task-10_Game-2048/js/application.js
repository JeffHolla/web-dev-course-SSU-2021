// Ждём пока браузер будет готов рендерить игру
window.requestAnimationFrame(function () {
  new GameManager(4, KeyboardInputManager, HTMLStructChanger, LocalStorageManager);
});
