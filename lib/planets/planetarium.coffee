sketch ->
  @setup = =>
    @size(940, 400)
    @frameRate(30)
    @smooth()

    @zoomCount = 0
    @zoomMax = 20
    @zoomedPlanet = null
    @zoom = false

    @scaleLevel = 0.8

    @scrollbarWidth = 70
    @scrollSpeed = 10

    @mouseFocus = false

    @translateX = 1000/2
    @translateY = 400/2

    @starfield = new Starfield(@, 2000, 1000, 1000)

    @planets = []

    for game in games.projects.project
      @planets.push @createNewRandomPlanet(@planets, game)

    @setupMouseWheel()

  @createNewRandomPlanet = (planets, game) ->
    r = @random(@TWO_PI)
    size = 50 + @random(150)
    halfsize = size / 2
    x = @cos(r) * @random(1000 - halfsize)
    y = @sin(r) * @random(1000 - halfsize)
    minDistBetweenPlanets = 70

    for p in planets
      if @dist(x, y, p.x, p.y) < (halfsize + (p.size / 2) + minDistBetweenPlanets)
        return @createNewRandomPlanet(planets, game)

    rotationSpeed = @PI / (500 + @random(1500))
    name = game.name

    new Planet(@, x, y, size, rotationSpeed, name, game)

  @setupMouseWheel = =>
    me = this
    invokeMouseWheelFunction = (evt) ->
      evt.preventDefault()
      me.mouseWheel wheelDirection(evt)

    wheelDirection = (evt) ->
      if (!evt)
        evt = event
      if evt.detail < 0
        1
      else
        if evt.wheelDelta > 0
          1
        else
          -1

    canvasDiv = document.getElementById('canvas')

    if (canvasDiv.addEventListener)
      canvasDiv.addEventListener('mousewheel', invokeMouseWheelFunction, false)     # Chrome/Safari/Opera
      canvasDiv.addEventListener('DOMMouseScroll', invokeMouseWheelFunction, false) # Firefox
    else if (canvasDiv.attachEvent)
      canvasDiv.attachEvent('onmousewheel', invokeMouseWheelFunction)                  # IE

  @mouseWheel = (direction) =>
    if direction > 0
      if @scaleLevel > 2.4
        return
      @scaleLevel += 0.1
    else
      if @scaleLevel < 0.2
        return
      @scaleLevel -= 0.1

  @mouseClicked = =>
    if @zoom
      @zoom = false
      #$('#planet-info').slideDown("fast")
      $('#canvas-container[rel="popover"]').popover('show')
      $('#game-info').hide("slow")
      return

    for p in @planets
      if @isMouseOverPlanet(p)
        p.clicked = true
        @zoomedPlanet = p
        @zoom = true
        @zoomCount = 0
        info = p.gameinfo
        $('#title').html(info.name)
        $('#year').html(info.year)
        $('#short-description').html(info.description.short)
        $('#long-description').html(info.description.long)

        if info.resources.pictures? and info.resources.pictures.picture?
          slider.setPhotos(info.resources.pictures.picture)
          slider.slide(0)

        $('#video').html('')
        if info.resources.videos?
          videos = info.resources.videos
          if videos.video?
            $('#video').html('See <a target="_blank" href="http://vimeo.com/' + videos.video.vimeo_id + '">video</a>')
            $('#video').videopopup({
              'videoid' : videos.video.vimeo_id,
              'videoplayer' : 'vimeo',
              'autoplay' : 'true',
              'width' : '900',
              'height' : '600'
            })
          else if videos.video_show_case?
            $('#video').html('See <a target="_blank" href="http://vimeo.com/album/' + videos.video_show_case.vimeo_album_id + '">video</a>')
            $('#video').unbind()

        break

  @mouseOut = =>
    @mouseFocus = false

  @mouseOver = =>
    @mouseFocus = true

  @keyPressed = =>
    if @keyCode is @UP
      @scaleLevel -= 0.1
    else if @keyCode is @DOWN
      @scaleLevel += 0.1

  @draw = =>
    for p in @planets
      p.turn()
    @background(100)

    if @mouseFocus
      @noStroke()
      @fill(250)

    if @zoom or @zoomCount > 0
      @pushMatrix()

      if @zoom and @zoomCount < @zoomMax
        @zoomCount++
      else if !@zoom and @zoomCount > 0
        @zoomCount--
      else
        if not $('#game-info').is(":visible")
          $('#game-info').show("slow")
          #$('#planet-info').hide("fast")
          $('#canvas-container[rel="popover"]').popover('hide')

      zoomValue = @zoomCount / @zoomMax
      textOutsideRadius = (@zoomedPlanet.size / 2) + 100
      scaleMax = 1/(textOutsideRadius/240) # 420 fits the planet, trees and text, 700 fits the planet only

      halfWidth  = @width/2
      halfHeight = @height/2

      scaleValue = @scaleLevel + (scaleMax - @scaleLevel) * zoomValue
      @scale scaleValue, scaleValue

      translateX = @translateX - (@translateX + @zoomedPlanet.x - halfWidth/scaleMax) * zoomValue
      translateY = @translateY - (@translateY + @zoomedPlanet.y - halfHeight/scaleMax - 20) * zoomValue
      @translate translateX, translateY
    else
      #@translate @width/2, @height/2
      @scale @scaleLevel
      #@translate -@width/2, -@height/2
      @translate @translateX, @translateY

    @fill 255
    @ellipse 0, 0, 2000, 2100

    @starfield.draw()

    for p in @planets
      p.draw() unless @zoom and p isnt @zoomedPlanet

    if @zoom
      fadeValue = 255 * (@zoomCount/@zoomMax) # fade the other planets
      @fill(255, fadeValue)
      @rect(-5000, -5000, 10000, 10000)
      @zoomedPlanet.draw()
      arcText(@zoomedPlanet.name, @zoomedPlanet)
      @popMatrix()
    else
      for p in @planets
        if @isMouseOverPlanet(p)
          arcText(p.name, p)
          if not p.teraformed
            p.teraform()
          break

  @isMouseOverPlanet = (planet) ->
    #x = (@mouseX - @translateX) * (1 / @scaleLevel)
    #y = (@mouseY - @translateY) * (1 / @scaleLevel)
    x = (@mouseX / @scaleLevel) - @translateX
    y = (@mouseY / @scaleLevel) - @translateY
    @dist(planet.x, planet.y, x, y) <= (planet.size / 2)

  @mousePressed = ->
    @mouseDragStartX = @mouseX
    @mouseDragStartY = @mouseY
    @translateStartX = @translateX
    @translateStartY = @translateY

  @mouseDragged = ->
    @translateX = @translateStartX + (@mouseX - @mouseDragStartX) / @scaleLevel
    @translateY = @translateStartY + (@mouseY - @mouseDragStartY) / @scaleLevel