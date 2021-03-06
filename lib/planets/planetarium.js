// Generated by CoffeeScript 1.3.3
(function() {

  sketch(function() {
    var _this = this;
    this.setup = function() {
      var game, _i, _len, _ref;
      _this.size(940, 400);
      _this.frameRate(30);
      _this.smooth();
      _this.zoomCount = 0;
      _this.zoomMax = 20;
      _this.zoomedPlanet = null;
      _this.zoom = false;
      _this.scaleLevel = 0.6;
      _this.scrollbarWidth = 70;
      _this.scrollSpeed = 8;
      _this.mouseFocus = false;
      _this.translateX = 1000 / 2;
      _this.translateY = 400 / 2;
      _this.starfield = new Starfield(_this, 2000, 1000, 1000);
      _this.planets = [];
      _ref = games.projects.project;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        game = _ref[_i];
        _this.planets.push(_this.createNewRandomPlanet(_this.planets, game));
      }
      return _this.setupMouseWheel();
    };
    this.createNewRandomPlanet = function(planets, game) {
      var halfsize, minDistBetweenPlanets, name, p, r, rotationSpeed, size, x, y, _i, _len;
      r = this.random(this.TWO_PI);
      size = 50 + this.random(150);
      halfsize = size / 2;
      x = this.cos(r) * this.random(1000 - halfsize);
      y = this.sin(r) * this.random(1000 - halfsize);
      minDistBetweenPlanets = 70;
      for (_i = 0, _len = planets.length; _i < _len; _i++) {
        p = planets[_i];
        if (this.dist(x, y, p.x, p.y) < (halfsize + (p.size / 2) + minDistBetweenPlanets)) {
          return this.createNewRandomPlanet(planets, game);
        }
      }
      rotationSpeed = this.PI / (500 + this.random(1500));
      name = game.name;
      return new Planet(this, x, y, size, rotationSpeed, name, game);
    };
    this.setupMouseWheel = function() {
      var canvasDiv, invokeMouseWheelFunction, me, wheelDirection;
      me = _this;
      invokeMouseWheelFunction = function(evt) {
        evt.preventDefault();
        return me.mouseWheel(wheelDirection(evt));
      };
      wheelDirection = function(evt) {
        if (!evt) {
          evt = event;
        }
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
      if (direction > 0) {
        if (_this.scaleLevel > 2.4) {
          return;
        }
        return _this.scaleLevel += 0.1;
      } else {
        if (_this.scaleLevel < 0.2) {
          return;
        }
        return _this.scaleLevel -= 0.1;
      }
    };
    this.mouseClicked = function() {
      var info, p, videos, _i, _len, _ref, _results;
      if (_this.zoom) {
        _this.zoom = false;
        $('#canvas-container[rel="popover"]').popover('show');
        $('#game-info').hide("slow");
        return;
      }
      _ref = _this.planets;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        p = _ref[_i];
        if (_this.isMouseOverPlanet(p)) {
          p.clicked = true;
          _this.zoomedPlanet = p;
          _this.zoom = true;
          _this.zoomCount = 0;
          info = p.gameinfo;
          $('#title').html(info.name);
          $('#year').html(info.year);
          $('#short-description').html(info.description.short);
          $('#long-description').html(info.description.long);
          if ((info.resources.pictures != null) && (info.resources.pictures.picture != null)) {
            slider.setPhotos(info.resources.pictures.picture);
            slider.slide(0);
          }
          $('#video').html('');
          if (info.resources.videos != null) {
            videos = info.resources.videos;
            if (videos.video != null) {
              $('#video').html('See <a target="_blank" href="http://vimeo.com/' + videos.video.vimeo_id + '">video</a>');
              $('#video').videopopup({
                'videoid': videos.video.vimeo_id,
                'videoplayer': 'vimeo',
                'autoplay': 'true',
                'width': '900',
                'height': '600'
              });
            } else if (videos.video_show_case != null) {
              $('#video').html('See <a target="_blank" href="http://vimeo.com/album/' + videos.video_show_case.vimeo_album_id + '">video</a>');
              $('#video').unbind();
            }
          }
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
      var fadeValue, halfHeight, halfWidth, p, scaleMax, scaleValue, textOutsideRadius, translateX, translateY, zoomValue, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2, _results;
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
          if (!$('#game-info').is(":visible")) {
            $('#game-info').show("slow");
            $('#canvas-container[rel="popover"]').popover('hide');
          }
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
      _ref1 = _this.planets;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        p = _ref1[_j];
        if (!(_this.zoom && p !== _this.zoomedPlanet)) {
          p.draw();
        }
      }
      if (_this.zoom) {
        fadeValue = 255 * (_this.zoomCount / _this.zoomMax);
        _this.fill(255, fadeValue);
        _this.rect(-5000, -5000, 10000, 10000);
        _this.zoomedPlanet.draw();
        arcText(_this.zoomedPlanet.name, _this.zoomedPlanet);
        return _this.popMatrix();
      } else {
        _ref2 = _this.planets;
        _results = [];
        for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
          p = _ref2[_k];
          if (_this.isMouseOverPlanet(p)) {
            arcText(p.name, p);
            if (!p.teraformed) {
              p.teraform();
            }
            break;
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      }
    };
    this.isMouseOverPlanet = function(planet) {
      var x, y;
      x = (this.mouseX / this.scaleLevel) - this.translateX;
      y = (this.mouseY / this.scaleLevel) - this.translateY;
      return this.dist(planet.x, planet.y, x, y) <= (planet.size / 2);
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

}).call(this);
