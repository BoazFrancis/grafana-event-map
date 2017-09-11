import _ from 'lodash'
import './module.css!'
import {MetricsPanelCtrl} from 'app/plugins/sdk'
import * as leaflet from './external/leaflet/leaflet'
import * as leafletCSS from './external/leaflet/leaflet.css!'
import * as fontawesome from './external/font-awesome-4.7.0/css/font-awesome.min.css!'
import {Builder} from './util/builder'
import {Presenter} from './util/presenter'
import {Marker} from './util/marker'
import {Wrapper} from './util/wrapper'

const options = {
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright"' + 
               'target="blank">OpenStreetMap</a>, &copy;' +
               '<a href="http://stamen.com" target="blank">Stamen Design</a>',
  reuseTiles: true
}

const panelDefaults = {
  baseLayer: 'http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png',
  markerTemplates: [
    { name: "mso", class:"exclamation-triangle", markerColor:"red", size: [30, 50], anchor: [15, 50], iconColor: "white" },
    { name: "session_drop", class:"tint", markerColor:"#15a310", size: [30, 50], anchor: [15, 50], iconColor: "white" },
    { name: "call_spike", class:"phone", markerColor:"#199fff", size: [30, 50], anchor: [15, 50], iconColor: "white"  },
    { name: "change", class:"wrench", markerColor:"#9822d8", size: [30, 50], anchor: [15, 50], iconColor: "white" },
    { name: "engineer", class:"male", markerColor:"#ff59f9", size: [30, 50], anchor: [15, 50], iconColor: "white" }
  ],
  topLeft: "58.744384, -8.329295",
  bottomRight: "49.983103, 1.719198"
}

export class EventsMapCtrl extends MetricsPanelCtrl {
  constructor($scope, $injector) {
    super($scope, $injector)

    this.events.on('data-received', this.onDataReceived.bind(this))
    this.events.on('render', this.onRender.bind(this))
    this.events.on('init-edit-mode', this.onInitEditMode.bind(this))
    _.defaults(this.panel, panelDefaults)
    
    this.markerLayer = L.layerGroup([])
    this.marker = new Marker(this.markerLayer)
    this.builder = new Builder()
    this.presenter = new Presenter(this.panel.markerTemplates)
  }

  onDataReceived (data) {
    this.data = data
    this.render()
  }

  onRender () {
    if (!this.map) { this._initializeMap() } 
    else { this.map.invalidateSize() }

    this.markers = this.builder.call(this.data)
    this.presenter.call(this.markers)
    this.marker.call(this.markers)
  }

  link (scope, elem, attrs, ctrl) {
    this.mapContainer = elem.find('#map')[0]
  }

  _initializeMap () {
    this.map = L.map(this.mapContainer)
    L.tileLayer(this.panel.baseLayer, options).addTo(this.map)
    this.markerLayer.addTo(this.map)
    this.map.fitBounds([this.panel.topLeft, this.panel.bottomRight])
  }
  
  onInitEditMode() {
    this.addEditorTab('Options', 'public/plugins/events-map-panel/editor.html');
  }
}

EventsMapCtrl.templateUrl = 'module.html'
export { EventsMapCtrl as PanelCtrl }
