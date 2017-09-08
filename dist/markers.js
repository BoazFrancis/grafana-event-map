'use strict';

System.register(['./external/leaflet/leaflet'], function (_export, _context) {
  "use strict";

  var leaflet, _createClass, Marker;

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

      _export('Marker', Marker = function (_L$Icon) {
        _inherits(Marker, _L$Icon);

        function Marker(markers, overrideOptions) {
          _classCallCheck(this, Marker);

          var _this = _possibleConstructorReturn(this, (Marker.__proto__ || Object.getPrototypeOf(Marker)).call(this));

          var options = Object.assign(overrideOptions, {
            iconSize: [30, 50],
            iconAnchor: [15, 50]
            // iconColor: "white"
          });

          _this.options = L.Util.setOptions(_this, options);
          return _this;
        }

        _createClass(Marker, [{
          key: 'call',
          value: function call(events) {
            this.markers.addLayer(L.marker(event.coord, {
              icon: new Markers({
                icon: this.options.symbols[event.type].icon,
                markerColor: this.options.symbols[event.type].color
              })
            }));
            var div = document.createElement("div");
            this._setInnerHTML(div);
            this._setClass(div);
            this._setStyle(div);
            return div;
          }
        }, {
          key: '_setClass',
          value: function _setClass(div) {
            div.className = 'vector-marker-icon vector-marker';
          }
        }, {
          key: '_setInnerHTML',
          value: function _setInnerHTML(div) {
            var pinPath = L.VectorMarkers.MAP_PIN;
            var markerColor = this.options.markerColor;
            var iconClass = 'fa fa-' + this.options.icon;
            var iconColorStyle = this.options.iconColor;

            div.innerHTML = '<svg viewBox="0 0 30 50">' + ('<path d="' + pinPath + '" fill="' + markerColor + '"/>') + ('<i style="color:' + iconColorStyle + '" class="' + iconClass + ' icon"/>') + '</svg>';
          }
        }, {
          key: '_setStyle',
          value: function _setStyle(div) {
            var size = L.point(this.options.iconSize);
            var anchor = L.point(this.options.iconAnchor);

            div.style.marginLeft = -anchor.x + "px";
            div.style.marginTop = -anchor.y + "px";
            div.style.width = size.x + "px";
            div.style.height = size.y + "px";
          }
        }]);

        return Marker;
      }(L.Icon));

      _export('Marker', Marker);
    }
  };
});
//# sourceMappingURL=markers.js.map
