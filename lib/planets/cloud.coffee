class Cloud  
  constructor: (@pjs, @planet, @posA, @growthRate = 0.5) ->
    @h = @pjs.floor(@pjs.random(@planet.size/4, @planet.size/3))
    @thick = @h / 5
    
    ballCount = 3 + @pjs.floor(@pjs.random(5))
    @balls = []
    for i in [0...ballCount]
      @balls.push {x: @pjs.random(1.2), y: @pjs.random(1.0), xsize: 0.8 + @pjs.random(0.6), ysize: 0.8 + @pjs.random(0.4)}
    
    @wind = @pjs.random(-0.005, 0.005)
    @isDying = false
    @isDead = false
    @age = 0

   
  draw: ->
    @age += @growthRate
    @age = @pjs.min(@age, @h)
    @posA += @wind

    gh = @pjs.min(@age, @h)
    n = @thick * gh / @h
    n *= 3

    @pjs.pushMatrix()
    @pjs.rotate(@posA)
    @pjs.translate(@planet.size/2, 0)
    @pjs.rotate(@pjs.PI/2)

    #-------------------

    @pjs.pushMatrix()
    @pjs.translate(0 , -gh)

    @pjs.strokeWeight(1)
    @pjs.stroke(0)
    #@pjs.stroke(220, 255*@age/@h)
    @pjs.noFill()
    for ball in @balls
      @pjs.ellipse(ball.x * n, ball.y * n / 2, ball.xsize * n, ball.ysize * n)

    @pjs.noStroke()
    @pjs.fill(255)
    for ball in @balls
      @pjs.ellipse(ball.x * n, ball.y * n / 2,  ball.xsize * (n - 2), ball.ysize * (n - 2))
    
    @pjs.popMatrix()

    #-------------------

    @pjs.popMatrix()