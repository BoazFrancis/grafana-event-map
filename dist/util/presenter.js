'use strict';

System.register(['lodash'], function (_export, _context) {
  "use strict";

  var _, _createClass, Presenter;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_lodash) {
      _ = _lodash.default;
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

      _export('Presenter', Presenter = function () {
        function Presenter(templates) {
          _classCallCheck(this, Presenter);

          this.templates = templates;
        }

        _createClass(Presenter, [{
          key: 'call',
          value: function call(events) {
            events.forEach(this._setIcon.bind(this));
          }
        }, {
          key: '_setIcon',
          value: function _setIcon(event) {
            event.icon = _.find(this.templates, { name: event.name });
          }
        }]);

        return Presenter;
      }());

      _export('Presenter', Presenter);
    }
  };
});
//# sourceMappingURL=presenter.js.map
