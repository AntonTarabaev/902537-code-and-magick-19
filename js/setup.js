'use strict';

(function () {
  var WIZARDS_COUNT = 4;
  var WIZARDS_INFO = {
    WIZARD_NAMES: [
      'Иван',
      'Хуан Себастьян',
      'Мария',
      'Кристоф',
      'Виктор',
      'Юлия',
      'Люпита',
      'Вашингтон'
    ],
    WIZARD_SURNAMES: [
      'да Марья',
      'Верон',
      'Мирабелла',
      'Вальц',
      'Онопко',
      'Топольницкая',
      'Нионго',
      'Ирвинг'
    ],
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

  var getWizardName = function (names, surnames) {
    return Math.random() < 0.5
      ? window.util.getArrRandElement(names) + ' ' + window.util.getArrRandElement(surnames)
      : window.util.getArrRandElement(surnames) + ' ' + window.util.getArrRandElement(names);
  };

  var createWizard = function () {
    var wizard = {
      name: getWizardName(WIZARDS_INFO.WIZARD_NAMES, WIZARDS_INFO.WIZARD_SURNAMES),
      coatColor: window.util.getArrRandElement(WIZARDS_INFO.COAT_COLORS),
      eyesColor: window.util.getArrRandElement(WIZARDS_INFO.EYES_COLORS)
    };
    return wizard;
  };

  var generateWizards = function (wizardsCount) {
    var wizards = [];

    for (var i = 0; i < wizardsCount; i++) {
      wizards[i] = createWizard();
    }

    return wizards;
  };

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return wizardElement;
  };

  var renderWizards = function (wizardsArr) {
    var fragment = document.createDocumentFragment();

    for (var j = 0; j < wizardsArr.length; j++) {
      fragment.appendChild(renderWizard(wizardsArr[j]));
    }

    return fragment;
  };

  window.colorize(userWizardCoat, userWizardCoatColor, WIZARDS_INFO.COAT_COLORS);
  window.colorize(userWizardEyes, userWizardEyesColor, WIZARDS_INFO.EYES_COLORS);
  window.colorize(userWizardFireball, userWizardFireballColor, WIZARDS_INFO.FIREBALL_COLORS);

  var wizards = generateWizards(WIZARDS_COUNT);
  similarListElement.appendChild(renderWizards(wizards));
  userDialog.querySelector('.setup-similar').classList.remove('hidden');
})();
