'use strict';

System.register(['lodash', './module.css!', './external/leaflet/leaflet', './external/leaflet/leaflet.css!', './external/font-awesome-4.7.0/css/font-awesome.min.css!', 'app/plugins/sdk', './util/builder', './util/presenter', './util/marker', './util/wrapper'], function (_export, _context) {
  "use strict";

  var _, leaflet, leafletCSS, fontawesome, MetricsPanelCtrl, Builder, Presenter, Marker, Wrapper, _createClass, options, panelDefaults, EventsMapCtrl;

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
    }, function (_moduleCss) {}, function (_externalLeafletLeaflet) {
      leaflet = _externalLeafletLeaflet;
    }, function (_externalLeafletLeafletCss) {
      leafletCSS = _externalLeafletLeafletCss;
    }, function (_externalFontAwesome470CssFontAwesomeMinCss) {
      fontawesome = _externalFontAwesome470CssFontAwesomeMinCss;
    }, function (_appPluginsSdk) {
      MetricsPanelCtrl = _appPluginsSdk.MetricsPanelCtrl;
    }, function (_utilBuilder) {
      Builder = _utilBuilder.Builder;
    }, function (_utilPresenter) {
      Presenter = _utilPresenter.Presenter;
    }, function (_utilMarker) {
      Marker = _utilMarker.Marker;
    }, function (_utilWrapper) {
      Wrapper = _utilWrapper.Wrapper;
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

      options = {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright"' + 'target="blank">OpenStreetMap</a>, &copy;' + '<a href="http://stamen.com" target="blank">Stamen Design</a>',
        reuseTiles: true
      };
      panelDefaults = {
        baseLayer: 'http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png',
        markerTemplates: [{ name: "mso", class: "exclamation-triangle", markerColor: "red", size: [30, 50], anchor: [15, 50], iconColor: "white" }, { name: "session_drop", class: "tint", markerColor: "#15a310", size: [30, 50], anchor: [15, 50], iconColor: "white" }, { name: "call_spike", class: "phone", markerColor: "#199fff", size: [30, 50], anchor: [15, 50], iconColor: "white" }, { name: "change", class: "wrench", markerColor: "#9822d8", size: [30, 50], anchor: [15, 50], iconColor: "white" }, { name: "engineer", class: "male", markerColor: "#ff59f9", size: [30, 50], anchor: [15, 50], iconColor: "white" }],
        topLeft: "58.744384, -8.329295",
        bottomRight: "49.983103, 1.719198"
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

          _this.markerLayer = L.layerGroup([]);
          _this.marker = new Marker(_this.markerLayer);
          _this.builder = new Builder();
          _this.presenter = new Presenter(_this.panel.markerTemplates);
          return _this;
        }

        _createClass(EventsMapCtrl, [{
          key: 'onDataReceived',
          value: function onDataReceived(data) {
            this.data = data;
            this.render();
          }
        }, {
          key: 'onRender',
          value: function onRender() {
            if (!this.map) {
              this._initializeMap();
            } else {
              this.map.invalidateSize();
            }

            this.markers = this.builder.call(this.data);
            this.presenter.call(this.markers);
            this.marker.call(this.markers);
          }
        }, {
          key: 'link',
          value: function link(scope, elem, attrs, ctrl) {
            this.mapContainer = elem.find('#map')[0];
          }
        }, {
          key: '_initializeMap',
          value: function _initializeMap() {
            this.map = L.map(this.mapContainer);
            L.tileLayer(this.panel.baseLayer, options).addTo(this.map);
            this.markerLayer.addTo(this.map);
            this.map.fitBounds([this.panel.topLeft, this.panel.bottomRight]);
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
