var Starfield;

Starfield = (function() {

  function Starfield(pjs, count, width, height) {
    var i, r, _ref;
    this.pjs = pjs;
    this.stars = [];
    for (i = 0; 0 <= count ? i <= count : i >= count; 0 <= count ? i++ : i--) {
      r = this.pjs.random(this.pjs.TWO_PI);
      this.stars.push({
        x: this.pjs.cos(r) * this.pjs.random(width),
        y: this.pjs.sin(r) * this.pjs.random(height),
        size: this.pjs.random(10),
        depth: this.pjs.random(200)
      });
    }
    for (i = 0, _ref = count / 30; 0 <= _ref ? i <= _ref : i >= _ref; 0 <= _ref ? i++ : i--) {
      r = this.pjs.random(this.pjs.TWO_PI);
      this.stars.push({
        x: this.pjs.cos(r) * this.pjs.random(width - 50),
        y: this.pjs.sin(r) * this.pjs.random(height - 50),
        size: 50 + this.pjs.random(100),
        depth: this.pjs.random(20)
      });
    }
  }

  Starfield.prototype.draw = function() {
    var diffx, diffy, star, _i, _len, _ref, _results;
    this.pjs.noStroke();
    _ref = this.stars;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      star = _ref[_i];
      this.pjs.fill(0, star.depth);
      diffx = 0;
      diffy = 0;
      _results.push(this.pjs.ellipse(star.x + diffx, star.y + diffy, star.size, star.size));
    }
    return _results;
  };

  return Starfield;

})();
