Template.housesSlide.onCreated(() => {
  // // We can use the `ready` callback to interact with the map API once the map is ready.
  // GoogleMaps.ready('botanikaMap', (map) => {
  //
  //   Meteor.mapHelpers.createBoundingMarkers(mapInstance)
  //
  // });
});

Template.housesSlide.onRendered(function () {
  if (Meteor.isClient) {
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
    ])
  }
});
