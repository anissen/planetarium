class Bush  
  constructor: (@pjs, @planet, @posA, @growthRate = 0.5) ->
    @h = @pjs.floor(@pjs.random(@planet.size/8, @planet.size/6))
    @thick = @h / 5
    
    ballCount = 2 + @pjs.floor(@pjs.random(4))
    @balls = []
    for i in [0...ballCount]
      @balls.push {x: @pjs.random(1.2), y: @pjs.random(1.0), xsize: 1.0 + @pjs.random(1.0), ysize: 1.0 + @pjs.random(3.0)}
    
    @age = 0
   
  draw: ->
    @age += @growthRate
    @age = @pjs.min(@age, @h)

    gh = @pjs.min(@age, @h)
    n = @thick * gh / @h
    n *= 2

    @pjs.pushMatrix()
    @pjs.rotate(@posA)
    @pjs.translate(@planet.size/2, 0)
    @pjs.rotate(@pjs.PI/2)

    #-------------------

    @pjs.pushMatrix()
    @pjs.translate(0 , -gh / 10)

    @pjs.noStroke()
    @pjs.fill 0
    if (@planet.clicked)
        @pjs.fill 30, 10, 0
    for ball in @balls
      @pjs.ellipse(ball.x * n, ball.y * n / 2,  ball.xsize * (n - 2), ball.ysize * (n - 2))
    
    @pjs.popMatrix()

    #-------------------

    @pjs.popMatrix()