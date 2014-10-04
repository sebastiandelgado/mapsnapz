var getInstaPics = function(lat,long,cb) { //cb takes in the data 
  $.ajax({
    url: 'https://api.instagram.com/v1/media/search?lat=' + lat + '&lng=' + long + '&access_token=' + ACCESS_TOKEN,
    type: 'GET',
    dataType: 'jsonp',
    success: function(data){
      // console.log("Got some snaps yo" + JSON.stringify(data));
      var output = []
      for (var i = 0; i < data.data.length; i++) {
        var temp = [];
        temp.push(data.data[i].images.low_resolution.url);
        temp.push(data.data[i].location.latitude);
        temp.push(data.data[i].location.longitude);
        console.log(data.data[i]);
        // var temp = {}
        // temp.loc = data.data[i].location;
        // temp.url = data.data[i].images.standard_resolution.url
        // temp.user = data.data[i].caption
        output.push(temp)
      };
      cb(output);

      // var text = JSON.stringify(output);
      // var data = JSON.stringify(data.data[0].caption)
      // var $snap = ""
      // for (var i = 0; i < output.length; i++) {
      //   $snap += '<img src=' + output[i].url + ' height="640" width="640">'
      // };
      // $('#instaFeed').html($snap);

    },
    error: function(data){
      console.error('fetch failed, aww snap');
    }
  })
}

getInstaPics(37.7835478, -122.408953);
var insta = {
  init: function(lat, lon){
    this.lat = lat | 37.7835478;
    this.lon = lon | -122.408953;
    this.fullURL = 'https://api.instagram.com/v1/media/search?lat=' + 
                  this.lat + '&lng=' + this.lon + '&access_token=' + ACCESS_TOKEN;
    console.log(this.fullURL);

  },
  fetch: function(cb) { //cb takes in the data 
    $.ajax({
      url: 'https://api.instagram.com/v1/media/search?lat=' + this.lat + '&lng=' + this.lon + '&access_token=' + ACCESS_TOKEN,
      type: 'GET',
      dataType: 'jsonp',
      success: function(data){
        console.log("Got some snaps yo" + JSON.stringify(data));
        var output = []
        for (var i = 0; i < data.data.length; i++) {
          var temp = {}
          temp.loc = data.data[i].location;
          temp.url = data.data[i].images.standard_resolution.url
          // temp.user = data.data[i].caption
          output.push(temp)
        };
        var text = JSON.stringify(output);
        var data = JSON.stringify(data.data[0].caption)
        var $snap = ""
        for (var i = 0; i < output.length; i++) {
          $snap += '<img src=' + output[i].url + ' height="640" width="640">'
        };
        $('#instaFeed').html($snap);

      },
      error: function(data){
        console.error('fetch failed, aww snap');
      }
    })
  }
};



//insta.init()
//insta.fetch();