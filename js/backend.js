'use strict';

(function () {
  var URL = 'https://js.dump.academy/code-and-magick';
  var StatusCode = {
    OK: 200
  };
  var TIMEOUT_IN_MS = 10000;

  var onXhrLoad = function (xhr, onLoad, onError) {
    if (xhr.status === StatusCode.OK) {
      onLoad(xhr.response);
    } else {
      onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
    }
  };

  var addXhrListeners = function (xhr, onLoad, onError) {
    xhr.addEventListener('load', function () {
      onXhrLoad(xhr, onLoad, onError);
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
  };

  window.backend = {
    load: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      addXhrListeners(xhr, onLoad, onError);

      xhr.timeout = TIMEOUT_IN_MS;

      xhr.open('GET', URL + '/data');
      xhr.send();
    },
    save: function (data, onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      addXhrListeners(xhr, onLoad, onError);

      xhr.timeout = TIMEOUT_IN_MS;

      xhr.open('POST', URL);
      xhr.send(data);
    }
  };
})();
