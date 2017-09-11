'use strict';

System.register(['../external/leaflet/leaflet'], function (_export, _context) {
  "use strict";

  var leaflet, _createClass, pinPath, Wrapper;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  return {
    setters: [function (_externalLeafletLeaflet) {
      leaflet = _externalLeafletLeaflet;
    }],
    execute: function () {
      _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      pinPath = 'M16,1 C7.7146,1 1,7.65636364 1,15.8648485 C1,' + '24.0760606 16,51 16,51 C16,51 31,24.0760606 31,' + '15.8648485 C31,7.65636364 24.2815,1 16,1 L16,1 Z';

      _export('Wrapper', Wrapper = function (_L$Icon) {
        _inherits(Wrapper, _L$Icon);

        function Wrapper(marker) {
          _classCallCheck(this, Wrapper);

          var _this = _possibleConstructorReturn(this, (Wrapper.__proto__ || Object.getPrototypeOf(Wrapper)).call(this));

          _this.marker = marker;
          return _this;
        }

        _createClass(Wrapper, [{
          key: 'createIcon',
          value: function createIcon() {
            var div = document.createElement('div');
            this._setInnerHTML(div);
            this._setClass(div);
            this._setStyle(div);
            return div;
          }
        }, {
          key: '_setInnerHTML',
          value: function _setInnerHTML(div) {
            var markerColor = this.marker.icon.markerColor;
            var iconClass = 'fa fa-' + this.marker.icon.class;
            var iconColor = this.marker.icon.iconColor;

            div.innerHTML = '<svg viewBox="0 0 30 50">' + ('<path d="' + pinPath + '" fill="' + markerColor + '"/>') + ('<i style="color:' + iconColor + '" class="' + iconClass + ' icon"/>') + '</svg>';
          }
        }, {
          key: '_setClass',
          value: function _setClass(div) {
            div.className = 'vector-marker-icon vector-marker';
          }
        }, {
          key: '_setStyle',
          value: function _setStyle(div) {
            var size = L.point(this.marker.icon.size);
            var anchor = L.point(this.marker.icon.anchor);

            div.style.marginLeft = -anchor.x + 'px';
            div.style.marginTop = -anchor.y + 'px';
            div.style.width = size.x + 'px';
            div.style.height = size.y + 'px';
          }
        }]);

        return Wrapper;
      }(L.Icon));

      _export('Wrapper', Wrapper);
    }
  };
});
//# sourceMappingURL=wrapper.js.map
