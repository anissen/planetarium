var Grass;

Grass = (function() {

  function Grass(pjs, planet, posA, growthRate) {
    this.pjs = pjs;
    this.planet = planet;
    this.posA = posA;
    this.growthRate = growthRate != null ? growthRate : 0.1;
    this.age = 0;
    this.h = this.pjs.floor(1 + this.pjs.random(3));
  }

  Grass.prototype.draw = function() {
    var gh, i, _results;
    this.age += this.growthRate;
    gh = this.pjs.min(this.age, this.h);
    _results = [];
    for (i = 1; i <= 5; i++) {
      this.pjs.pushMatrix();
      this.pjs.rotate(this.posA + i * 2);
      this.pjs.translate(this.planet.size / 2, 0);
      this.pjs.rotate(this.pjs.PI / 2);
      this.pjs.strokeWeight(2);
      this.pjs.line(-1, 0, 0, -gh);
      this.pjs.line(1, 0, 0, -gh);
      this.pjs.translate(0, -gh);
      _results.push(this.pjs.popMatrix());
    }
    return _results;
  };

  return Grass;

})();
