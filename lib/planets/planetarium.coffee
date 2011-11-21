sketch ->
  @setup = =>
    @size(1000, 400)
    @frameRate(30)
    @smooth()

    @zoomCount = 0
    @zoomMax = 20
    @zoomedPlanet = null
    @zoom = false

    @scaleLevel = 1

    @scrollbarWidth = 70
    @scrollSpeed = 10

    @mouseFocus = false

    @translateX = 1000/2
    @translateY = 400/2

    @starfield = new Starfield(@, 2000, 1000, 1000)
    
    @planets = []
    #@planets.push(new Planet(@, 150, 150, 80, @PI/400, "WikiAdventure", "Wiki-based game framework<br\/><br\/>An experimental adventure game framework based on the Wiki principles, where everyone can edit, add and remove contents. The framework is geared toward classic point-and-click adventure games."))
    #bigPlanet = new Planet(@, 400, 300, 200, @PI/1200, "Rigid Body Workbench")

    for i in [0..21]
      @planets.push @createNewRandomPlanet(@planets, i)
    #@planets.push(new Planet(@, 800, 200, 150, @PI/1800, "This is an awesome planet"))

    @setupMouseWheel()

  @createNewRandomPlanet = (planets, index) ->
    r = @random(@TWO_PI)
    size = 50 + @random(150)
    halfsize = size / 2
    x = @cos(r) * @random(1000 - halfsize)
    y = @sin(r) * @random(1000 - halfsize)
    minDistBetweenPlanets = 70

    for p in planets
      if @dist(x, y, p.x, p.y) < (halfsize + (p.size / 2) + minDistBetweenPlanets)
        return @createNewRandomPlanet(planets, index)

    rotationSpeed = @PI / (500 + @random(1500))
    name = "Planet #" + index
    new Planet(@, x, y, size, rotationSpeed, name)

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
    scaleBefore = @scaleLevel
    if direction > 0 
      if @scaleLevel > 2.4
        return
      @scaleLevel += 0.1 
    else 
      if @scaleLevel < 0.2
        return
      @scaleLevel -= 0.1

    halfWidth  = @width/2
    halfHeight = @height/2

    @translateX = halfWidth / @scaleLevel
    @translateY = halfHeight / @scaleLevel
    #@translateX = (halfWidth - @mouseX / 2) / @scaleLevel
    #@translateY = (halfHeight - @mouseY / 2) / @scaleLevel

  @mouseClicked = =>
    if @zoom
      @zoom = false
      $('#planet-info').show("fast")
      $('#game-info').hide("slow")
      return

    for p in @planets
      if @isMouseOverPlanet(p)
        @zoomedPlanet = p
        @zoom = true
        @zoomCount = 0
        $('#game-description').html(p.text)
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
        $('#game-info').show("slow") # TODO: Don't show this all the time
        $('#planet-info').hide("fast")

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
      @scale @scaleLevel
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
    
    if @zoom
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
    @dist(planet.x, planet.y, (@mouseX / @scaleLevel) - @translateX, (@mouseY / @scaleLevel) - @translateY) <= (planet.size / 2)

  @mousePressed = ->
    @mouseDragStartX = @mouseX
    @mouseDragStartY = @mouseY
    @translateStartX = @translateX
    @translateStartY = @translateY

  @mouseDragged = ->
    @translateX = @translateStartX + (@mouseX - @mouseDragStartX) / @scaleLevel
    @translateY = @translateStartY + (@mouseY - @mouseDragStartY) / @scaleLevel