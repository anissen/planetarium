var arcText, drawTextAlongArc, printAtWordWrap, text;

text = function(text, x, y) {
  var canvas, context;
  canvas = document.getElementById('canvas');
  if (!(canvas != null)) return;
  context = canvas.getContext("2d");
  context.fillStyle = 'gray';
  context.font = '6px sans-serif';
  context.textBaseline = "middle";
  context.textAlign = "center";
  return context.fillText(text, x, y);
};

arcText = function(text, planet) {
  var angle, canvas, centerX, centerY, context, radius;
  canvas = document.getElementById('canvas');
  if (!(canvas != null)) return;
  context = canvas.getContext("2d");
  context.fillStyle = 'black';
  context.font = "32px 'Love Ya Like A Sister'";
  context.textBaseline = "middle";
  context.textAlign = "center";
  centerX = planet.x;
  centerY = planet.y;
  radius = (planet.size / 2) + 75;
  angle = Math.min(Math.PI / 2 + (text.length / 10), Math.PI * 2);
  return drawTextAlongArc(context, text, centerX, centerY, radius, angle, 0);
};

drawTextAlongArc = function(context, str, centerX, centerY, radius, angle, a) {
  var char, n, _ref;
  context.save();
  context.translate(centerX, centerY);
  context.rotate(a + (-1) * angle / 2);
  context.rotate(-1 * (angle / str.length) / 2);
  for (n = 0, _ref = str.length; 0 <= _ref ? n < _ref : n > _ref; 0 <= _ref ? n++ : n--) {
    context.rotate(angle / str.length);
    context.save();
    context.translate(0, (-1) * radius);
    char = str[n];
    context.fillText(char, 0, 0);
    context.restore();
  }
  return context.restore();
};

printAtWordWrap = function(context, text, x, y, lineHeight, fitWidth) {
  var currentLine, idx, line, lines, str, w, words, _ref, _results;
  fitWidth = fitWidth || 0;
  lineHeight = lineHeight || 20;
  currentLine = 0;
  lines = text.split(/\r\n|\r|\n/);
  _results = [];
  for (line = 0, _ref = lines.length; 0 <= _ref ? line < _ref : line > _ref; 0 <= _ref ? line++ : line--) {
    if (fitWidth <= 0) {
      context.fillText(lines[line], x, y + (lineHeight * currentLine));
    } else {
      words = lines[line].split(' ');
      idx = 1;
      while (words.length > 0 && idx <= words.length) {
        str = words.slice(0, idx).join(' ');
        w = context.measureText(str).width;
        if (w > fitWidth) {
          if (idx === 1) idx = 2;
          context.fillText(words.slice(0, idx - 1).join(' '), x, y + (lineHeight * currentLine));
          currentLine++;
          words = words.splice(idx - 1);
          idx = 1;
        } else {
          idx++;
        }
      }
      if (idx > 0) {
        context.fillText(words.join(' '), x, y + (lineHeight * currentLine));
      }
    }
    _results.push(currentLine++);
  }
  return _results;
};
