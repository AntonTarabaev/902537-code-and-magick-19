'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 20;
var GRAPH_GAP = 40;
var GRAPH_HEIGHT = 150;
var COLUMN_GAP = 50;
var BAR_MAX_HEIGHT = GRAPH_HEIGHT - FONT_GAP;
var BAR_WIDTH = 40;
var messageTextByLines = ['Ура вы победили!', 'Список результатов:'];

var renderCloud = function (ctx, x, y, width, heigth, color) {
  var offset = 10;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + offset, y + heigth / 2);
  ctx.lineTo(x, y + heigth);
  ctx.lineTo(x + width / 2, y + heigth - offset);
  ctx.lineTo(x + width, y + heigth);
  ctx.lineTo(x + width - offset, y + heigth / 2);
  ctx.lineTo(x + width, y);
  ctx.lineTo(x + width / 2, y + offset);
  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.closePath();
  ctx.fill();
};

var canvasTextMultiLines = function (ctx, textsArr, color, font, x, y, lineHeight) {
  for (var i = 0; i < textsArr.length; i++) {
    ctx.fillStyle = color;
    ctx.font = font;
    ctx.textBaseline = 'hanging';
    ctx.fillText(textsArr[i], x, y + lineHeight * i);
  }
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

var getBarHeight = function (value, maxValue) {
  return BAR_MAX_HEIGHT * value / maxValue;
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, CLOUD_WIDTH, CLOUD_HEIGHT, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT, '#ffffff');

  canvasTextMultiLines(ctx, messageTextByLines, '#000000', '16px PT Mono', CLOUD_X + FONT_GAP, CLOUD_Y + FONT_GAP, FONT_GAP);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    ctx.fillStyle = '#000000';
    ctx.fillText(names[i], CLOUD_X + GRAPH_GAP + (COLUMN_GAP + BAR_WIDTH) * i, CLOUD_HEIGHT + FONT_GAP - GRAPH_GAP);
    ctx.fillText(Math.ceil(times[i]), CLOUD_X + GRAPH_GAP + (COLUMN_GAP + BAR_WIDTH) * i, CLOUD_Y + CLOUD_HEIGHT - (getBarHeight(times[i], maxTime) + GRAPH_GAP + FONT_GAP));
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'rgba(0, 0, 255, ' + Math.random() + ')';
    }
    ctx.fillRect(CLOUD_X + GRAPH_GAP + (COLUMN_GAP + BAR_WIDTH) * i, CLOUD_Y + CLOUD_HEIGHT - (getBarHeight(times[i], maxTime) + GRAPH_GAP), BAR_WIDTH, getBarHeight(times[i], maxTime));
  }
};
