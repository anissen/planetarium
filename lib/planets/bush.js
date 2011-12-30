var Bush;

Bush = (function() {

  function Bush(pjs, planet, posA, growthRate) {
    var ballCount, i;
    this.pjs = pjs;
    this.planet = planet;
    this.posA = posA;
    this.growthRate = growthRate != null ? growthRate : 0.5;
    this.h = this.pjs.floor(this.pjs.random(this.planet.size / 8, this.planet.size / 6));
    this.thick = this.h / 5;
    ballCount = 2 + this.pjs.floor(this.pjs.random(4));
    this.balls = [];
    for (i = 0; 0 <= ballCount ? i < ballCount : i > ballCount; 0 <= ballCount ? i++ : i--) {
      this.balls.push({
        x: this.pjs.random(1.2),
        y: this.pjs.random(1.0),
        xsize: 1.0 + this.pjs.random(1.0),
        ysize: 1.0 + this.pjs.random(3.0)
      });
    }
    this.age = 0;
  }

  Bush.prototype.draw = function() {
    var ball, gh, n, _i, _len, _ref;
    this.age += this.growthRate;
    this.age = this.pjs.min(this.age, this.h);
    gh = this.pjs.min(this.age, this.h);
    n = this.thick * gh / this.h;
    n *= 2;
    this.pjs.pushMatrix();
    this.pjs.rotate(this.posA);
    this.pjs.translate(this.planet.size / 2, 0);
    this.pjs.rotate(this.pjs.PI / 2);
    this.pjs.pushMatrix();
    this.pjs.translate(0, -gh / 10);
    this.pjs.noStroke();
    this.pjs.fill(0);
    if (this.planet.clicked) this.pjs.fill(30, 10, 0);
    _ref = this.balls;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      ball = _ref[_i];
      this.pjs.ellipse(ball.x * n, ball.y * n / 2, ball.xsize * (n - 2), ball.ysize * (n - 2));
    }
    this.pjs.popMatrix();
    return this.pjs.popMatrix();
  };

  return Bush;

})();
