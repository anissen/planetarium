class Grass    
  constructor: (@pjs, @planet, @posA, @growthRate = 0.1) ->
    @age = 0
    @h = @pjs.floor(1 + @pjs.random(3))
   
  draw: ->
    @age += @growthRate
    gh = @pjs.min(@age, @h)

    for i in [1..5]
      @pjs.pushMatrix()
      @pjs.rotate(@posA + i * 2)
      @pjs.translate(@planet.size/2, 0)
      @pjs.rotate(@pjs.PI/2)

      @pjs.strokeWeight(2)
      @pjs.line(-1, 0, 0, -gh)
      @pjs.line(1, 0, 0, -gh)
      @pjs.translate(0, -gh)

      @pjs.popMatrix()