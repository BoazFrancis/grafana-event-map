'use strict';

System.register([], function (_export, _context) {
  "use strict";

  var path;
  function injectVectorMarkers() {
    L.VectorMarkers = {};
    L.VectorMarkers.MAP_PIN = path;
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
        var div, icon, options, pin_path;
        div = document.createElement("div");
        icon = this._createInner();
        pin_path = L.VectorMarkers.MAP_PIN;
        div.innerHTML = '<svg viewBox="0 0 30 50"' + ' xmlns="http://www.w3.org/2000/svg"' + 'xmlns:xlink="http://www.w3.org/1999/xlink">' + '<path d="' + pin_path + '" fill="' + this.options.markerColor + '"></path>' + icon + '</svg>';
        this._setIconStyles(div, "icon");
        return div;
      },

      _createInner: function _createInner() {
        var iconClass, iconColorClass, iconColorStyle, options;
        options = this.options;
        iconClass = options.prefix + " " + options.prefix + "-" + options.icon;
        iconColorStyle = "style='color: " + options.iconColor + "' ";
        return "<i " + iconColorStyle + "class='" + iconClass + " " + iconColorClass + "'></i>";
      },

      _setIconStyles: function _setIconStyles(img, name) {
        var anchor, options, size;
        options = this.options;
        size = L.point(options.iconSize);
        anchor = L.point(options.iconAnchor);
        img.className = "vector-marker-" + name + " " + options.className;
        img.style.marginLeft = -anchor.x + "px";
        img.style.marginTop = -anchor.y + "px";
        img.style.width = size.x + "px";
        img.style.height = size.y + "px";
      }
    });
    return L.VectorMarkers.icon = function (options) {
      return new L.VectorMarkers.Icon(options);
    };
  }

  _export('injectVectorMarkers', injectVectorMarkers);

  return {
    setters: [],
    execute: function () {
      path = 'M16,1 C7.7146,1 1,7.65636364 1,15.8648485 C1,' + '24.0760606 16,51 16,51 C16,51 31,24.0760606 31,' + '15.8648485 C31,7.65636364 24.2815,1 16,1 L16,1 Z';
    }
  };
});
//# sourceMappingURL=inject-markers.js.map
