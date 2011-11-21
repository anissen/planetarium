var Planet;

Planet = (function() {

  function Planet(pjs, x, y, size, turnSpeed, name, text) {
    this.pjs = pjs;
    this.x = x;
    this.y = y;
    this.size = size;
    this.turnSpeed = turnSpeed;
    this.name = name != null ? name : "hej";
    this.text = text != null ? text : "blah";
    this.a = 0.0;
    this.objects = [];
    this.clouds = [];
    this.teraformed = false;
  }

  Planet.prototype.turn = function() {
    this.a += this.turnSpeed;
    if (this.a > this.pjs.TWO_PI) return this.a -= this.pjs.TWO_PI;
  };

  Planet.prototype.addObject = function(object) {
    return this.objects.push(object);
  };

  Planet.prototype.addCloud = function(object) {
    return this.clouds.push(object);
  };

  Planet.prototype.clean = function() {
    return this.objects.clear();
  };

  Planet.prototype.teraform = function() {
    var i;
    for (i = 1; i <= 4; i++) {
      this.addRandomObject();
    }
    return this.teraformed = true;
  };

  Planet.prototype.addRandomObject = function() {
    if (this.pjs.random(1.0) < 0.5) {
      this.addObject(new Tree(this.pjs, this, this.pjs.random(this.pjs.TWO_PI) - this.a, 0.1 + this.pjs.random(0.4)));
    }
    if (this.pjs.random(1.0) < 0.5) {
      this.addObject(new Grass(this.pjs, this, this.pjs.random(this.pjs.TWO_PI) - this.a, 0.02 + this.pjs.random(0.1)));
    }
    if (this.pjs.random(1.0) < 0.2) {
      this.addCloud(new Cloud(this.pjs, this, this.pjs.random(this.pjs.TWO_PI) - this.a, 0.1 + this.pjs.random(0.4)));
    }
    if (this.pjs.random(1.0) < 0.2) {
      return this.addObject(new Bush(this.pjs, this, this.pjs.random(this.pjs.TWO_PI) - this.a, 0.1 + this.pjs.random(0.4)));
    }
  };

  Planet.prototype.draw = function() {
    var c, o, _i, _j, _len, _len2, _ref, _ref2;
    this.pjs.pushMatrix();
    this.pjs.translate(this.x, this.y);
    this.pjs.rotate(this.a);
    this.pjs.noStroke();
    this.pjs.fill(0);
    this.pjs.ellipse(0, 0, this.size, this.size);
    _ref = this.clouds;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      c = _ref[_i];
      c.draw();
    }
    _ref2 = this.objects;
    for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
      o = _ref2[_j];
      o.draw();
    }
    return this.pjs.popMatrix();
  };

  return Planet;

})();
