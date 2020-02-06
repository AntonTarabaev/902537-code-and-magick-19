'use strict';

(function () {
  var userDialog = document.querySelector('.setup');
  var setupClose = userDialog.querySelector('.setup-close');
  var setupOpen = document.querySelector('.setup-open');
  var userNameInput = userDialog.querySelector('.setup-user-name');
  var startPosition = {
    x: userDialog.style.left,
    y: userDialog.style.top
  };

  var resetCoords = function () {
    userDialog.style.top = startPosition.y;
    userDialog.style.left = startPosition.x;
  };

  var onPopupEscPress = function (evt) {
    window.util.isEscEvent(evt, closePopup);
  };

  var openPopup = function () {
    userDialog.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  var closePopup = function () {
    userDialog.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
    resetCoords();
  };

  setupOpen.addEventListener('click', function () {
    openPopup();
  });

  setupOpen.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, openPopup);
  });

  setupClose.addEventListener('click', function () {
    closePopup();
  });

  setupClose.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, closePopup);
  });

  userNameInput.addEventListener('keydown', function (evt) {
    // Можешь прокомментировать такое решение? Изначально пробовал:
    // userNameInput.addEventListener('keydown', function (evt) {
    //  window.util.isEscEvent(evt, evt.stopPropagation);
    // };
    // Но это не работало и решил сделать так
    window.util.stopEscPropagation(evt);
  });
})();
