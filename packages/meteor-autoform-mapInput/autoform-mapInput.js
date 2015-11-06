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
  valueConverters: {
    'stringArray': function (val) {
      if (_.isArray(val)) {
        return _.map(val, function (item) {
          return $.trim(item);
        });
      }
      return val;
    },
    'number': AutoForm.Utility.stringToNumber,
    'numberArray': function (val) {
      if (_.isArray(val)) {
        return _.map(val, function (item) {
          item = $.trim(item);
          return AutoForm.Utility.stringToNumber(item);
        });
      }
      return val;
    },
    'boolean': AutoForm.Utility.stringToBool,
    'booleanArray': function (val) {
      if (_.isArray(val)) {
        return _.map(val, function (item) {
          item = $.trim(item);
          return AutoForm.Utility.stringToBool(item);
        });
      }
      return val;
    },
    'date': AutoForm.Utility.stringToDate,
    'dateArray': function (val) {
      if (_.isArray(val)) {
        return _.map(val, function (item) {
          item = $.trim(item);
          return AutoForm.Utility.stringToDate(item);
        });
      }
      return val;
    }
  },
  valueOut: function() {
    var data = botanikaMap.retreiveAdminData();
    var coords = data.adminMarker.getLatLng();
    debugger;
  },
  contextAdjust: function (context) {
    console.log(context);

    return context;
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

      template.autorun(function () {
        var data = Template.currentData();

        botanikaMap.setAdminData(botanikaMap)
      });


    });

  }
});