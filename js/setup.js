'use strict';

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
var MIN_NAME_LENGTH = 2;
var MAX_NAME_LENGTH = 25;
var KeyCode = {
  ESC: 'Escape',
  ENTER: 'Enter'
};

var userDialog = document.querySelector('.setup');
var userNameInput = userDialog.querySelector('.setup-user-name');
var userWizardCoat = userDialog.querySelector('.wizard-coat');
var userWizardCoatColor = userDialog.querySelector('input[name="coat-color"]');
var userWizardEyes = userDialog.querySelector('.wizard-eyes');
var userWizardEyesColor = userDialog.querySelector('input[name="eyes-color"]');
var userWizardFireball = userDialog.querySelector('.setup-fireball-wrap');
var userWizardFireballColor = userDialog.querySelector('input[name="fireball-color"]');
var similarListElement = userDialog.querySelector('.setup-similar-list');
var setupClose = userDialog.querySelector('.setup-close');
var setupOpen = document.querySelector('.setup-open');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var getArrRandElement = function (arr) {
  return arr[getRandomInt(0, arr.length)];
};

var getNextArrEl = function (currentArrElement, arr) {
  return arr.indexOf(currentArrElement) + 1 > arr.length - 1
    ? arr[0]
    : arr[arr.indexOf(currentArrElement) + 1];
};

var getWizardName = function (names, surnames) {
  return Math.random() < 0.5
    ? getArrRandElement(names) + ' ' + getArrRandElement(surnames)
    : getArrRandElement(surnames) + ' ' + getArrRandElement(names);
};

var createWizard = function () {
  var wizard = {
    name: getWizardName(WIZARDS_INFO.WIZARD_NAMES, WIZARDS_INFO.WIZARD_SURNAMES),
    coatColor: getArrRandElement(WIZARDS_INFO.COAT_COLORS),
    eyesColor: getArrRandElement(WIZARDS_INFO.EYES_COLORS)
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

var onPopupEscPress = function (evt) {
  if (evt.key === KeyCode.ESC) {
    closePopup();
  }
};

var openPopup = function () {
  userDialog.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  userDialog.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

var getNextCoatColor = function () {
  var nextColor = getNextArrEl(userWizardCoatColor.value, WIZARDS_INFO.COAT_COLORS);

  userWizardCoat.style.fill = nextColor;
  userWizardCoatColor.value = nextColor;
};

var getNextEyesColor = function () {
  var nextColor = getNextArrEl(userWizardEyesColor.value, WIZARDS_INFO.EYES_COLORS);

  userWizardEyes.style.fill = nextColor;
  userWizardEyesColor.value = nextColor;
};

var getNextFireballColor = function () {
  var nextColor = getNextArrEl(userWizardFireballColor.value, WIZARDS_INFO.FIREBALL_COLORS);

  userWizardFireball.style.backgroundColor = nextColor;
  userWizardFireballColor.value = nextColor;
};

var validateUserName = function () {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из ' + MIN_NAME_LENGTH + '-х символов');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя не должно превышать ' + MAX_NAME_LENGTH + '-ти символов');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  } else {
    userNameInput.setCustomValidity('');
  }
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.key === KeyCode.ENTER) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.key === KeyCode.ENTER) {
    closePopup();
  }
});

userNameInput.addEventListener('keydown', function (evt) {
  if (evt.key === KeyCode.ESC) {
    evt.stopPropagation();
  }
});

userNameInput.addEventListener('invalid', function () {
  validateUserName();
});

userWizardCoat.addEventListener('click', function () {
  getNextCoatColor();
});

userWizardEyes.addEventListener('click', function () {
  getNextEyesColor();
});

userWizardFireball.addEventListener('click', function () {
  getNextFireballColor();
});

var wizards = generateWizards(WIZARDS_COUNT);
similarListElement.appendChild(renderWizards(wizards));
userDialog.querySelector('.setup-similar').classList.remove('hidden');
