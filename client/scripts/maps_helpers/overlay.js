Meteor.mapHelpers = !Meteor.mapHelpers ? {} : Meteor.mapHelpers;

$.extend(Meteor.mapHelpers, {

    _initOverlayClass () {
      /** @constructor */
      let BotanikaOverlay = function (bounds, image, map) {

        // Initialize all properties.
        this.bounds_ = bounds;
        this.image_ = image;
        this.map_ = map;

        // Define a property to hold the image's div. We'll
        // actually create this div upon receipt of the onAdd()
        // method so we'll leave it null for now.
        this.div_ = null;

        // Explicitly call setMap on this overlay.
        this.setMap(map);
      }

      BotanikaOverlay.prototype = new google.maps.OverlayView();

      /**
       * onAdd is called when the map's panes are ready and the overlay has been
       * added to the map.
       */
      BotanikaOverlay.prototype.onAdd = function() {

        var div = document.createElement('div');
        div.style.borderStyle = 'solid';
        div.style.borderColor = 'red';
        div.style.borderWidth = '1px';
        div.style.position = 'absolute';

        // Create the img element and attach it to the div.
        var img = document.createElement('img');
        img.src = this.image_;
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.left = '0px';
        img.style.position = 'absolute';

        div.appendChild(img);

        this.div_ = div;

        // Add the element to the "overlayLayer" pane.
        var panes = this.getPanes();
        panes.overlayLayer.appendChild(div);
      };

      BotanikaOverlay.prototype.draw = function() {

        // We use the south-west and north-east
        // coordinates of the overlay to peg it to the correct position and size.
        // To do this, we need to retrieve the projection from the overlay.
        var overlayProjection = this.getProjection();

        // Retrieve the south-west and north-east coordinates of this overlay
        // in LatLngs and convert them to pixel coordinates.
        // We'll use these coordinates to resize the div.
        var sw = overlayProjection.fromLatLngToDivPixel(this.bounds_.getSouthWest());
        var ne = overlayProjection.fromLatLngToDivPixel(this.bounds_.getNorthEast());

        // Resize the image's div to fit the indicated dimensions.
        var div = this.div_;
        div.style.left = sw.x + 'px';
        div.style.top = ne.y + 'px';
        div.style.width = (ne.x - sw.x) + 'px';
        div.style.height = (sw.y - ne.y) + 'px';
      };

      // The onRemove() method will be called automatically from the API if
      // we ever set the overlay's map property to 'null'.
      BotanikaOverlay.prototype.onRemove = function() {
        this.div_.parentNode.removeChild(this.div_);
        this.div_ = null;
      };

      return BotanikaOverlay;
    },

    addOverlay (bounds, map) {
      // var imageBounds = {
      //   north: 60.639197,
      //   south: 60.635766,
      //   east: 30.176519,
      //   west: 30.170803
      // };
      //
      // var overlay = new google.maps.GroundOverlay('/img/botanika_plan.svg', imageBounds);
      // overlay.setMap(map);

      let BotanikaOverlay = this._initOverlayClass();

      // var bounds = new google.maps.LatLngBounds(
      //   new google.maps.LatLng(60.635766, 30.170803),
      //   new google.maps.LatLng(60.639197, 30.176519)
      // );

      let srcImage = '/img/botanika_plan.svg';

      // The custom BotanikaOverlay object contains the USGS image,
      // the bounds of the image, and a reference to the map.
      let overlay = new BotanikaOverlay(bounds, srcImage, map);

      return overlay;
    }
});
