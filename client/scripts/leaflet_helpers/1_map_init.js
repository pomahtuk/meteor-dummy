class BotanikaMap {
  constructor(containerId = 'map', isAdmin = false) {

    let openedTransformRatio = 0.6,
      transformRatio = 0.6896551724137931,
      scaleRatio = (220 / 60) * 0.55;

    $.extend(this, {
      isAdmin,
      containerId,
      markersInstancesCache: {},
      adminObject: {},
      center: [60.6374815, 30.173661],
      zoom: 16,
      overlayBounds: [[60.635766, 30.170803], [60.639197, 30.176519]],
      overlayImage: '/img/botanika_plan.svg',
      boundingPoints: [[60.639197, 30.170803], [60.639197, 30.176519], [60.635766, 30.176519], [60.635766, 30.170803]],
      addedMarkers: [],

      animationSpeed: 200,

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

      markerShadowTransform: `S0.5,0.5`,
      markerShadowAnimatedTransform: `T-6,3,S1.5,1.5`,

      styles
    });

    this._createMap();
    this._addPlanOverlay();
    // temp for devmode
    // !isAdmin ? this._addBoundingMarkers() : this._bindMapAdminEvents();
    isAdmin ? this._bindMapAdminEvents() : null;
  }

  _getHouseSlide(house) {
    return $(`[data-hash=${house.type}]`).index();
  }

  _createMap() {
    let map = new L.Map(this.containerId, {
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

  _addPlanOverlay() {
    let overlay = L.imageOverlay(this.overlayImage, this.overlayBounds).addTo(this.map);
  }

  _createOpenedMarker(snap, house) {
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
    }).transform(this.openTransform);

    return openedMarkerPath;
  }

  _createHouseMarkerTitle(snap, house) {
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
      }).transform(this.villaTitleTransform);

    return villaTitle;
  }

  _createHouseMarkerMorphPlayer(house, callback) {
    return TweenLite.to(`#marker-${house.type}`, 0.3, {
      morphSVG: `#marker-open-${house.type}`,
      paused: true,
      onComplete: callback
    }).seek(0);
  }

  _finalizeAnim(marker) {
    let {villaShapeImg, villaTitle, openedMarkerBorder, markerPath, openedMarkerPath, markerShadow} = marker,
      {villaImgShapeAnimatedTransform, villaTitleAnimatedTransform, borderAnimatedTransform, animatedTransform, openAnimatedTransform, markerShadowAnimatedTransform, animationSpeed} = this;

    villaShapeImg.animate({transform: villaImgShapeAnimatedTransform}, animationSpeed);
    villaTitle.animate({transform: villaTitleAnimatedTransform}, animationSpeed);
    openedMarkerBorder.animate({transform: borderAnimatedTransform}, animationSpeed);

    setTimeout(() => {
      villaShapeImg.animate({opacity: 1}, animationSpeed / 2);
      villaTitle.animate({opacity: 1}, animationSpeed / 2);
      openedMarkerBorder.animate({opacity: 1}, animationSpeed / 2);

      markerShadow.animate({transform: markerShadowAnimatedTransform}, animationSpeed / 2);
    }, animationSpeed / 2);

    markerPath.animate({transform: animatedTransform}, animationSpeed, () => {
      openedMarkerPath.transform(openAnimatedTransform);
      openedMarkerPath.attr({
        class: 'marker-open-svg marker-open-svg--visible'
      });
      markerPath.attr({
        class: 'marker-hidden'
      });

      marker.animationInProgress = false;
      marker.markerOpened = true;
    });
  }

  _runAnim(marker) {
    let {animationInProgress, animationPlayer, markerOpened} = marker;
    if (!animationInProgress && !markerOpened) {
      $(marker._icon).addClass('show-overflow');
      marker.animationInProgress = true;
      animationPlayer.play();
    }
  }

  _resetAnim(marker) {
    let {animationInProgress, villaShapeImg, villaTitle, openedMarkerBorder, openedMarkerPath, markerPath, markerShadow, animationPlayer, markerOpened} = marker,
      {villaTitleTransform, villaImgShapeTransform, borderTransform, openTransform, markerShadowTransform, animationSpeed} = this;

    if (animationInProgress || !markerOpened) {
      return true;
    }

    animationInProgress = true;

    villaShapeImg.stop().animate({opacity: 0}, animationSpeed / 2);
    villaTitle.stop().animate({opacity: 0}, animationSpeed / 2);
    openedMarkerBorder.stop().animate({opacity: 0}, animationSpeed / 2);

    villaShapeImg.animate({transform: villaImgShapeTransform}, animationSpeed);
    villaTitle.animate({transform: villaTitleTransform}, animationSpeed);
    openedMarkerBorder.animate({transform: borderTransform}, animationSpeed);


    setTimeout(() => {
      markerShadow.animate({transform: markerShadowTransform}, animationSpeed / 2);
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
        animationPlayer.reverse();

        marker.animationInProgress = false;
        marker.markerOpened = false;

        $(marker._icon).removeClass('show-overflow');
      });
  }

  _bindDesktopEvents(house) {
    let marker = house.marker,
      {markerPath, mouseCatchingTriangle, openedMarkerPath} = marker;

    function slideToHouse() {
      let slideIndex = this._getHouseSlide(house);
      Meteor.swiperV.slideTo(slideIndex);
    }

    markerPath.mouseover(this._runAnim.bind(this, marker));
    mouseCatchingTriangle.mouseover(this._runAnim.bind(this, marker));

    mouseCatchingTriangle.mouseout((evt) => {
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

      this._resetAnim(marker);
    });

    openedMarkerPath.mouseout((evt) => {
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

      this._resetAnim(marker);
    });

    // // has to be optimized
    // openedMarkerPath.click(slideToHouse.bind(this));
    // markerPath.click(slideToHouse.bind(this));
    // mouseCatchingTriangle.click(slideToHouse.bind(this));

    marker.on('mouseleave', this._resetAnim.bind(this, marker));
    marker.on('click', slideToHouse.bind(this));
  }

  _bindMobileEvents(house) {
    let marker = house.marker;

    marker.on('click', () => {
      if (!marker.markerOpened) {
        let allOpenedMarkers = this.addedMarkers.filter((singleMarker) => singleMarker.markerOpened);
        allOpenedMarkers.forEach((singleMarker) => {
          this._resetAnim(singleMarker);
        })
        this._runAnim(marker);
      } else {
        this._resetAnim(marker);
        // better use 2 lines
        Meteor.swiperV.slideTo(this._getHouseSlide(house));
      }
    });
  }

  _bindMapAdminEvents() {
    this.map.on('click', (evt) => {
      let {latlng} = evt;
      // if admin marker is not created
      if (!this.adminObject.adminMarker) {
        // create marker
        let adminMarker = this._createAdminMarker();
        // set latlng
        adminMarker.setLatLng(latlng);
        // set reference
        this.adminObject.adminMarker = adminMarker;
      }
    })
  }

  _createAdminMarker() {
    let point = [0, 0],
      markerOptions = {
        icon: L.icon({
          iconUrl: '/img/flowers/admin_marker.png',
          iconRetinaUrl: '/img/flowers/admin_marker@2x.png',
          iconSize: [35, 45],
          iconAnchor: [17.5, 45]
        }),
        zIndexOffset: 2000,
        draggable: true,
        riseOnHover: true
      };

    return L.marker(point, markerOptions).addTo(this.map);
  }

  _createShadowMarker(house) {
    let map = this.map;

    let point = house.coordinates,
      markerOptions = {
        icon: L.divIcon({
          className: `botanika-house-marker-shadow botanika-house-shadow-${house.type}`,
          iconSize: [80, 40],
          iconAnchor: [40, 20],
          html: `<svg id="svg-shadow-${house.type}" width="80" height="40"></svg>`
        }),
        zIndexOffset: 0,
        riseOnHover: false
      };

    return L.marker(point, markerOptions);//.addTo(map);
  }

  _drawSvgMarkerShadow(house) {
    let snap = Snap(`#svg-shadow-${house.type}`),
      shadow = snap.filter(Snap.filter.shadow(0, 0, 3, '#000')),
      markerShadow = snap.paper.ellipse(36, 20, 16, 3).attr({
        filter: shadow,
        fill: '#342A2B',
        id: `svg-shadow-${house.type}-ellipse`
      }).transform(this.markerShadowTransform);

    house.shadowSvgElement = markerShadow;
  }

  _createSvgElements(marker, house) {
    let housePath = paths[house.type];

    let snap = Snap(`#svg-${house.type}`),
      markerPath = snap.path(housePath).attr({
        fill: '#85b200',
        id: `marker-${house.type}`,
      }).transform(this.houseTransform);

    if (this.isAdmin) {
      // do all magick
      // and do bind events or create complex markers

      return true;
    }

    let openedMarkerPath = this._createOpenedMarker(snap, house),
      markerShadow = house.shadowSvgElement,
      openedMarkerBorder = snap.circle(74.5, 186, 24).attr({
        stroke: '#85b200',
        fill: 'none',
        opacity: 0,
        'stroke-width': '0.3528',
        id: `marker-house-${house.type}-border`
      }).transform(this.borderTransform),

      villaShapeImg = snap.paper.image('/img/image@2x.png', 25, 157, 98, 48).attr({
        opacity: 0,
        id: `marker-${house.type}-villa`,
      }).transform(this.villaImgShapeTransform),

      mouseCatchingTriangle = snap.paper.polygon([42,168, 108,168, 75,220]).attr({
        fill: '#ff0000',
        'fill-opacity': 0.000001,
        opacity: 0.0001,
        stroke: 'none',
        strokeWidth: '0px',
        id: `marker-${house.type}-mouse-catcher`,
      }),

      villaTitle = this._createHouseMarkerTitle(snap, house);

    let animationPlayer = this._createHouseMarkerMorphPlayer(house, this._finalizeAnim.bind(this, marker));

    $.extend(marker, {
      markerOpened: false,
      markerShadow,
      animationPlayer,
      villaTitle,
      markerPath,
      openedMarkerPath,
      openedMarkerBorder,
      villaShapeImg,
      mouseCatchingTriangle,
    });
  }

  _updateMakersAfterUnclustering() {
    this.houses.forEach( (house, index) => {
      let $svg = $(`#svg-${house.type}`);

      // if svg created and no paths inside present
      // consider it unclustered, put from cache
      // and attach events?
      if ($svg.length !==0 && $svg.find('path').length === 0) {
        // i want to be sure that shadow marker added to dom
        setTimeout(() => {
          // replace elements with our copies
          $svg.replaceWith(this.markersInstancesCache[house.type].clone());
          // stop right here if we are rendering admin map
          if (this.isAdmin) {
            return true;
          }
          // for regular map
          // recreate shadow
          this._drawSvgMarkerShadow(house);
          // refresh references
          // so event will be attached properly
          $.extend(house.marker, {
            markerPath: Snap.select(`#marker-${house.type}`),
            markerShadow: Snap.select(`#svg-shadow-${house.type}-ellipse`),
            villaTitle: Snap.select(`#marker-${house.type}-title-group`),
            openedMarkerPath: Snap.select(`#marker-open-${house.type}`),
            openedMarkerBorder: Snap.select(`#marker-house-${house.type}-border`),
            villaShapeImg: Snap.select(`#marker-${house.type}-villa`),
            mouseCatchingTriangle: Snap.select(`#marker-${house.type}-mouse-catcher`),
            animationPlayer: this._createHouseMarkerMorphPlayer(house, this._finalizeAnim.bind(this, house.marker))
          });
          // bind events
          if (Meteor.Device.isDesktop()) {
            this._bindDesktopEvents(house);
          } else {
            this._bindMobileEvents(house);
          }
        }, 10);
      }
    });
  }

  setAdminData(dataObj) {
    let {adminObject} = this;

    // if ve do not have value now and template have a value
    if (dataObj.value && dataObj.value.length === 2) {
      // assing template coordinates to marker
      if (!adminObject.adminMarker) {
        // if marker not yet created
        adminObject.adminMarker = this._createAdminMarker()
      }
      // update location
      adminObject.adminMarker.setLatLng(dataObj.value);
    }
    // store data for now
    $.extend(adminObject, dataObj);
  }

  getAdminData() {
    return this.adminObject;
  }

  addHousesMarkers(houses = []) {
    let {map} = this;
    this.houses = houses;

    // create cluster to add markers to
    let clusteredMarkers = L.markerClusterGroup({
      maxClusterRadius: 60,
      iconCreateFunction (cluster) {
        return L.divIcon({
          html: `
            <svg id="snap" width="70" height="100">
              <defs>
                <filter id="Sigv90p281" filterUnits="userSpaceOnUse">
                  <feGaussianBlur in="SourceAlpha" stdDeviation="3"></feGaussianBlur>
                  <feOffset dx="0" dy="0" result="offsetblur"></feOffset>
                  <feFlood flood-color="#000000"></feFlood>
                  <feComposite in2="offsetblur" operator="in">
                  </feComposite>
                  <feComponentTransfer>
                    <feFuncA type="linear" slope="1"></feFuncA>
                  </feComponentTransfer>
                  <feMerge>
                    <feMergeNode></feMergeNode>
                    <feMergeNode in="SourceGraphic"></feMergeNode>
                  </feMerge>
                </filter>
              </defs>
              <ellipse cx="27" cy="95" rx="16" ry="3" filter="url('#Sigv90p281')" fill="#342a2b" id="svg-azalia-ellipse"></ellipse>
              <path fill="#85b200" id="marker-open-azalia" transform="matrix(1,0,0,1,-24,2)" class="marker-open-svg" d="M94,35 C94,54.329966244085,78.329966244085,70,59,70,39.670033755915,70,24,54.329966244085,24,35,24,15.670033755915,39.670033755915,0,59,0,78.329966244085,0,94,15.670033755915,94,35zM55.5,69 L60.5,69,58,94,55.5,69z"></path>
              <text x="35" y="25" font-weigth="bold" fill="#ebeff0" id="marker-azalia-title-name" style="font-size: 16px; text-anchor: middle;">${cluster.getChildCount()}</text>
              <text x="35" y="42" fill="#ebeff0" id="marker-azalia-title-name" style="font-size: 10px; font-family: Verdana; text-anchor: middle;">Поселок</text>
              <text x="35" y="55" fill="#ebeff0" id="marker-azalia-title-name" style="font-size: 10px; font-family: Verdana; text-anchor: middle;">Ботаника</text>
            </svg>
          `,
          className: 'mycluster',
          iconSize: [70, 100],
          iconAnchor: [35, 95],
          zIndexOffset: 1000,
        });
      }
    });
    clusteredMarkers.on('animationMarkupRendered', this._updateMakersAfterUnclustering.bind(this));
    map.addLayer(clusteredMarkers);

    // create cluster to add marker shadows to
    let clusteredMarkerShadows = L.markerClusterGroup({
      maxClusterRadius: 60,
      iconCreateFunction (cluster) {
        return L.divIcon({
          // icon should be empty - i don't care about shadown group now
          html: '',
          className: 'mycluster',
          iconSize: L.point(40, 40),
          zIndexOffset: 500,
        });
      }
    });
    // clusteredMarkerShadows.on('animationMarkupRendered', this._updateMakersAfterUnclustering.bind(this));
    map.addLayer(clusteredMarkerShadows);

    // go throuth all houses and create initial markers
    houses.forEach((house, index) => {
      // convert input format
      house.type = house.houseType;

      let point = house.coordinates,
        markerOptions = {
          icon: L.divIcon({
            className: `botanika-house-marker botanika-house-${house.type}`,
            iconSize: [50, 60],
            iconAnchor: [25, 60],
            html: `<svg id="svg-${house.type}" width="150" height="220"></svg>`
          }),
          zIndexOffset: 1000,
          riseOnHover: true
        };

      let marker = L.marker(point, markerOptions);
      // save reference to house
      house.marker = marker;
      // add current marker to cluster
      clusteredMarkers.addLayer(marker);


      // add a shadow marker
      let shadowMarker = this._createShadowMarker(house);
      clusteredMarkerShadows.addLayer(shadowMarker);
      //marker.shadowMarker.addTo(map);
      this._drawSvgMarkerShadow(house);

      //create regular marker
      this._createSvgElements(marker, house);
      // save reference to created element
      this.markersInstancesCache[house.type] = $(`#svg-${house.type}`).clone();

      // should i push a shadow as well? or is it ok as it is?
      this.addedMarkers.push(marker);

      // stop right here if we are rendering admin map
      if (this.isAdmin) {
        return true;
      }
      // otherwise

      // and bind events
      if (Meteor.Device.isDesktop()) {
        this._bindDesktopEvents(house);
      } else {
        this._bindMobileEvents(house);
      }


    });
  }
}

this.BotanikaMap = BotanikaMap;
