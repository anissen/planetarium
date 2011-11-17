class Starfield
  constructor: (@pjs, count, width, height) ->
    @stars = []
    for i in [0..count]
      r = @pjs.random(@pjs.TWO_PI)
      @stars.push {x: @pjs.cos(r)*@pjs.random(width), y: @pjs.sin(r)*@pjs.random(height), size: @pjs.random(10), depth: @pjs.random(200)}
    for i in [0..count/30]
      r = @pjs.random(@pjs.TWO_PI)
      @stars.push {x: @pjs.cos(r)*@pjs.random(width-50), y: @pjs.sin(r)*@pjs.random(height-50), size: 50+@pjs.random(100), depth: @pjs.random(20)}

  draw: ->
    @pjs.noStroke()
    for star in @stars
      @pjs.fill(0, star.depth)
      diffx = 0 #@pjs.mouseX * star.depth / 10000
      diffy = 0 #@pjs.mouseY * star.depth / 10000
      @pjs.ellipse(star.x + diffx, star.y + diffy, star.size, star.size)