import * as leaflet from '../external/leaflet/leaflet'

const pinPath = 'M16,1 C7.7146,1 1,7.65636364 1,15.8648485 C1,' + 
                '24.0760606 16,51 16,51 C16,51 31,24.0760606 31,' + 
                '15.8648485 C31,7.65636364 24.2815,1 16,1 L16,1 Z'

export class Wrapper extends L.Icon {
  constructor (marker) {
    super()
    this.marker = marker
  }

  createIcon () {
    var div = document.createElement('div')
    this._setInnerHTML(div)
    this._setClass(div)
    this._setStyle(div)
    return div
  }

  _setInnerHTML (div) {
    var markerColor = this.marker.icon.markerColor
    var iconClass = `fa fa-${this.marker.icon.class}`
    var iconColor = this.marker.icon.iconColor

    div.innerHTML = '<svg viewBox="0 0 30 50">'+
                    `<path d="${pinPath}" fill="${markerColor}"/>` +
                    `<i style="color:${iconColor}" class="${iconClass} icon"/>` +
                    '</svg>'
  }

  _setClass (div) {
    div.className = 'vector-marker-icon vector-marker' 
  }

  _setStyle (div) {
    var size = L.point(this.marker.icon.size)
    var anchor = L.point(this.marker.icon.anchor)

    div.style.marginLeft = (-anchor.x) + 'px'
    div.style.marginTop = (-anchor.y) + 'px'
    div.style.width = size.x + 'px'
    div.style.height = size.y + 'px'
  }
}
