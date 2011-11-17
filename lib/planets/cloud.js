var Cloud;

Cloud = (function() {

  function Cloud(pjs, planet, posA, growthRate) {
    var ballCount, i;
    this.pjs = pjs;
    this.planet = planet;
    this.posA = posA;
    this.growthRate = growthRate != null ? growthRate : 0.5;
    this.h = this.pjs.floor(this.pjs.random(this.planet.size / 4, this.planet.size / 3));
    this.thick = this.h / 5;
    ballCount = 3 + this.pjs.floor(this.pjs.random(5));
    this.balls = [];
    for (i = 0; 0 <= ballCount ? i < ballCount : i > ballCount; 0 <= ballCount ? i++ : i--) {
      this.balls.push({
        x: this.pjs.random(1.2),
        y: this.pjs.random(1.0),
        xsize: 0.8 + this.pjs.random(0.6),
        ysize: 0.8 + this.pjs.random(0.4)
      });
    }
    this.wind = this.pjs.random(-0.005, 0.005);
    this.isDying = false;
    this.isDead = false;
    this.age = 0;
  }

  Cloud.prototype.draw = function() {
    var ball, gh, n, _i, _j, _len, _len2, _ref, _ref2;
    this.age += this.growthRate;
    this.age = this.pjs.min(this.age, this.h);
    this.posA += this.wind;
    gh = this.pjs.min(this.age, this.h);
    n = this.thick * gh / this.h;
    n *= 3;
    this.pjs.pushMatrix();
    this.pjs.rotate(this.posA);
    this.pjs.translate(this.planet.size / 2, 0);
    this.pjs.rotate(this.pjs.PI / 2);
    this.pjs.pushMatrix();
    this.pjs.translate(0, -gh);
    this.pjs.strokeWeight(1);
    this.pjs.stroke(0);
    this.pjs.noFill();
    _ref = this.balls;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      ball = _ref[_i];
      this.pjs.ellipse(ball.x * n, ball.y * n / 2, ball.xsize * n, ball.ysize * n);
    }
    this.pjs.noStroke();
    this.pjs.fill(255);
    _ref2 = this.balls;
    for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
      ball = _ref2[_j];
      this.pjs.ellipse(ball.x * n, ball.y * n / 2, ball.xsize * (n - 2), ball.ysize * (n - 2));
    }
    this.pjs.popMatrix();
    return this.pjs.popMatrix();
  };

  return Cloud;

})();
