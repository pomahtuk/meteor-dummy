if (Meteor.isClient) {
  Meteor.startup(function() {
    GoogleMaps.load();
  });
}

Template.housesSlide.helpers({
  placeholderOptions: function() {
    if (GoogleMaps.loaded()) {
      return {
        center: new google.maps.LatLng(-37.8136, 144.9631),
        zoom: 8
      };
    }
  }
});

Template.housesSlide.onCreated(function () {
  if (Meteor.isClient) {

    GoogleMaps.ready('placeholderMap', function(map) {
      // clear google map instance as we are not using it, we are simply guarding our code
      // with ready callback to make sure
      // that our map initialized after async loading of google api
      // to prevent render blocking
      $('.map-placeholder-container').remove();

      let botanikaMap = new BotanikaMap();
      botanikaMap.addHousesMarkers([
        {
          type: 'azalia',
          title: 'Азалия',
          coordinates: [60.6374815, 30.173661]
        }, {
          type: 'astra',
          title: 'Астра',
          coordinates: [60.6375815, 30.174661]
        }
      ]);

    });

  }
});
