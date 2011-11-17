
sketch(function() {
  var _this = this;
  this.setup = function() {
    var bigPlanet;
    _this.size(1000, 400);
    _this.frameRate(30);
    _this.smooth();
    _this.zoomCount = 0;
    _this.zoomMax = 20;
    _this.zoomedPlanet = null;
    _this.zoom = false;
    _this.scaleLevel = 1;
    _this.scrollbarWidth = 70;
    _this.scrollSpeed = 10;
    _this.mouseFocus = false;
    _this.translateX = 1000 / 2;
    _this.translateY = 400 / 2;
    _this.starfield = new Starfield(_this, 2000, 1000, 1000);
    _this.planets = [];
    _this.planets.push(new Planet(_this, 150, 150, 80, _this.PI / 400, "WikiAdventure", "Wiki-based game framework<br\/><br\/>An experimental adventure game framework based on the Wiki principles, where everyone can edit, add and remove contents. The framework is geared toward classic point-and-click adventure games."));
    bigPlanet = new Planet(_this, 400, 300, 200, _this.PI / 1200, "Rigid Body Workbench");
    _this.planets.push(bigPlanet);
    _this.planets.push(new Planet(_this, 800, 200, 150, _this.PI / 1800, "This is an awesome planet"));
    return _this.setupMouseWheel();
  };
  this.setupMouseWheel = function() {
    var canvasDiv, invokeMouseWheelFunction, me, wheelDirection;
    me = _this;
    invokeMouseWheelFunction = function(evt) {
      evt.preventDefault();
      return me.mouseWheel(wheelDirection(evt));
    };
    wheelDirection = function(evt) {
      if (!evt) evt = event;
      if (evt.detail < 0) {
        return 1;
      } else {
        if (evt.wheelDelta > 0) {
          return 1;
        } else {
          return -1;
        }
      }
    };
    canvasDiv = document.getElementById('canvas');
    if (canvasDiv.addEventListener) {
      canvasDiv.addEventListener('mousewheel', invokeMouseWheelFunction, false);
      return canvasDiv.addEventListener('DOMMouseScroll', invokeMouseWheelFunction, false);
    } else if (canvasDiv.attachEvent) {
      return canvasDiv.attachEvent('onmousewheel', invokeMouseWheelFunction);
    }
  };
  this.mouseWheel = function(direction) {
    var halfHeight, halfWidth, scaleBefore;
    scaleBefore = _this.scaleLevel;
    if (direction > 0) {
      if (_this.scaleLevel > 2.4) return;
      _this.scaleLevel += 0.1;
    } else {
      if (_this.scaleLevel < 0.2) return;
      _this.scaleLevel -= 0.1;
    }
    halfWidth = _this.width / 2;
    halfHeight = _this.height / 2;
    _this.translateX = halfWidth / _this.scaleLevel;
    return _this.translateY = halfHeight / _this.scaleLevel;
  };
  this.mouseClicked = function() {
    var p, _i, _len, _ref, _results;
    if (_this.zoom) {
      _this.zoom = false;
      $('#planet-info').show("fast");
      $('#game-info').hide("slow");
      return;
    }
    _ref = _this.planets;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      p = _ref[_i];
      if (_this.isMouseOverPlanet(p)) {
        _this.zoomedPlanet = p;
        _this.zoom = true;
        _this.zoomCount = 0;
        $('#game-description').html(p.text);
        break;
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };
  this.mouseOut = function() {
    return _this.mouseFocus = false;
  };
  this.mouseOver = function() {
    return _this.mouseFocus = true;
  };
  this.keyPressed = function() {
    if (_this.keyCode === _this.UP) {
      return _this.scaleLevel -= 0.1;
    } else if (_this.keyCode === _this.DOWN) {
      return _this.scaleLevel += 0.1;
    }
  };
  this.draw = function() {
    var fadeValue, halfHeight, halfWidth, p, scaleMax, scaleValue, textOutsideRadius, translateX, translateY, zoomValue, _i, _j, _k, _len, _len2, _len3, _ref, _ref2, _ref3, _results;
    _ref = _this.planets;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      p = _ref[_i];
      p.turn();
    }
    _this.background(100);
    if (_this.mouseFocus) {
      _this.noStroke();
      _this.fill(250);
    }
    if (_this.zoom || _this.zoomCount > 0) {
      _this.pushMatrix();
      if (_this.zoom && _this.zoomCount < _this.zoomMax) {
        _this.zoomCount++;
      } else if (!_this.zoom && _this.zoomCount > 0) {
        _this.zoomCount--;
      } else {
        $('#game-info').show("slow");
        $('#planet-info').hide("fast");
      }
      zoomValue = _this.zoomCount / _this.zoomMax;
      textOutsideRadius = (_this.zoomedPlanet.size / 2) + 100;
      scaleMax = 1 / (textOutsideRadius / 240);
      halfWidth = _this.width / 2;
      halfHeight = _this.height / 2;
      scaleValue = _this.scaleLevel + (scaleMax - _this.scaleLevel) * zoomValue;
      _this.scale(scaleValue, scaleValue);
      translateX = _this.translateX - (_this.translateX + _this.zoomedPlanet.x - halfWidth / scaleMax) * zoomValue;
      translateY = _this.translateY - (_this.translateY + _this.zoomedPlanet.y - halfHeight / scaleMax - 20) * zoomValue;
      _this.translate(translateX, translateY);
    } else {
      _this.scale(_this.scaleLevel);
      _this.translate(_this.translateX, _this.translateY);
    }
    _this.fill(255);
    _this.ellipse(0, 0, 2000, 2100);
    _this.starfield.draw();
    _ref2 = _this.planets;
    for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
      p = _ref2[_j];
      if (!(_this.zoom && p !== _this.zoomedPlanet)) p.draw();
    }
    if (_this.zoom) {
      fadeValue = 255 * (_this.zoomCount / _this.zoomMax);
      _this.fill(255, fadeValue);
      _this.rect(-5000, -5000, 10000, 10000);
      _this.zoomedPlanet.draw();
    }
    if (_this.zoom) {
      arcText(_this.zoomedPlanet.name, _this.zoomedPlanet);
      return _this.popMatrix();
    } else {
      _ref3 = _this.planets;
      _results = [];
      for (_k = 0, _len3 = _ref3.length; _k < _len3; _k++) {
        p = _ref3[_k];
        if (_this.isMouseOverPlanet(p)) {
          arcText(p.name, p);
          if (!p.teraformed) p.teraform();
          break;
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    }
  };
  this.isMouseOverPlanet = function(planet) {
    return this.dist(planet.x, planet.y, (this.mouseX / this.scaleLevel) - this.translateX, (this.mouseY / this.scaleLevel) - this.translateY) <= (planet.size / 2);
  };
  this.mousePressed = function() {
    this.mouseDragStartX = this.mouseX;
    this.mouseDragStartY = this.mouseY;
    this.translateStartX = this.translateX;
    return this.translateStartY = this.translateY;
  };
  return this.mouseDragged = function() {
    this.translateX = this.translateStartX + (this.mouseX - this.mouseDragStartX) / this.scaleLevel;
    return this.translateY = this.translateStartY + (this.mouseY - this.mouseDragStartY) / this.scaleLevel;
  };
});
