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
    this.addPlanOverlay();
    // temp for devmode
    this.addBoundingMarkers();
    this.addHousesMarkers();
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

  createHouseIcon(houseType) {
    let DEFAULTS = {
      iconUrl: 'my-icon.png',
      iconRetinaUrl: 'my-icon@2x.png',
      iconSize: [38, 95],
      iconAnchor: [22, 94],
      // shadowUrl: 'my-icon-shadow.png',
      // shadowRetinaUrl: 'my-icon-shadow@2x.png',
      // shadowSize: [68, 95],
      // shadowAnchor: [22, 94]
    }, iconSettings;
    switch (houseType) {
      case 'azalia':
        iconSettings = $.exted(DEFAULTS, {
          iconSize: [38, 95],
          iconAnchor: [22, 94],
        });
        break;
      default:
        iconSettings = $.exted(DEFAULTS, {
          iconSize: [38, 95],
          iconAnchor: [22, 94],
        });
    }

    return L.icon(iconSettings);
  }

  addHousesMarkers() {
    let map = this.map,
      houses = [];

    houses.forEach((house, index) => {
      let houseIcon = createHouseIcon(house.type),
        point = house.coordinates,
        markerOptions = {
          icon: houseIcon,
          riseOnHover: true,
          data: house
        };

      let marker = L.marker(point, markerOptions).addTo(map);

      marker.on('mouseover', function() {
        console.log('mouse out');
        // run morph animation
      });
      marker.on('mouseout', function() {
        console.log('mouse out');
        // run morph animation reverse
      });
      // bound marker events
    });
  }
}

this.BotanikaMap = BotanikaMap;
