class BotanikaMap {
  constructor(isAdmin = false) {
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
    //this.addHousesMarkers();
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
          iconSize: [50, 60],
          iconAnchor: [25, 60],
          html: `<svg id="svg-${houseType}" width="150" height="220"></svg>`
        }
      };

    $.extend(house, DEFAULTS);

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

    house.svgRelatedProperties = {
      //snap,
      villaTitle,
      animationPlayer: TweenLite.to(`#marker-${house.type}`, 0.3, {
        morphSVG: `#marker-open-${house.type}`,
        paused: true,
        onComplete: finalizeAnim.bind(house)
      }).seek(0),
      markerOpened: false,
      markerPath,
      openedMarkerPath,
      openedMarkerBorder,
      villaShapeImg,
      mouseCatchingTriangle,
      animationInProgress,
      animationSpeed,
      finalizeAnim,
      runAnim,
      resetAnim,
    };

    function finalizeAnim() {
      let {villaShapeImg, villaTitle, openedMarkerBorder, markerPath, openedMarkerPath, animationSpeed, animationInProgress} = this.svgRelatedProperties,
        {villaImgShapeAnimatedTransform, villaTitleAnimatedTransform, borderAnimatedTransform, animatedTransform, openAnimatedTransform} = this.transforms;

      villaShapeImg.animate({transform: villaImgShapeAnimatedTransform}, animationSpeed);
      villaTitle.animate({transform: villaTitleAnimatedTransform}, animationSpeed);
      openedMarkerBorder.animate({transform: borderAnimatedTransform}, animationSpeed);
      setTimeout(() => {
        villaShapeImg.animate({opacity: 1}, animationSpeed / 2);
        villaTitle.animate({opacity: 1}, animationSpeed / 2);
        openedMarkerBorder.animate({opacity: 1}, animationSpeed / 2);
      }, animationSpeed / 2);

      markerPath.animate({transform: animatedTransform}, animationSpeed, () => {
        openedMarkerPath.transform(openAnimatedTransform);
        openedMarkerPath.attr({
          class: 'marker-open-svg marker-open-svg--visible'
        });
        markerPath.attr({
          class: 'marker-hidden'
        });

        animationInProgress = false;
        this.svgRelatedProperties.markerOpened = true;
      });
    }

    function runAnim() {
      let {animationInProgress, animationPlayer, markerOpened} = this.svgRelatedProperties;
      if (!animationInProgress && !markerOpened) {
        $(this.marker._icon).addClass('show-overflow');
        animationInProgress = true;
        animationPlayer.play();
      }
    }

    function resetAnim(immediate = false) {
      let {animationInProgress, villaShapeImg, villaTitle, openedMarkerBorder, animationSpeed, openedMarkerPath, markerPath, animationPlayer} = this.svgRelatedProperties,
        {villaTitleTransform, villaImgShapeTransform, borderTransform, openTransform} = this.transforms;

      if (animationInProgress || !this.svgRelatedProperties.markerOpened) {
        return true;
      }

      animationInProgress = true;

      if (immediate) {
        let animationSpeed = 0;
      }

      villaShapeImg.stop().animate({opacity: 0}, animationSpeed / 2);
      villaTitle.stop().animate({opacity: 0}, animationSpeed / 2);
      openedMarkerBorder.stop().animate({opacity: 0}, animationSpeed / 2);

      setTimeout(() => {
        villaShapeImg.animate({transform: villaImgShapeTransform}, animationSpeed);
        villaTitle.animate({transform: villaTitleTransform}, animationSpeed);
        openedMarkerBorder.animate({transform: borderTransform}, animationSpeed);
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
        .animate({transform: openTransform}, animationSpeed, () => {
          if (immediate) {
            animationPlayer.seek(0)
          } else {
            animationPlayer.reverse();
          }
          animationInProgress = false;
          this.svgRelatedProperties.markerOpened = false;
          $(this.marker._icon).removeClass('show-overflow');
        });
    }

    if (Meteor.Device.isDesktop()) {
      markerPath.mouseover(house.svgRelatedProperties.runAnim.bind(house));
      mouseCatchingTriangle.mouseover(house.svgRelatedProperties.runAnim.bind(house));

      mouseCatchingTriangle.mouseout(function(evt) {
        let targetId = evt.toElement ? evt.toElement.id : 'null',
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

        house.svgRelatedProperties.resetAnim.call(house);
      });

      openedMarkerPath.mouseout(function(evt){
        let targetId = evt.toElement ? evt.toElement.id : 'null',
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
        house.svgRelatedProperties.resetAnim.call(house);
      });

      house.marker.on('mouseleave', house.svgRelatedProperties.resetAnim.bind(house));
    } else {
      house.marker.on('click', () => {
        if (!house.svgRelatedProperties.markerOpened) {
          let housesWithOpenedMarkers = this.houses.filter((singleHouse) => singleHouse.svgRelatedProperties.markerOpened);
          housesWithOpenedMarkers.forEach((singleHouse) => {
            singleHouse.svgRelatedProperties.resetAnim.call(singleHouse);
          })
          house.svgRelatedProperties.runAnim.call(house);
        } else {
          house.svgRelatedProperties.resetAnim.call(house);
        }
      });
    }
  }

  addHousesMarkers(houses = []) {
    let map = this.map;

    this.houses = houses;

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
