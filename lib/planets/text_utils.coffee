text = (text, x, y) ->
  canvas = document.getElementById('canvas')
  if not canvas? 
    return 
  
  context = canvas.getContext("2d")
  context.fillStyle = 'gray'
  context.font = '6px sans-serif'
  context.textBaseline = "middle"
  context.textAlign = "center"
  context.fillText(text, x, y)

arcText = (text, planet) ->
  canvas = document.getElementById('canvas')
  if not canvas? 
    return 
  
  context = canvas.getContext("2d")
  context.fillStyle = 'black'
  #context.font = "bold 32px 'Inconsolata'"
  #context.font = "bold 48px 'Tangerine'"
  context.font = "32px 'Love Ya Like A Sister'"
  #context.shadowOffsetX = 1
  #context.shadowOffsetY = 1
  #context.shadowBlur    = 0
  #context.shadowColor   = 'rgba(200, 200, 200, 0.8)'
  context.textBaseline = "middle"
  context.textAlign = "center"

  centerX = planet.x
  centerY = planet.y
  radius = (planet.size / 2) + 75
  angle = Math.min(Math.PI / 2 + (text.length / 10), Math.PI * 2)

  drawTextAlongArc(context, text, centerX, centerY, radius, angle, 0)

drawTextAlongArc = (context, str, centerX, centerY, radius, angle, a) ->
  context.save()
  context.translate(centerX, centerY)
  context.rotate(a + (-1) * angle / 2)
  context.rotate(-1 * (angle / str.length) / 2)
  for n in [0...str.length]
    context.rotate(angle / str.length)
    context.save()
    context.translate(0, (-1) * radius)
    char = str[n]
    context.fillText(char, 0, 0)
    context.restore()
  context.restore()

printAtWordWrap = (context, text, x, y, lineHeight, fitWidth) ->
  fitWidth = fitWidth || 0
  lineHeight = lineHeight || 20

  currentLine = 0

  lines = text.split(/\r\n|\r|\n/)
  for line in [0...lines.length]
    if (fitWidth <= 0)
      context.fillText(lines[line], x, y + (lineHeight * currentLine))
    else
      words = lines[line].split(' ')
      idx = 1
      while (words.length > 0 && idx <= words.length)
        str = words.slice(0, idx).join(' ')
        w = context.measureText(str).width
        if (w > fitWidth)
          if (idx == 1)
            idx = 2;
          context.fillText(words.slice(0, idx - 1).join(' '), x, y + (lineHeight * currentLine))
          currentLine++
          words = words.splice(idx - 1)
          idx = 1
        else
          idx++
      if (idx > 0)
          context.fillText(words.join(' '), x, y + (lineHeight * currentLine))
    currentLine++