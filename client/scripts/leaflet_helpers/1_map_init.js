class BotanikaMap {
  constructor() {
    $.extend(this, {
      center: [60.6374815, 30.173661],
      openedMarkerPath: 'M59.1832892,69.7832974 L57.030854,93.3661157 L54.8685076,69.6762055 C37.0139681,68.1381212 23,53.1560614 23,34.9033058 L23,34.9033058 C23,15.6279615 38.6279615,0 57.9033058,0 C77.1786502,0 92.8066116,15.6279615 92.8066116,34.9033058 C92.8066116,53.7500079 77.8657729,69.1096934 59.1832892,69.7832974 L59.1832892,69.7832974 L59.1832892,69.7832974 Z',
      zoom: 16,
      overlayBounds: [[60.635766, 30.170803], [60.639197, 30.176519]],
      overlayImage: '/img/botanika_plan.svg',
      boundingPoints: [[60.639197, 30.170803], [60.639197, 30.176519], [60.635766, 30.176519], [60.635766, 30.170803]],
      styles
    });

    this._createMap();
    this.addPlanOverlay();
    // temp for devmode
    this._addBoundingMarkers();
    this.addHousesMarkers();
  }

  _createMap() {
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

    map.fitBounds(this.overlayBounds);

    this.map = map;
  }

  _addBoundingMarkers() {
    let map = this.map;
    let boundingIcon = L.icon({
      iconUrl: '/images/marker-icon.png',
      iconRetinaUrl: '/images/marker-icon-2x.png',
      shadowUrl: '/images/marker-shadow.png',
    });

    let markerOptions = {
      icon: boundingIcon,
      riseOnHover: true
    };

    this.boundingPoints.forEach((point) => {
      L.marker(point, markerOptions).addTo(map);
    });

    L.marker([60.6374815, 30.173661], markerOptions).addTo(map);
  }

  addPlanOverlay() {
    let overlay = L.imageOverlay(this.overlayImage, this.overlayBounds).addTo(this.map);
  }

  _createHouseIcon(houseType) {
    let iconHeight = 45,
      transformRatio = 0.5173008391769169,
      iconOptions = {},
      iconClass = `botanika-house-marker botanika-house-${houseType}`,
      idAttr = `svg-${houseType}`,
      DEFAULTS = {
        className: iconClass,
        iconSize: [100, 100],
        html: `<div class="svg-holder"><svg id="${idAttr}" width="70" height="87"></svg></div>`
      }

    switch (houseType) {
      case 'azalia':
        $.extend(iconOptions, DEFAULTS, {
          html: `<div class="svg-holder"><svg id="${idAttr}" width="${69.26 * transformRatio}" height="45"></svg></div>`,
          scaleString: `S${transformRatio},${transformRatio},0,0T-12,0`,
        });

        break;
      default:
        $.extend(iconOptions, DEFAULTS)
    }

    return L.divIcon(iconOptions);
  }

  addHousesMarkers(houses = []) {
    let map = this.map;

    houses.forEach((house, index) => {
      let point = house.coordinates,
        houseIcon = this._createHouseIcon(house.type),
        iconClass = `botanika-house-marker botanika-house-${house.type}`,
        idAttr = `svg-${house.type}`,
        markerOptions = {
          icon: houseIcon,
          riseOnHover: true,
          data: house
        };

      let marker = L.marker(point, markerOptions).addTo(map);

      let snap = Snap(`#${idAttr}`),
        openedTransformRatio = 0.6446067898581865,
        markerPath = snap.path(paths[house.type]).attr({
          fill: '#85b200',
          id: `marker-${house.type}`,
        }).transform(houseIcon.options.scaleString),
        openedMarkerPath = snap.path(this.openedMarkerPath).attr({
          fill: '#85b200',
          class: 'marker-open-svg',
          id: `marker-open-${house.type}`,
        }).transform(`S${openedTransformRatio},${openedTransformRatio},0,0,T-14,0`);

      marker.animationPlayer = TweenLite.to(`#marker-${house.type}`, 0.5, {
        morphSVG: `#marker-open-${house.type}`,
        paused: true,
        // onComplete: - draw the rest?
        // onReverseComplete: initial state?
      });

      marker.animationPlayer.seek(0);

      marker.on('mouseover', function() {
        console.log('mouse in');
        // run morph animation
        // markerPath.animate({transform: 's2,2,0,0'});
        this.animationPlayer.play();
      });
      marker.on('mouseout', function() {
        console.log('mouse out');
        // run morph animation reverse
        this.animationPlayer.reverse();
      });
      // bound marker events
    });
  }
}

this.BotanikaMap = BotanikaMap;
