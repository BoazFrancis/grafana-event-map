'use strict';

System.register(['lodash', './Markers', './module.css!', 'app/plugins/sdk', './external/leaflet/leaflet', './external/leaflet/leaflet.css!', './external/font-awesome-4.7.0/css/font-awesome.min.css!', './util/builder', './util/presenter'], function (_export, _context) {
  "use strict";

  var _, Markers, MetricsPanelCtrl, leaflet, leafletCSS, fontawesome, Builder, Presenter, _createClass, pinPath, panelDefaults, EventsMapCtrl;

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
    setters: [function (_lodash) {
      _ = _lodash.default;
    }, function (_Markers) {
      Markers = _Markers.Markers;
    }, function (_moduleCss) {}, function (_appPluginsSdk) {
      MetricsPanelCtrl = _appPluginsSdk.MetricsPanelCtrl;
    }, function (_externalLeafletLeaflet) {
      leaflet = _externalLeafletLeaflet;
    }, function (_externalLeafletLeafletCss) {
      leafletCSS = _externalLeafletLeafletCss;
    }, function (_externalFontAwesome470CssFontAwesomeMinCss) {
      fontawesome = _externalFontAwesome470CssFontAwesomeMinCss;
    }, function (_utilBuilder) {
      Builder = _utilBuilder.Builder;
    }, function (_utilPresenter) {
      Presenter = _utilPresenter.Presenter;
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
      panelDefaults = {
        symbols: {},
        base_layer: 'http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png',
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright" target="blank">OpenStreetMap</a>, &copy;' + '<a href="http://stamen.com" target="blank">Stamen Design</a>'
      };

      _export('PanelCtrl', _export('EventsMapCtrl', EventsMapCtrl = function (_MetricsPanelCtrl) {
        _inherits(EventsMapCtrl, _MetricsPanelCtrl);

        function EventsMapCtrl($scope, $injector) {
          _classCallCheck(this, EventsMapCtrl);

          var _this = _possibleConstructorReturn(this, (EventsMapCtrl.__proto__ || Object.getPrototypeOf(EventsMapCtrl)).call(this, $scope, $injector));

          _this.events.on('data-received', _this.onDataReceived.bind(_this));
          _this.events.on('render', _this.onRender.bind(_this));
          _this.events.on('init-edit-mode', _this.onInitEditMode.bind(_this));
          _.defaults(_this.panel, panelDefaults);

          _this.options = {
            symbols: {
              mso: { icon: "exclamation-triangle", color: "red" },
              session_drop: { icon: "tint", color: "#15a310" },
              call_spike: { icon: "phone", color: "#199fff" },
              change: { icon: "wrench", color: "#9822d8" },
              engineer: { icon: "male", color: "#ff59f9" }
            },
            map: {
              view: {
                top_left: [58.744384, -8.329295],
                bottom_right: [49.983103, 1.719198],
                max_zoom: 16
              }
            }
          };

          _this.builder = new Builder();
          _this.presenter = new Presenter(options.symbols);
          _this.markers = L.layerGroup([]);
          return _this;
        }

        _createClass(EventsMapCtrl, [{
          key: 'onDataReceived',
          value: function onDataReceived(data) {
            this.data = [];
            this.render();
          }
        }, {
          key: 'onRender',
          value: function onRender() {
            // var curr_center = this.map.getCenter() 
            this.map.invalidateSize();
            this.markers.clearLayers();

            this.events = this.builder.call(this.data);
            this.presenter.call(this.events);
            this.marker.call(this.markers, this.events);
            // this.map.setView(curr_center) 
          }
        }, {
          key: 'link',
          value: function link(scope, elem, attrs, ctrl) {
            var mapElem = elem.find('#map')[0];
            var topLeft = this.options.map.view.top_left;
            var bottomRight = this.options.map.view.bottom_right;

            ctrl.map = L.map(mapElem, { worldCopyJump: true });
            this._initializeMap();
            this.map.fitBounds([topLeft, bottomRight]);
          }
        }, {
          key: '_initializeMap',
          value: function _initializeMap() {
            L.VectorMarkers = {};
            L.VectorMarkers.MAP_PIN = pinPath;
            L.tileLayer(this.options.map.base_layer, {
              attribution: this.options.map.attribution,
              maxZoom: this.options.map.view.max_zoom,
              zoom: 5,
              reuseTiles: true
            }).addTo(this.map);

            // this.map.attributionControl.setPrefix('')
            this.markers.addTo(this.map);
          }
        }, {
          key: 'onInitEditMode',
          value: function onInitEditMode() {
            this.addEditorTab('Options', 'public/plugins/events-map-panel/editor.html');
          }
        }]);

        return EventsMapCtrl;
      }(MetricsPanelCtrl)));

      _export('EventsMapCtrl', EventsMapCtrl);

      EventsMapCtrl.templateUrl = 'module.html';

      _export('PanelCtrl', EventsMapCtrl);
    }
  };
});
//# sourceMappingURL=module.js.map
