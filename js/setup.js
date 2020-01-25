'use strict';

var WIZARDS_COUNT = 4;
var WIZARD_INFO = {
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
  ]
};

var userDialog = document.querySelector('.setup');
var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var getArrRandElement = function (arr) {
  var rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
};

var getWizardName = function (names, surnames) {
  return Math.random() < 0.5
    ? getArrRandElement(names) + ' ' + getArrRandElement(surnames)
    : getArrRandElement(surnames) + ' ' + getArrRandElement(names);
};

var createWizard = function () {
  var wizard = {
    name: getWizardName(WIZARD_INFO.WIZARD_NAMES, WIZARD_INFO.WIZARD_SURNAMES),
    coatColor: getArrRandElement(WIZARD_INFO.COAT_COLORS),
    eyesColor: getArrRandElement(WIZARD_INFO.EYES_COLORS)
  };
  return wizard;
};

var wizards = [];
for (var i = 0; i < WIZARDS_COUNT; i++) {
  wizards[i] = createWizard();
}

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

// Лучше же не создавать такие функции и делать, как сделано ниже?
// var includeWizards = function (wizardsArr) {
//   var fragment = document.createDocumentFragment();

//   for (var i = 0; i < wizardsArr.length; i++) {
//     fragment.appendChild(renderWizard(wizardsArr[i]));
//   }

//   return fragment;
// };
// similarListElement.appendChild(includeWizard(wizards));

var fragment = document.createDocumentFragment();
for (var j = 0; j < wizards.length; j++) {
  fragment.appendChild(renderWizard(wizards[j]));
}
similarListElement.appendChild(fragment);

userDialog.classList.remove('hidden');
userDialog.querySelector('.setup-similar').classList.remove('hidden');
