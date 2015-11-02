class BotanikaMap {
  constructor() {
    $.extend(this, {
      center: [60.6374815, 30.173661],
      zoom: 16,
      overlayBounds: [[60.635766, 30.170803], [60.639197, 30.176519]],
      overlayImage: '/img/botanika_plan.svg',
      boundingPoints: [[60.639197, 30.170803], [60.639197, 30.176519], [60.635766, 30.176519], [60.635766, 30.170803]],
      styles: [
        {
          'featureType': 'all',
          'elementType': 'geometry.fill',
          'stylers': [
            {
              'color': '#404045'
            }
          ]
        },
        {
          'featureType': 'all',
          'elementType': 'labels.text.fill',
          'stylers': [
            {
              'color': '#ffffff'
            }
          ]
        },
        {
          'featureType': 'all',
          'elementType': 'labels.icon',
          'stylers': [
            {
              'visibility': 'on'
            }
          ]
        },
        {
          'featureType': 'administrative',
          'elementType': 'all',
          'stylers': [
            {
              'invert_lightness': true
            },
            {
              'saturation': '0'
            },
            {
              'gamma': '1.00'
            },
            {
              'color': '#3d3e40'
            },
            {
              'visibility': 'on'
            }
          ]
        },
        {
          'featureType': 'administrative',
          'elementType': 'geometry.fill',
          'stylers': [
            {
              'visibility': 'on'
            }
          ]
        },
        {
          'featureType': 'administrative',
          'elementType': 'labels.text.fill',
          'stylers': [
            {
              'color': '#ffffff'
            },
            {
              'lightness': '-9'
            },
            {
              'visibility': 'on'
            }
          ]
        },
        {
          'featureType': 'administrative',
          'elementType': 'labels.text.stroke',
          'stylers': [
            {
              'visibility': 'off'
            }
          ]
        },
        {
          'featureType': 'administrative',
          'elementType': 'labels.icon',
          'stylers': [
            {
              'visibility': 'simplified'
            }
          ]
        },
        {
          'featureType': 'administrative.neighborhood',
          'elementType': 'all',
          'stylers': [
            {
              'visibility': 'simplified'
            }
          ]
        },
        {
          'featureType': 'landscape',
          'elementType': 'all',
          'stylers': [
            {
              'lightness': '4'
            },
            {
              'visibility': 'on'
            },
            {
              'color': '#2a2f31'
            }
          ]
        },
        {
          'featureType': 'poi',
          'elementType': 'all',
          'stylers': [
            {
              'visibility': 'simplified'
            }
          ]
        },
        {
          'featureType': 'road.highway',
          'elementType': 'geometry',
          'stylers': [
            {
              'visibility': 'on'
            },
            {
              'color': '#4b555a'
            },
            {
              'lightness': '0'
            }
          ]
        },
        {
          'featureType': 'road.highway',
          'elementType': 'geometry.stroke',
          'stylers': [
            {
              'lightness': '0'
            },
            {
              'gamma': '0.67'
            },
            {
              'weight': '1'
            }
          ]
        },
        {
          'featureType': 'road.highway',
          'elementType': 'labels',
          'stylers': [
            {
              'visibility': 'on'
            },
            {
              'saturation': '-100'
            },
            {
              'lightness': '-13'
            }
          ]
        },
        {
          'featureType': 'road.highway',
          'elementType': 'labels.text',
          'stylers': [
            {
              'visibility': 'off'
            }
          ]
        },
        {
          'featureType': 'road.highway',
          'elementType': 'labels.text.stroke',
          'stylers': [
            {
              'visibility': 'off'
            }
          ]
        },
        {
          'featureType': 'road.highway.controlled_access',
          'elementType': 'geometry.fill',
          'stylers': [
            {
              'lightness': '-8'
            }
          ]
        },
        {
          'featureType': 'road.highway.controlled_access',
          'elementType': 'geometry.stroke',
          'stylers': [
            {
              'weight': '1.50'
            }
          ]
        },
        {
          'featureType': 'road.arterial',
          'elementType': 'geometry',
          'stylers': [
            {
              'visibility': 'on'
            },
            {
              'weight': '0.50'
            },
            {
              'color': '#3d3e40'
            }
          ]
        },
        {
          'featureType': 'road.arterial',
          'elementType': 'labels',
          'stylers': [
            {
              'visibility': 'off'
            }
          ]
        },
        {
          'featureType': 'road.arterial',
          'elementType': 'labels.text.stroke',
          'stylers': [
            {
              'visibility': 'off'
            }
          ]
        },
        {
          'featureType': 'road.arterial',
          'elementType': 'labels.icon',
          'stylers': [
            {
              'visibility': 'off'
            }
          ]
        },
        {
          'featureType': 'road.local',
          'elementType': 'all',
          'stylers': [
            {
              'color': '#3d3e40'
            },
            {
              'lightness': '11'
            }
          ]
        },
        {
          'featureType': 'road.local',
          'elementType': 'geometry',
          'stylers': [
            {
              'weight': '0.4'
            }
          ]
        },
        {
          'featureType': 'road.local',
          'elementType': 'labels.text.fill',
          'stylers': [
            {
              'visibility': 'on'
            },
            {
              'color': '#ffffff'
            },
            {
              'lightness': '-36'
            }
          ]
        },
        {
          'featureType': 'road.local',
          'elementType': 'labels.text.stroke',
          'stylers': [
            {
              'visibility': 'off'
            }
          ]
        },
        {
          'featureType': 'transit',
          'elementType': 'all',
          'stylers': [
            {
              'visibility': 'simplified'
            },
            {
              'hue': '#0042ff'
            },
            {
              'lightness': '-33'
            },
            {
              'saturation': '-6'
            },
            {
              'gamma': '1.51'
            }
          ]
        },
        {
          'featureType': 'transit',
          'elementType': 'geometry.fill',
          'stylers': [
            {
              'visibility': 'on'
            },
            {
              'color': '#2a2d30'
            },
            {
              'lightness': '3'
            }
          ]
        },
        {
          'featureType': 'transit',
          'elementType': 'labels.text',
          'stylers': [
            {
              'visibility': 'simplified'
            }
          ]
        },
        {
          'featureType': 'transit',
          'elementType': 'labels.text.stroke',
          'stylers': [
            {
              'visibility': 'on'
            }
          ]
        },
        {
          'featureType': 'water',
          'elementType': 'geometry.fill',
          'stylers': [
            {
              'lightness': '0'
            },
            {
              'color': '#171717'
            }
          ]
        },
        {
          'featureType': 'water',
          'elementType': 'labels.text',
          'stylers': [
            {
              'visibility': 'on'
            }
          ]
        },
        {
          'featureType': 'water',
          'elementType': 'labels.text.stroke',
          'stylers': [
            {
              'visibility': 'on'
            }
          ]
        }
      ]
    });

    this.cretaeMap();
    // temp for devmode
    this.addBoundingMarkers();
  }

  createMap() {
    const map = new L.Map('map', {
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
    const map = {this};
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
    const {map, overlayImage, overlayBounds} = {this};
    let overlay = L.imageOverlay(overlayImage, overlayBounds).addTo(map);
  }
}

this.BotanikaMap = BotanikaMap;
