var Tree;

Tree = (function() {

  function Tree(pjs, planet, posA, growthRate) {
    this.pjs = pjs;
    this.planet = planet;
    this.posA = posA;
    this.growthRate = growthRate != null ? growthRate : 0.5;
    this.age = 0;
    this.h = this.pjs.floor(20 + this.pjs.random(5));
  }

  Tree.prototype.draw = function() {
    var gh, theta;
    this.age += this.growthRate;
    gh = this.pjs.min(this.age, this.h);
    theta = 0.5 * this.pjs.PI * gh / 60.0;
    this.pjs.pushMatrix();
    this.pjs.rotate(this.posA);
    this.pjs.translate(this.planet.size / 2, 0);
    this.pjs.rotate(this.pjs.PI / 2);
    this.pjs.stroke(0);
    this.pjs.strokeWeight(gh / 5);
    this.pjs.line(0, 0, 0, -gh);
    this.pjs.translate(0, -gh);
    this.branch(gh, theta);
    return this.pjs.popMatrix();
  };

  Tree.prototype.branch = function(h, theta) {
    h *= 0.66;
    if (h > 2) {
      this.pjs.strokeWeight(h / 5);
      this.pjs.pushMatrix();
      this.pjs.rotate(theta);
      this.pjs.line(0, 0, 0, -h);
      this.pjs.translate(0, -h);
      this.branch(h, theta);
      this.pjs.popMatrix();
      this.pjs.pushMatrix();
      this.pjs.rotate(-theta);
      this.pjs.line(0, 0, 0, -h);
      this.pjs.translate(0, -h);
      this.branch(h, theta);
      return this.pjs.popMatrix();
    }
  };

  return Tree;

})();
