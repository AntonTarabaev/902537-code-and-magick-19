'use strict';

(function () {
  var WIZARDS_INFO = {
    COAT_COLORS: [
      'rgb(101, 137, 164)',
      'rgb(241, 43, 107)',
      'rgb(146, 100, 161)',
      'rgb(56, 159, 117)',
      'rgb(215, 210, 55)',
      'rgb(0, 0, 0)'
    ],
    EYES_COLORS: [
      'black',
      'red',
      'blue',
      'yellow',
      'green'
    ],
    FIREBALL_COLORS: [
      '#ee4830',
      '#30a8ee',
      '#5ce6c0',
      '#e848d5',
      '#e6e848'
    ]
  };

  var userDialog = document.querySelector('.setup');
  var userWizardCoat = userDialog.querySelector('.wizard-coat');
  var userWizardCoatColor = userDialog.querySelector('input[name="coat-color"]');
  var userWizardEyes = userDialog.querySelector('.wizard-eyes');
  var userWizardEyesColor = userDialog.querySelector('input[name="eyes-color"]');
  var userWizardFireball = userDialog.querySelector('.setup-fireball-wrap');
  var userWizardFireballColor = userDialog.querySelector('input[name="fireball-color"]');

  var wizard = {
    onEyesChange: function () {},
    onCoatChange: function () {}
  };

  var colorize = function (element, input, colorsArr) {
    var currentColor = input.value;
    var color = window.util.getNextArrEl(currentColor, colorsArr);

    if (element.tagName.toLowerCase() === 'div') {
      element.style.backgroundColor = color;
      input.value = color;
    } else {
      element.style.fill = color;
      input.value = color;
    }
  };

  userWizardCoat.addEventListener('click', function () {
    colorize(userWizardCoat, userWizardCoatColor, WIZARDS_INFO.COAT_COLORS);
    wizard.onCoatChange(userWizardCoatColor.value);
  });

  userWizardEyes.addEventListener('click', function () {
    colorize(userWizardEyes, userWizardEyesColor, WIZARDS_INFO.EYES_COLORS);
    wizard.onEyesChange(userWizardEyesColor.value);
  });

  userWizardFireball.addEventListener('click', function () {
    colorize(userWizardFireball, userWizardFireballColor, WIZARDS_INFO.FIREBALL_COLORS);
  });

  window.wizard = wizard;
})();
