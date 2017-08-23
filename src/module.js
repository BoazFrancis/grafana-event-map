import _ from 'lodash'
import {injectVectorMarkers} from './inject-markers'
import './module.css!'
import {MetricsPanelCtrl} from 'app/plugins/sdk'
import * as leaflet from './external/leaflet/leaflet'
import * as leafletCSS from './external/leaflet/leaflet.css!'
import * as fontawesome from './external/font-awesome-4.7.0/css/font-awesome.min.css!'

export class EventsMapCtrl extends MetricsPanelCtrl {
  constructor($scope, $injector) {
    super($scope, $injector);

  // this.panelDefaults = {
  //   mapCenter: '(0°, 0°)',
  //   mapCenterLatitude: 0,
  //   mapCenterLongitude: 0,
  //   initialZoom: 1,
  // }
  //   _.defaults(this.panel, this.panelDefaults)
    this.events.on('data-received', this.onDataReceived.bind(this))
    this.events.on('render', this.onRender.bind(this))
    this.events.on('init-edit-mode', this.onInitEditMode.bind(this))

this.options = {
  symbols:{
    mso:{ icon:"exclamation-triangle", color:"red" },
    session_drop:{ icon:"tint", color:"#15a310" },
    call_spike:{ icon:"phone", color:"#199fff" },
    change:{ icon:"wrench", color:"#9822d8" },
    engineer:{ icon:"male", color:"#ff59f9" }
  },
  map: {
    base_layer: 'http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy;' +
                 '<a href="https://carto.com/attribution">CARTO</a>',
    view: {
      top_left:[ 58.744384, -8.329295 ],
      bottom_right:[ 49.983103, 1.719198 ],
      max_zoom:16
    },
  }
}
    this.markers = L.layerGroup([])
    this.data = [{type:"mso", coord:[52.15491,-1.6], timestamp: 123184937 }, 
  {type: "session_drop", coord:[52.15491,1], timestamp: 634789348}, 
  {type:"call_spike", coord:[55.95206, -3.19648], timestamp:672384087}, 
  {type:"engineer", coord:[51.509865,-0.118092], timestamp:7643409284}, 
  {type:"change", coord:[53.4105800,-2.9779400], timestamp:1237698379}, 
  {type:"mso", coord:[51.541148, -0.011019], timestamp:322368678},
  {type:"session_drop", coord:[51.499181, -0.178182], timestamp:324278878},
  {type: "engineer", coord:[58.242793, -4.553242], timestamp:6527397236}]

  }

  onDataReceived (data) {
    // this.data = data
    console.log("received")
    console.log(data)
    this.render();
  }

  onRender () {
    // var curr_bounds = this.map.getBounds() 
    this.map.invalidateSize()
    this.markers.clearLayers()
    this.data.forEach(this._addEventLayer, this)
    // this.map.fitBounds(curr_bounds)
    this.map.fitBounds([this.options.map.view.top_left, this.options.map.view.bottom_right])
  }

  link (scope, elem, attrs, ctrl) {
    var mapElem = elem.find('#map')[0]
    ctrl.map = L.map(mapElem, {worldCopyJump: true})
    this._initializeMap()
  }
  
  _addEventLayer (event) {
    this.markers.addLayer(L.marker(event.coord, {
      icon: L.VectorMarkers.icon({
        icon: this.options.symbols[event.type].icon,
        prefix: 'fa',
        markerColor: this.options.symbols[event.type].color
      })
    }))
  }

  _initializeMap () {
    L.tileLayer(this.options.map.base_layer, {
      attribution: this.options.map.attribution,
      maxZoom: this.options.map.view.max_zoom,
      reuseTiles: true,
    }).addTo(this.map)

    this.map.attributionControl.setPrefix('')
    this.markers.addTo(this.map)

    injectVectorMarkers()
  }
  onInitEditMode() {
    this.addEditorTab('Options', 'public/plugins/events-map-panel/editor.html');
  }
}

EventsMapCtrl.templateUrl = 'module.html'
export { EventsMapCtrl as PanelCtrl }
