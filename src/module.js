import _ from 'lodash'
// import {injectVectorMarkers} from './inject-markers'
import {Markers} from './Markers'
import './module.css!'
import {MetricsPanelCtrl} from 'app/plugins/sdk'
import * as leaflet from './external/leaflet/leaflet'
import * as leafletCSS from './external/leaflet/leaflet.css!'
import * as fontawesome from './external/font-awesome-4.7.0/css/font-awesome.min.css!'
import {Builder} from './util/builder'
import {Presenter} from './util/presenter'

const pinPath = 'M16,1 C7.7146,1 1,7.65636364 1,15.8648485 C1,' + 
                '24.0760606 16,51 16,51 C16,51 31,24.0760606 31,' + 
                '15.8648485 C31,7.65636364 24.2815,1 16,1 L16,1 Z'
const panelDefaults = {
  symbols: {},
  base_layer: 'http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png',
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright" target="blank">OpenStreetMap</a>, &copy;' +
               '<a href="http://stamen.com" target="blank">Stamen Design</a>',
}

export class EventsMapCtrl extends MetricsPanelCtrl {
  constructor($scope, $injector) {
    super($scope, $injector);

    this.events.on('data-received', this.onDataReceived.bind(this))
    this.events.on('render', this.onRender.bind(this))
    this.events.on('init-edit-mode', this.onInitEditMode.bind(this))
    _.defaults(this.panel, panelDefaults)
    
    this.options = {
      symbols:{
        mso:{ icon:"exclamation-triangle", color:"red" },
        session_drop:{ icon:"tint", color:"#15a310" },
        call_spike:{ icon:"phone", color:"#199fff" },
        change:{ icon:"wrench", color:"#9822d8" },
        engineer:{ icon:"male", color:"#ff59f9" }
      },
      map: {
        view: {
          top_left:[ 58.744384, -8.329295 ],
          bottom_right:[ 49.983103, 1.719198 ],
          max_zoom:16
        }
      }
    }

    this.builder = new Builder()
    this.presenter = new Presenter(options.symbols)
    this.markers = L.layerGroup([])
  }

  onDataReceived (data) {
    this.data = []
    this.render()
  }

  onRender () {
    // var curr_center = this.map.getCenter() 
    this.map.invalidateSize()
    this.markers.clearLayers()

    this.events = this.builder.call(this.data)
    this.presenter.call(this.events)
    this.marker.call(this.markers, this.events)
    // this.map.setView(curr_center) 
  }

  link (scope, elem, attrs, ctrl) {
    var mapElem = elem.find('#map')[0]
    var topLeft = this.options.map.view.top_left
    var bottomRight = this.options.map.view.bottom_right

    ctrl.map = L.map(mapElem, {worldCopyJump: true})
    this._initializeMap()
    this.map.fitBounds([topLeft, bottomRight])
  }
  
  _initializeMap () {
    L.VectorMarkers = {}
    L.VectorMarkers.MAP_PIN = pinPath 
    L.tileLayer(this.options.map.base_layer, {
      attribution: this.options.map.attribution,
      maxZoom: this.options.map.view.max_zoom,
      zoom: 5,
      reuseTiles: true,
    }).addTo(this.map)

    // this.map.attributionControl.setPrefix('')
    this.markers.addTo(this.map)
  }

  onInitEditMode() {
    this.addEditorTab('Options', 'public/plugins/events-map-panel/editor.html');
  }
}

EventsMapCtrl.templateUrl = 'module.html'
export { EventsMapCtrl as PanelCtrl }
