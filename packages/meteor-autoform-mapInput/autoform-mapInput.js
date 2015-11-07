Template.afMapInput.helpers({
  placeholderAdminOptions: function() {
    if (GoogleMaps.loaded()) {
      return {
        center: new google.maps.LatLng(-37.8136, 144.9631),
        zoom: 8
      };
    }
  }
});

var botanikaMap = null;

AutoForm.addInputType('mapInput', {
  template: 'afMapInput',
  valueOut: function() {
    var adminMarker = botanikaMap.getAdminData().adminMarker,
      result = null;

    if (adminMarker) {
      var position = adminMarker.getLatLng();
      result = [position.lat, position.lng];
    }

    return result;
  }
});

Template.afMapInput.onCreated(function () {
  var template = this;

  if (Meteor.isClient) {

    GoogleMaps.ready('placeholderAdminMap', function(map) {
      // clear google map instance as we are not using it, we are simply guarding our code
      // with ready callback to make sure
      // that our map initialized after async loading of google api
      // to prevent render blocking
      $('.admin-map-placeholder-container').remove();

      botanikaMap = new BotanikaMap('admin_map', true);

      var mapHouses = Houses.find({}).fetch();
      // will work only for meteoradmin by yogiben
      var currentHouse = Session.get('admin_doc') || {};

      // exclude current house from map
      mapHouses = mapHouses.filter(function (house) {
        return house._id !== currentHouse._id;
      });

      botanikaMap.addHousesMarkers(mapHouses);

      template.autorun(function () {
        var data = Template.currentData();
        botanikaMap.setAdminData(data);
      });


    });

  }
});