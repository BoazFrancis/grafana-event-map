"use strict";

System.register([], function (_export, _context) {
  "use strict";

  var _createClass, Builder;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [],
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

      _export("Builder", Builder = function () {
        function Builder() {
          _classCallCheck(this, Builder);
        }

        _createClass(Builder, [{
          key: "call",
          value: function call(data) {
            return [{ type: "mso", coord: [52.15491, -1.6], timestamp: 123184937 }, { type: "session_drop", coord: [52.15491, 1], timestamp: 634789348 }, { type: "call_spike", coord: [55.95206, -3.19648], timestamp: 672384087 }, { type: "engineer", coord: [51.509865, -0.118092], timestamp: 7643409284 }, { type: "change", coord: [53.4105800, -2.9779400], timestamp: 1237698379 }, { type: "mso", coord: [51.541148, -0.011019], timestamp: 322368678 }, { type: "session_drop", coord: [51.499181, -0.178182], timestamp: 324278878 }, { type: "engineer", coord: [58.242793, -4.553242], timestamp: 6527397236 }];
          }
        }]);

        return Builder;
      }());

      _export("Builder", Builder);
    }
  };
});
//# sourceMappingURL=builder.js.map
