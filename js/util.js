'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  window.util = {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    },
    stopEscPropagation: function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        evt.stopPropagation();
      }
    },
    getRandomInt: function (min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    },
    getArrRandElement: function (arr) {
      return arr[this.getRandomInt(0, arr.length)];
    },
    getNextArrEl: function (currentArrElement, arr) {
      return arr.indexOf(currentArrElement) + 1 > arr.length - 1
        ? arr[0]
        : arr[arr.indexOf(currentArrElement) + 1];
    }
  };
})();
