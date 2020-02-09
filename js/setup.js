'use strict';

(function () {
  var WIZARDS_COUNT = 4;
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
  var similarListElement = userDialog.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };

  var onSuccess = function (wizards) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < WIZARDS_COUNT; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }
    similarListElement.appendChild(fragment);

    userDialog.querySelector('.setup-similar').classList.remove('hidden');
  };

  var onError = function (errorMessage) {
    var node = document.createElement('div');

    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(onSuccess, onError);

  window.colorize(userWizardCoat, userWizardCoatColor, WIZARDS_INFO.COAT_COLORS);
  window.colorize(userWizardEyes, userWizardEyesColor, WIZARDS_INFO.EYES_COLORS);
  window.colorize(userWizardFireball, userWizardFireballColor, WIZARDS_INFO.FIREBALL_COLORS);

  window.onError = onError;
})();
