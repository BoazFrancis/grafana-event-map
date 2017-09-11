'use strict';

System.register(['./wrapper'], function (_export, _context) {
  "use strict";

  var Wrapper, _createClass, Marker;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_wrapper) {
      Wrapper = _wrapper.Wrapper;
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

      _export('Marker', Marker = function () {
        function Marker(markerLayer) {
          _classCallCheck(this, Marker);

          this.markerLayer = markerLayer;
        }

        _createClass(Marker, [{
          key: 'call',
          value: function call(markers) {
            this.markerLayer.clearLayers();
            markers.forEach(this._addMarker.bind(this));
          }
        }, {
          key: '_addMarker',
          value: function _addMarker(marker) {
            var options = { icon: new Wrapper(marker) };
            this.markerLayer.addLayer(L.marker(marker.coord, options));
          }
        }]);

        return Marker;
      }());

      _export('Marker', Marker);
    }
  };
});
//# sourceMappingURL=marker.js.map
