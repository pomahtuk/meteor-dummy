class BotanikaMap {
  constructor() {
    $.extend(this, {
      center: [60.6374815, 30.173661],
      openedMarkerPath: 'M60.1832892,69.7832974 L58.030854,93.3661157 L55.8685076,69.6762055 C38.0139681,68.1381212 24,53.1560614 24,34.9033058 L24,34.9033058 C24,15.6279615 39.6279615,0 58.9033058,0 C78.1786502,0 93.8066116,15.6279615 93.8066116,34.9033058 C93.8066116,53.7500079 78.8657729,69.1096934 60.1832892,69.7832974 L60.1832892,69.7832974 L60.1832892,69.7832974 Z',
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
      iconSize: [25, 41],
      shadowSize: [41, 41],
      iconAnchor: [12.5, 41],
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
    let overlay = L.imageOverlay(this.overlayImage, this.overlayBounds).addTo(this.map);
  }

  _createHouseIcon(houseType) {
    let iconHeight = 60,
      openedTransformRatio = 0.6,
      transformRatio = 0.6896551724137931, // iconHeight / 87
      iconOptions = {},
      iconClass = `botanika-house-marker botanika-house-${houseType}`,
      idAttr = `svg-${houseType}`,
      DEFAULTS = {
        className: iconClass,
        iconSize: [150, 220],
        iconAnchor: [75, 220],
        html: `<svg id="${idAttr}" width="150" height="220"></svg>`
      }

    switch (houseType) {
      case 'azalia':
        let openScaleRatio =(220 / 60) * 0.55;
        $.extend(iconOptions, DEFAULTS, {
          openScaleRatio,
          animatedTransformString: `s${openScaleRatio},${openScaleRatio},t8,40`,
          animatedOpenTransformString: `S${openScaleRatio},${openScaleRatio},0,0,t-22,16`,
          scaleString: `S${transformRatio},${transformRatio},0,0t48.2,235`,
          openTransformString: `S${openedTransformRatio},${openedTransformRatio},0,0,t65,270`
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
        markerPath = snap.path(paths[house.type]).attr({
          fill: '#85b200',
          id: `marker-${house.type}`,
        }).transform(houseIcon.options.scaleString),
        openedMarkerPath = snap.path(this.openedMarkerPath).attr({
          fill: '#85b200',
          class: 'marker-open-svg',
          id: `marker-open-${house.type}`,
        }).transform(houseIcon.options.openTransformString);

      // are there any smarter way?
      marker.markerPath = markerPath;
      marker.openedMarkerPath = openedMarkerPath;
      marker.openTransformString = houseIcon.options.openTransformString;
      marker.animatedTransformString = houseIcon.options.animatedTransformString;
      marker.animatedOpenTransformString = houseIcon.options.animatedOpenTransformString;

      function finalizeAnim() {
        this.markerPath.animate({transform: this.animatedTransformString}, 200, () => {
          this.openedMarkerPath.transform(this.animatedOpenTransformString);
          this.openedMarkerPath.attr({
            class: 'marker-open-svg marker-open-svg--visible'
          });
          this.markerPath.attr({
            class: 'marker-hidden'
          });
        });
      }

      function resetAnim(immediate = false) {
        this.animationPlayer.pause();
        this.openedMarkerPath
          .stop()
          .attr({
            class: 'marker-open-svg'
          })
          .transform(this.openTransformString);
        this.markerPath
          .stop()
          .attr({
            class: ''
          })
          .animate({transform: this.openTransformString}, 200, () => {
            this.animationPlayer.reverse();
          });
      }

      function runAnim() {
        this.animationPlayer.play();
      }

      marker.markerPath.mouseover(runAnim.bind(marker));
      marker.openedMarkerPath.mouseout(resetAnim.bind(marker));

      marker.animationPlayer = TweenLite.to(`#marker-${house.type}`, 0.5, {
        morphSVG: `#marker-open-${house.type}`,
        paused: true,
        onComplete: finalizeAnim.bind(marker)
      });
      marker.animationPlayer.seek(0);

      // extra cheks
      marker.on('mouseleave', resetAnim.bind(marker));

    });
  }
}

this.BotanikaMap = BotanikaMap;
