class BotanikaMap {
  constructor() {
    $.extend(this, {
      center: [60.6374815, 30.173661],
      zoom: 16,
      overlayBounds: [[60.635766, 30.170803], [60.639197, 30.176519]],
      overlayImage: '/img/botanika_plan.svg',
      boundingPoints: [[60.639197, 30.170803], [60.639197, 30.176519], [60.635766, 30.176519], [60.635766, 30.170803]],
      styles
    });

    this.createMap();
    // temp for devmode
    this.addBoundingMarkers();
  }

  createMap() {
    let map = new L.Map('map', {
      center: this.center,
      zoom: this.zoom,
      zoomControl: false
    });

    let ggl = new L.Google('ROADMAP', {
    	mapOptions: {
    		styles: this.styles
    	}
    });
    map.addLayer(ggl);

    let zoomControl = L.control.zoom({
      position: 'bottomright'
    });
    zoomControl.addTo(map);

    map.fitBounds(overlayBounds);

    this.map = map;
  }

  addBoundingMarkers() {
    let map = this.map;
    let boundingIcon = L.icon({
      iconUrl: 'my-icon.png',
      iconRetinaUrl: 'my-icon@2x.png',
      shadowUrl: 'my-icon-shadow.png',
    });

    let markerOptions = {
      icon: boundingIcon,
      riseOnHover: true
    };

    this.boundingPoints.forEach((point) => {
      L.marker(point, markerOptions).addTo(map);
    });
  }

  addPlanOverlay() {
    let {map, overlayImage, overlayBounds} = {this};
    let overlay = L.imageOverlay(overlayImage, overlayBounds).addTo(map);
  }
}

this.BotanikaMap = BotanikaMap;
