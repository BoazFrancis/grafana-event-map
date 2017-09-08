import * as leaflet from './external/leaflet/leaflet'

export class Marker extends L.Icon {
  constructor (markers, overrideOptions) {
    super()

    var options = Object.assign(overrideOptions,
    {
      iconSize: [30, 50],
      iconAnchor: [15, 50],
      // iconColor: "white"
    })
   
    this.options = L.Util.setOptions(this, options)
  }

  call (events) {
    this.markers.addLayer(L.marker(event.coord, {
      icon: new Markers({
        icon: this.options.symbols[event.type].icon,
        markerColor: this.options.symbols[event.type].color
      })
    }))
    var div = document.createElement("div")
    this._setInnerHTML(div)
    this._setClass(div)
    this._setStyle(div)
    return div
  }

  _setClass (div) {
    div.className = 'vector-marker-icon vector-marker' 
  }

  _setInnerHTML (div) {
    var pinPath = L.VectorMarkers.MAP_PIN
    var markerColor = this.options.markerColor
    var iconClass = `fa fa-${this.options.icon}`
    var iconColorStyle = this.options.iconColor

    div.innerHTML = '<svg viewBox="0 0 30 50">'+
                    `<path d="${pinPath}" fill="${markerColor}"/>` +
                    `<i style="color:${iconColorStyle}" class="${iconClass} icon"/>` +
                    '</svg>'
  }

  _setStyle (div) {
    var size = L.point(this.options.iconSize)
    var anchor = L.point(this.options.iconAnchor)

    div.style.marginLeft = (-anchor.x) + "px"
    div.style.marginTop = (-anchor.y) + "px"
    div.style.width = size.x + "px"
    div.style.height = size.y + "px"
  }
}
