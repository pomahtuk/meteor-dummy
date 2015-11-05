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

  _assignHouseMapProperties(house) {
    let houseType = house.type,
      openedTransformRatio = 0.6,
      transformRatio = 0.6896551724137931,
      scaleRatio = (220 / 60) * 0.55,
      DEFAULTS = {
        transforms: {
          borderTransform:`T0,0,s1,1`,
          borderAnimatedTransform: `t1.5,-79.5,s${scaleRatio + 1.05},${scaleRatio + 1.05}`,

          villaImgShapeTransform: `s${transformRatio - 0.3},${transformRatio - 0.3}`,
          villaImgShapeAnimatedTransform: `t0,-90,s1.2,1.2`,

          villaTitleTransform: `t0,53,s${transformRatio - 0.3},${transformRatio - 0.3}`,
          villaTitleAnimatedTransform: `s1.1,1.1`,

          houseTransform: `S${transformRatio},${transformRatio},0,0t48.2,235`,
          animatedTransform: `s${scaleRatio},${scaleRatio},t8,40`,

          openTransform: `S${openedTransformRatio},${openedTransformRatio},0,0,t64.75,275`,
          openAnimatedTransform: `S${scaleRatio},${scaleRatio},0,0,t-21.45,17.90`,
        },

        iconOptions: {
          iconHeight: 60,
          className: `botanika-house-marker botanika-house-${houseType}`,
          iconSize: [150, 220],
          iconAnchor: [75, 220],
          html: `<svg id="svg-${houseType}" width="150" height="220"></svg>`
        }
      };

    switch (houseType) {
      case 'azalia':
        $.extend(DEFAULTS.transforms, {
          houseTransform: `S${transformRatio},${transformRatio},0,0t48.2,235`,
          animatedTransform: `s${scaleRatio},${scaleRatio},t8,40`,

          openTransform: `S${openedTransformRatio},${openedTransformRatio},0,0,t64.75,275`,
          openAnimatedTransform: `S${scaleRatio},${scaleRatio},0,0,t-21.45,17.90`,
        })
        $.extend(house, DEFAULTS);
        break;
      default:
        $.extend(house, DEFAULTS);
    }

  }

  _createSvgElements(house) {
    let animationInProgress = false,
      allreadyAnimated = false,
      housePath = paths[house.type],
      animationSpeed = 200;

    function createOpenedMarker(snap) {
      let openedMarkerCircle = snap.paper.circle(59, 35, 35).attr({
          id: `marker-${house.type}-open-circle`
        }),
        openedMarkerLeg = snap.paper.polygon([55.5,69, 60.5,69, 58,94]).attr({
          id: `marker-${house.type}-open-leg`
        });
      MorphSVGPlugin.convertToPath(`#marker-${house.type}-open-circle`);
      MorphSVGPlugin.convertToPath(`#marker-${house.type}-open-leg`);

      let path1 = Snap.select(`#marker-${house.type}-open-circle`).attr('d');
      let path2 = Snap.select(`#marker-${house.type}-open-leg`).attr('d');

      Snap.select(`#marker-${house.type}-open-circle`).remove();
      Snap.select(`#marker-${house.type}-open-leg`).remove();

      let openedMarkerPath = snap.path(path1 + path2).attr({
        fill: '#85b200',
        class: 'marker-open-svg',
        id: `marker-open-${house.type}`,
      }).transform(house.transforms.openTransform);

      return openedMarkerPath;
    }

    let snap = Snap(`#svg-${house.type}`),
      markerPath = snap.path(housePath).attr({
        fill: '#85b200',
        id: `marker-${house.type}`,
      }).transform(house.transforms.houseTransform),
      openedMarkerPath = createOpenedMarker(snap),
      openedMarkerBorder = snap.circle(74.5, 186, 24).attr({
        stroke: '#85b200',
        fill: 'none',
        opacity: 0,
        'stroke-width': '0.3528',
        id: `marker-house-${house.type}-border`
      }).transform(house.transforms.borderTransform),
      villaShapeImg = snap.paper.image('/img/image@2x.png', 25, 157, 98, 48).attr({
        opacity: 0,
        id: `marker-${house.type}-villa`,
      }).transform(house.transforms.villaImgShapeTransform),
      mouseCatchingTriangle = snap.paper.polygon([42,168, 108,168, 75,220]).attr({
        fill: '#ff0000',
        'fill-opacity': 0.000001,
        opacity: 0.0001,
        stroke: 'none',
        strokeWidth: '0px',
        id: `marker-${house.type}-mouse-catcher`,
      });

    let villaText = snap.paper.text(74.5, 140, 'ВИЛЛА').attr({
        'font-size': 11.2,
        'font-family': 'Verdana',
        textAnchor: 'middle',
        fill: '#EBEFF0',
        id: `marker-${house.type}-title`
      }),
      villaName = snap.paper.text(74.5, 154, house.title.toUpperCase()).attr({
        'font-size': 11.2,
        'font-family': 'Verdana',
        textAnchor: 'middle',
        fill: '#EBEFF0',
        id: `marker-${house.type}-title-name`
      }),
      villaTitle = snap.g(villaText, villaName).attr({
        opacity: 0,
        id: `marker-${house.type}-title-group`
      }).transform(house.transforms.villaTitleTransform);

    let animationPlayer = TweenLite.to(`#marker-${house.type}`, 0.3, {
      morphSVG: `#marker-open-${house.type}`,
      paused: true,
      onComplete: finalizeAnim
    });
    animationPlayer.seek(0);

    function finalizeAnim() {
      villaShapeImg.animate({transform: house.transforms.villaImgShapeAnimatedTransform}, animationSpeed);
      villaTitle.animate({transform: house.transforms.villaTitleAnimatedTransform}, animationSpeed);
      openedMarkerBorder.animate({transform: house.transforms.borderAnimatedTransform}, animationSpeed);
      setTimeout(() => {
        villaShapeImg.animate({opacity: 1}, animationSpeed / 2);
        villaTitle.animate({opacity: 1}, animationSpeed / 2);
        openedMarkerBorder.animate({opacity: 1}, animationSpeed / 2);
      }, animationSpeed / 2);

      markerPath.animate({transform: house.transforms.animatedTransform}, animationSpeed, () => {
        openedMarkerPath.transform(house.transforms.openAnimatedTransform);
        openedMarkerPath.attr({
          class: 'marker-open-svg marker-open-svg--visible'
        });
        markerPath.attr({
          class: 'marker-hidden'
        });

        animationInProgress = false;
        allreadyAnimated = true;
      });
    }

    function runAnim() {
      if (!animationInProgress && !allreadyAnimated) {
        animationInProgress = true;
        animationPlayer.play();
      }
    }

    function resetAnim(immediate = false) {
      animationInProgress = true;

      if (immediate) {
        let animationSpeed = 0;
      }

      villaShapeImg.stop().animate({opacity: 0}, animationSpeed / 2);
      villaTitle.stop().animate({opacity: 0}, animationSpeed / 2);
      openedMarkerBorder.stop().animate({opacity: 0}, animationSpeed / 2);

      setTimeout(() => {
        villaShapeImg.animate({transform: house.transforms.villaImgShapeTransform}, animationSpeed);
        villaTitle.animate({transform: house.transforms.villaImgShapeTransform}, animationSpeed);
        openedMarkerBorder.animate({transform: house.transforms.borderTransform}, animationSpeed);
      }, animationSpeed / 2);

      openedMarkerPath
        .stop()
        .attr({
          class: 'marker-open-svg'
        });

      markerPath
        .stop()
        .attr({
          class: ''
        })
        .animate({transform: house.transforms.openTransform}, animationSpeed, () => {
          if (immediate){
            animationPlayer.seek(0)
          } else {
            animationPlayer.reverse();
          }
          allreadyAnimated = false;
          animationInProgress = false;
        });
    }


    markerPath.mouseover(runAnim);
    mouseCatchingTriangle.mouseover(function () {
      runAnim();
    })

    mouseCatchingTriangle.mouseout(function(evt) {
      let targetId = evt.toElement.id,
        allowedTargets = [
          `marker-${house.type}-title`,
          `marker-${house.type}-title-group`,
          `marker-${house.type}-title-name`,
          `marker-${house.type}-villa`,
          `marker-open-${house.type}`,
          `marker-${house.type}-border`,
          `marker-${house.type}`,
          `marker-${house.type}-mouse-catcher`,
        ];

      if (allowedTargets.indexOf(targetId) !== -1) {
        return true;
      }

      resetAnim();
    });

    openedMarkerPath.mouseout(function(evt){
      let targetId = evt.toElement.id,
        allowedTargets = [
          `marker-${house.type}-title`,
          `marker-${house.type}-title-group`,
          `marker-${house.type}-title-name`,
          `marker-${house.type}-villa`,
          `marker-open-${house.type}`,
          `marker-${house.type}-border`,
          `marker-${house.type}`,
          `marker-${house.type}-mouse-catcher`,
        ];
      if (allowedTargets.indexOf(targetId) !== -1) {
        return true;
      }
      resetAnim();
    });

    house.marker.on('mouseleave', resetAnim);
  }

  addHousesMarkers(houses = []) {
    let map = this.map;

    houses.forEach((house, index) => {
      this._assignHouseMapProperties(house);
      let point = house.coordinates,
        markerOptions = {
          icon: L.divIcon(house.iconOptions),
          riseOnHover: true
        };

      house.marker = L.marker(point, markerOptions).addTo(map);
      this._createSvgElements(house);

    });
  }
}

this.BotanikaMap = BotanikaMap;
