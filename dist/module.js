'use strict';

System.register(['lodash', './inject-markers', './module.css!', 'app/plugins/sdk', './external/leaflet/leaflet', './external/leaflet/leaflet.css!', './external/font-awesome-4.7.0/css/font-awesome.min.css!'], function (_export, _context) {
  "use strict";

  var _, injectVectorMarkers, MetricsPanelCtrl, leaflet, leafletCSS, fontawesome, _createClass, EventsMapCtrl;

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
    }, function (_injectMarkers) {
      injectVectorMarkers = _injectMarkers.injectVectorMarkers;
    }, function (_moduleCss) {}, function (_appPluginsSdk) {
      MetricsPanelCtrl = _appPluginsSdk.MetricsPanelCtrl;
    }, function (_externalLeafletLeaflet) {
      leaflet = _externalLeafletLeaflet;
    }, function (_externalLeafletLeafletCss) {
      leafletCSS = _externalLeafletLeafletCss;
    }, function (_externalFontAwesome470CssFontAwesomeMinCss) {
      fontawesome = _externalFontAwesome470CssFontAwesomeMinCss;
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

      _export('PanelCtrl', _export('EventsMapCtrl', EventsMapCtrl = function (_MetricsPanelCtrl) {
        _inherits(EventsMapCtrl, _MetricsPanelCtrl);

        function EventsMapCtrl($scope, $injector) {
          _classCallCheck(this, EventsMapCtrl);

          var _this = _possibleConstructorReturn(this, (EventsMapCtrl.__proto__ || Object.getPrototypeOf(EventsMapCtrl)).call(this, $scope, $injector));

          // this.panelDefaults = {
          //   mapCenter: '(0°, 0°)',
          //   mapCenterLatitude: 0,
          //   mapCenterLongitude: 0,
          //   initialZoom: 1,
          // }
          //   _.defaults(this.panel, this.panelDefaults)
          _this.events.on('data-received', _this.onDataReceived.bind(_this));
          _this.events.on('render', _this.onRender.bind(_this));
          _this.events.on('init-edit-mode', _this.onInitEditMode.bind(_this));

          _this.options = {
            symbols: {
              mso: { icon: "exclamation-triangle", color: "red" },
              session_drop: { icon: "tint", color: "#15a310" },
              call_spike: { icon: "phone", color: "#199fff" },
              change: { icon: "wrench", color: "#9822d8" },
              engineer: { icon: "male", color: "#ff59f9" }
            },
            map: {
              base_layer: 'http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png',
              attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy;' + '<a href="https://carto.com/attribution">CARTO</a>',
              view: {
                top_left: [58.744384, -8.329295],
                bottom_right: [49.983103, 1.719198],
                max_zoom: 16
              }
            }
          };
          _this.markers = L.layerGroup([]);
          _this.data = [{ type: "mso", coord: [52.15491, -1.6], timestamp: 123184937 }, { type: "session_drop", coord: [52.15491, 1], timestamp: 634789348 }, { type: "call_spike", coord: [55.95206, -3.19648], timestamp: 672384087 }, { type: "engineer", coord: [51.509865, -0.118092], timestamp: 7643409284 }, { type: "change", coord: [53.4105800, -2.9779400], timestamp: 1237698379 }, { type: "mso", coord: [51.541148, -0.011019], timestamp: 322368678 }, { type: "session_drop", coord: [51.499181, -0.178182], timestamp: 324278878 }, { type: "engineer", coord: [58.242793, -4.553242], timestamp: 6527397236 }];

          return _this;
        }

        _createClass(EventsMapCtrl, [{
          key: 'onDataReceived',
          value: function onDataReceived(data) {
            // this.data = data
            console.log("received");
            console.log(data);
            this.render();
          }
        }, {
          key: 'onRender',
          value: function onRender() {
            // var curr_bounds = this.map.getBounds() 
            this.map.invalidateSize();
            this.markers.clearLayers();
            this.data.forEach(this._addEventLayer, this);
            // this.map.fitBounds(curr_bounds)
            this.map.fitBounds([this.options.map.view.top_left, this.options.map.view.bottom_right]);
          }
        }, {
          key: 'link',
          value: function link(scope, elem, attrs, ctrl) {
            var mapElem = elem.find('#map')[0];
            ctrl.map = L.map(mapElem, { worldCopyJump: true });
            this._initializeMap();
          }
        }, {
          key: '_addEventLayer',
          value: function _addEventLayer(event) {
            this.markers.addLayer(L.marker(event.coord, {
              icon: L.VectorMarkers.icon({
                icon: this.options.symbols[event.type].icon,
                prefix: 'fa',
                markerColor: this.options.symbols[event.type].color
              })
            }));
          }
        }, {
          key: '_initializeMap',
          value: function _initializeMap() {
            L.tileLayer(this.options.map.base_layer, {
              attribution: this.options.map.attribution,
              maxZoom: this.options.map.view.max_zoom,
              reuseTiles: true
            }).addTo(this.map);

            this.map.attributionControl.setPrefix('');
            this.markers.addTo(this.map);

            injectVectorMarkers();
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
