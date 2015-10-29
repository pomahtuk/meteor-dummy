Meteor.mapHelpers = !Meteor.mapHelpers ? {} : Meteor.mapHelpers;

let markerMethods = {
  createSimpleMarker (lat, lng, map) {
    let coordinates = new google.maps.LatLng(lat, lng);
    return new google.maps.Marker({
      position: coordinates,
      map: map
    });
  },
  createBoundingMarkers (map) {
    // Add a marker to the map once it's ready
    var topLeftMarker     = this.createSimpleMarker(60.639197, 30.170803, map),
      topRightMarker      = this.createSimpleMarker(60.639197, 30.176519, map),
      bottomRightMarker   = this.createSimpleMarker(60.635766, 30.176519, map),
      bottomLeftMarker    = this.createSimpleMarker(60.635766, 30.170803, map);
  }
}

$.extend(Meteor.mapHelpers, markerMethods);
