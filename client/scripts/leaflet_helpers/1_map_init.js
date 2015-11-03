class BotanikaMap {
  constructor() {
    $.extend(this, {
      center: [60.6374815, 30.173661],
      openedMarkerPath: 'M60.1832892,69.7832974 L58.030854,93.3661157 L55.8685076,69.6762055 C38.0139681,68.1381212 24,53.1560614 24,34.9033058 L24,34.9033058 C24,15.6279615 39.6279615,0 58.9033058,0 C78.1786502,0 93.8066116,15.6279615 93.8066116,34.9033058 C93.8066116,53.7500079 78.8657729,69.1096934 60.1832892,69.7832974 L60.1832892,69.7832974 L60.1832892,69.7832974 Z',
      openedMerkerBorderStr: 'M37.654999,0.621349862 C58.1344971,0.621349862 74.7399981,17.226584 74.7399981,37.7060606 C74.7399981,58.1853994 58.1344971,74.7906336 37.654999,74.7906336 C17.1755009,74.7906336 0.569999933,58.1853994 0.569999933,37.7060606 C0.569999933,17.226584 17.1755009,0.621349862 37.654999,0.621349862 Z',
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
        let scaleRatio =(220 / 60) * 0.55;
        $.extend(iconOptions, DEFAULTS, {
          houseTransform: `S${transformRatio},${transformRatio},0,0t48.2,235`,
          openTransform: `S${openedTransformRatio},${openedTransformRatio},0,0,t64.75,275`,
          openAnimatedTransform: `S${scaleRatio},${scaleRatio},0,0,t-21.45,17.90`,
          animatedTransform: `s${scaleRatio},${scaleRatio},t8,40`,
          borderTransform: `s${transformRatio},${transformRatio},t52.5,215`,
          borderAnimatedTransform: `t37.9,67.05,s${scaleRatio},${scaleRatio}`,
          villaShapeTransform: `t40,165,s${transformRatio - 0.2},${transformRatio - 0.2}`,
          villaShapeAnimatedTransform: `t40,75,s${scaleRatio - 0.2},${scaleRatio - 0.2}`,
          villaTitleTransform: `t58,189,s${transformRatio - 0.1},${transformRatio - 0.1}`,
          villaTitleAnimatedTransform: `t58,137,s${scaleRatio + 0.2},${scaleRatio + 0.2}`,
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

      let marker = L.marker(point, markerOptions).addTo(map),
        animationSpeed = 200,
        snap = Snap(`#${idAttr}`);

      marker.markerPath = snap.path(paths[house.type]).attr({
        fill: '#85b200',
        id: `marker-${house.type}`,
      }).transform(houseIcon.options.houseTransform);
      marker.openedMarkerPath = snap.path(this.openedMarkerPath).attr({
        fill: '#85b200',
        class: 'marker-open-svg',
        id: `marker-open-${house.type}`,
      }).transform(houseIcon.options.openTransform);
      marker.openedMarkerBorder = snap.path(this.openedMerkerBorderStr).attr({
        stroke: '#85b200',
        fill: 'none',
        opacity: 0,
        'stroke-width': '0.4528',
        id: `marker-${house.type}-border`
      }).transform(houseIcon.options.borderTransform);
      marker.villaShape = snap.path(schemaPaths[house.type]).attr({
        stroke: '#EBEFF0',
        fill: 'none',
        opacity: 0,
        'stroke-width': '0.7056',
        id: `marker-${house.type}-villa`
      }).transform(houseIcon.options.villaShapeTransform);
      marker.villaTitle = snap.path(titlePaths[house.type]).attr({
        fill: '#EBEFF0',
        opacity: 0,
        id: `marker-${house.type}-title`
      }).transform(houseIcon.options.villaTitleTransform);
      marker.mouseCatchingTriangle = snap.paper.polygon([42,168, 108,168, 75,220]).attr({
        fill: '#EBEFF0',
        stroke: 'none',
        opacity: 0.0000001,
        'fill-opacity': '0.00004',
        id: `marker-${house.type}-mouse-catcher`,
      });

      $.extend(marker, houseIcon.options, {houseType: house.type});

      function finalizeAnim() {
        this.villaShape.animate({transform: this.villaShapeAnimatedTransform}, animationSpeed);
        this.villaTitle.animate({transform: this.villaTitleAnimatedTransform}, animationSpeed);
        this.openedMarkerBorder.animate({transform: this.borderAnimatedTransform}, animationSpeed);
        setTimeout(() => {
          this.villaShape.animate({opacity: 1}, animationSpeed / 2);
          this.villaTitle.animate({opacity: 1}, animationSpeed / 2);
          this.openedMarkerBorder.animate({opacity: 1}, animationSpeed / 2);
        }, animationSpeed / 2);
        this.markerPath.animate({transform: this.animatedTransform}, animationSpeed, () => {
          this.openedMarkerPath.transform(this.openAnimatedTransform);
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

        this.villaShape.stop().animate({opacity: 0}, animationSpeed / 2);
        this.villaTitle.stop().animate({opacity: 0}, animationSpeed / 2);
        this.openedMarkerBorder.stop().animate({opacity: 0}, animationSpeed / 2);

        setTimeout(() => {
          this.villaShape.animate({transform: this.villaShapeTransform}, animationSpeed);
          this.villaTitle.animate({transform: this.villaShapeTransform}, animationSpeed);
          this.openedMarkerBorder.animate({transform: this.borderTransform}, animationSpeed);
        }, animationSpeed / 2);

        this.openedMarkerPath
          .stop()
          .attr({
            class: 'marker-open-svg'
          });
        this.markerPath
          .stop()
          .attr({
            class: ''
          })
          .animate({transform: this.openTransform}, animationSpeed, () => {
            this.animationPlayer.reverse();
          });
      }

      function runAnim() {
        this.animationPlayer.play();
      }

      marker.markerPath.mouseover(runAnim.bind(marker));

      marker.mouseCatchingTriangle.mouseover(runAnim.bind(marker));

      marker.mouseCatchingTriangle.mouseout((function(evt) {
        let targetId = evt.toElement.id;

        console.log('mouse catcher', targetId);

        if (targetId === `marker-${this.houseType}-title` || targetId === `marker-${this.houseType}-villa` || targetId === `marker-${this.houseType}-border` || targetId === `marker-open-${this.houseType}`) {
          return true;
        }
        resetAnim.call(this);
      }).bind(marker));

      marker.openedMarkerPath.mouseout((function(evt){
        let targetId = evt.toElement.id;

        console.log('original', targetId);

        if (targetId === `marker-${this.houseType}-title` || targetId === `marker-${this.houseType}-villa` || targetId === `marker-${this.houseType}-border` || targetId === `marker-${this.houseType}-mouse-catcher`) {
          return true;
        }
        resetAnim.call(this);
      }).bind(marker));

      marker.animationPlayer = TweenLite.to(`#marker-${house.type}`, 0.3, {
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
