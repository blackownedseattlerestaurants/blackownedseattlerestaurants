function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: new google.maps.LatLng(47.608013, -122.3321),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
  })

  var infoWindow = new google.maps.InfoWindow({})

  for (var data of jsondata) {
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(data.lat, data.long),
      map: map,
    })

    google.maps.event.addListener(
      marker,
      'click',
      (function (marker) {
        var directions = 'https://www.google.com/maps/dir/?api=1&destination='+data.lat+','+data.long;
        var contentString = '<strong>' + data.restaurant + '</strong><br><a target="_blank" rel="noopener noreferrer" href="' + directions + '">'+ data.address + '</a><br>'+data.contact+'<br>Offerings: '+data.service+'<br><a target="_blank" rel="noopener noreferrer" href="' + data.website + '">' + data.website.toString() + '</a>'
        return function () {
          infoWindow.setContent(contentString)
          infoWindow.open(map, marker)
        }
      })(marker)
    )
  }
}