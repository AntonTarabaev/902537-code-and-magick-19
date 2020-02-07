'use strict';

(function () {
  window.colorize = function (element, input, colorsArr) {
    element.addEventListener('click', function () {
      var currentColor = input.value;
      var color = window.util.getNextArrEl(currentColor, colorsArr);
      if (element.tagName.toLowerCase() === 'div') {
        element.style.backgroundColor = color;
        input.value = color;
      } else {
        element.style.fill = color;
        input.value = color;
      }
    });
  };
})();
