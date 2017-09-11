import {Wrapper} from './wrapper'

export class Marker {
  constructor (markerLayer) {
    this.markerLayer = markerLayer
  }

  call (markers) {
    this.markerLayer.clearLayers()
    markers.forEach(this._addMarker.bind(this))
  }

  _addMarker (marker) {
    var options = { icon: new Wrapper(marker) }
    this.markerLayer.addLayer(L.marker(marker.coord, options))
  }
}
