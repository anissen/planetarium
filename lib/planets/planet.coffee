class Planet
  constructor: (@pjs, @x, @y, @size, @turnSpeed, @name = "hej", @gameinfo) ->
    @a = 0.0
    @objects = []
    @clouds = []
    @teraformed = false
    @clicked = false
     
  turn: ->
    @a += @turnSpeed
    if @a > @pjs.TWO_PI 
      @a -= @pjs.TWO_PI
   
  addObject: (object) ->
    @objects.push object
   
  addCloud: (object) ->
    @clouds.push object

  clean: ->
    @objects.clear()

  teraform: ->
    @addRandomObject() for i in [1..4]
    @teraformed = true

  addRandomObject: ->
    if @pjs.random(1.0) < 0.5
      @addObject(new Tree(@pjs, @, @pjs.random(@pjs.TWO_PI) - @a, 0.1 + @pjs.random(0.4)))
    if @pjs.random(1.0) < 0.5
      @addObject(new Grass(@pjs, @, @pjs.random(@pjs.TWO_PI) - @a, 0.02 + @pjs.random(0.1)))
    if @pjs.random(1.0) < 0.2
      @addCloud(new Cloud(@pjs, @, @pjs.random(@pjs.TWO_PI) - @a, 0.1 + @pjs.random(0.4)))
    if @pjs.random(1.0) < 0.2
      @addObject(new Bush(@pjs, @, @pjs.random(@pjs.TWO_PI) - @a, 0.1 + @pjs.random(0.4)))

  draw: ->
    @pjs.pushMatrix()
    @pjs.translate(@x, @y)

    @pjs.rotate(@a)
    @pjs.noStroke()
    @pjs.fill 0
    if @clicked
      @pjs.fill 0, 30, 200, 20
      @pjs.ellipse(0, 0, 100 + @size * 1.2, 100 + @size * 1.2)
      @pjs.fill 0, 40, 0
    #if @teraformed
    #  @pjs.fill 0, 70, 30
    @pjs.ellipse(0, 0, @size, @size)
    for c in @clouds
      c.draw()
    for o in @objects
      o.draw()
    @pjs.popMatrix()