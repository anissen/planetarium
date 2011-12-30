class Tree    
  constructor: (@pjs, @planet, @posA, @growthRate = 0.5) ->
    @age = 0
    @h = @pjs.floor(20 + @pjs.random(5))
    #@isDying = false
   
  draw: ->
    @age += @growthRate
    #if @age > @h
    #  @isDying = true
    #if @isDying
    #  @age -= 0.7
    gh = @pjs.min(@age, @h)
    theta = 0.5*@pjs.PI*gh/60.0

    @pjs.pushMatrix()
    @pjs.rotate(@posA)
    @pjs.translate(@planet.size/2, 0)
    @pjs.rotate(@pjs.PI/2)
    
    @pjs.stroke(0)
    if (@planet.clicked)
      @pjs.stroke 60, 20, 0
    @pjs.strokeWeight(gh/5)

    @pjs.line(0, 0, 0, -gh)
    @pjs.translate(0, -gh)

    @branch(gh, theta)

    @pjs.popMatrix()
   
  branch: (h, theta) ->   
    h *= 0.66
   
    # All recursive functions must have an exit condition!!!!
    # Here, ours is when the length of the branch is 2 pixels or less
    if h > 2
      @pjs.strokeWeight(h/5)
      @pjs.pushMatrix()    # Save the current state of transformation (i.e. where are we now)
      @pjs.rotate(theta)   # Rotate by theta
      @pjs.line(0,0,0,-h)  # Draw the branch
      @pjs.translate(0,-h) # Move to the end of the branch
      @branch(h, theta) # Ok, now call myself to draw two new branches!!
      @pjs.popMatrix()     # Whenever we get back here, we "pop" in order to restore the previous matrix state
       
      # Repeat the same thing, only branch off to the "left" this time!
      @pjs.pushMatrix()
      @pjs.rotate(-theta)
      @pjs.line(0,0,0,-h)
      @pjs.translate(0,-h)
      @branch(h, theta)
      @pjs.popMatrix()