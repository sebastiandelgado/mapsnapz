function initialize() {
  var hrLat = 37.783836;
  var hrLong = -122.408996;
  var myLatLng = new google.maps.LatLng(hrLat, hrLong);
  var mapOptions = {
    zoom: 15,
    center: myLatLng,
    mapTypeId: google.maps.MapTypeId.SATELLITE
  };

  var map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  var overlays = [];

  google.maps.event.addListener(map, 'dragend', function() {
    console.log(map.center);
    for (var i = 0; i < overlays.length; i++) {
      overlays[i].onRemove();
      overlays[i] = undefined;
    }
    overlays = [];
    getInstaPics(map.center.k,map.center.B,refreshPics);
  });


  //var pictureData = getPics(allPics);


  var refreshPics = function(pictureData) {
    for (var i = 0; i < pictureData.length; i++) {
      var imageLat = pictureData[i][1];
      var imageLong = pictureData[i][2];
      var longDisp = 0.002;
      var latDisp = longDisp * 0.8;
      var swBound = new google.maps.LatLng(imageLat,imageLong);
      var neBound = new google.maps.LatLng(imageLat + latDisp,imageLong + longDisp);
      var bounds = new google.maps.LatLngBounds(swBound, neBound);
      var srcImage = pictureData[i][0];

      var overlay = new IMGOverlay(bounds, srcImage, map);
      overlays.push(overlay);
    }

  }
  getInstaPics(hrLat,hrLong,refreshPics); 

}



google.maps.event.addDomListener(window, 'load', initialize);

