'use strict';

System.register([], function (_export, _context) {
  "use strict";

  function injectVectorMarkers() {
    L.VectorMarkers.MAP_PIN = 'M16,1 C7.7146,1 1,7.65636364 1,15.8648485 C1,' + '24.0760606 16,51 16,51 C16,51 31,24.0760606 31,' + '15.8648485 C31,7.65636364 24.2815,1 16,1 L16,1 Z';

    L.VectorMarkers.Icon = L.Icon.extend({
      options: {
        iconSize: [30, 50],
        iconAnchor: [15, 50],
        className: "vector-marker",
        prefix: "fa",
        markerColor: "blue",
        iconColor: "white"
      },

      initialize: function initialize(options) {
        this.options = L.Util.setOptions(this, options);
      },

      createIcon: function createIcon() {
        var div = document.createElement("div");
        this._setInnerHTML(div);
        this._setClass(div);
        this._setStyle(div);
        return div;
      },

      _setClass: function _setClass(div) {
        var className = this.options.className;
        div.className = 'vector-marker-icon ' + className;
      },

      _setInnerHTML: function _setInnerHTML(div) {
        var pinPath = L.VectorMarkers.MAP_PIN;
        var markerColor = this.options.markerColor;
        var iconClass = this.options.prefix + ' ' + this.options.prefix + '-' + this.options.icon;
        var iconColorStyle = this.options.iconColor;
        // cannot split into += lines because the browser completes tags
        div.innerHTML = '<svg viewBox="0 0 30 50">' + ('<path d="' + pinPath + '" fill="' + markerColor + '"/>') + ('<i style="color:' + iconColorStyle + '" class="' + iconClass + '"></i>') + '</svg>';
      },

      _setStyle: function _setStyle(div) {
        var size = L.point(this.options.iconSize);
        var anchor = L.point(this.options.iconAnchor);

        div.style.marginLeft = -anchor.x + "px";
        div.style.marginTop = -anchor.y + "px";
        div.style.width = size.x + "px";
        div.style.height = size.y + "px";
      }
    });

    L.VectorMarkers.icon = function (options) {
      return new L.VectorMarkers.Icon(options);
    };
  }

  _export('injectVectorMarkers', injectVectorMarkers);

  return {
    setters: [],
    execute: function () {}
  };
});
//# sourceMappingURL=inject-markers.js.map
