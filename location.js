var DP;
if (!DP) DP = {};
if (!DP.location) DP.location = {};

(function ($) {
    var func = DP.location;
    var latitude,
        longitude,
        placeId;
    var geocoder = new google.maps.Geocoder();

    func.initMap = function () {

        var location = { lat: 11.562108, lng: 104.888535 };
        var map = new google.maps.Map(
            document.getElementById('map'), { zoom: 15, center: location });

            var marker = new google.maps.Marker({
                position: location,
                map: map,
                draggable: true,
                animation: google.maps.Animation.DROP,
            });
            google.maps.event.addListener(marker, 'dragend', function () {
    
                currentPosition = marker.getPosition();
                latitude = currentPosition.lat();
                longitude = currentPosition.lng();
                DP.location.getCurrentPosition();
    
            });
    }

    func.autoCompleteSearch = function () {
        var input = document.getElementById('inputPlace');
        var options = {
            componentRestrictions: { country: 'kh' }
        };

        autocomplete = new google.maps.places.Autocomplete(input, options);
    }

    func.getGeoCoordinate = function () {
        
        var address = document.getElementById("inputPlace").value;
        geocoder.geocode({ 'address': address }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                lat = results[0].geometry.location.lat();
                lng = results[0].geometry.location.lng();
                console.log(lat + ":" + lng);
                DP.location.setMarkerOnMap(lat, lng)
            }

            else {
                alert("Geocode was not successful for the following reason: " + status);
            }
        });
    }

    func.setMarkerOnMap = function (lat, lng) {
        var currentLat;
        var currentLng;
        var currentPosition;
        var location = { lat: lat, lng: lng };
        // The map, centered at Uluru
        var map = new google.maps.Map(
            document.getElementById('map'), { zoom: 16, center: location });
        // The marker, positioned at Uluru
        var marker = new google.maps.Marker({
            position: location,
            map: map,
            draggable: true,
            animation: google.maps.Animation.DROP,
        });
        google.maps.event.addListener(marker, 'dragend', function () {

            currentPosition = marker.getPosition();
            latitude = currentPosition.lat();
            longitude = currentPosition.lng();
            DP.location.getCurrentPosition();
            DP.location.getPlaceId();
            

        });
     
    }

    func.getCurrentPosition = function () {

        console.log(latitude + ":" + longitude);
        
    }

    func.getPlaceId = function()
    {
        var latlng = {lat: parseFloat(latitude), lng: parseFloat(longitude)};

geocoder.geocode({'location': latlng}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      if (results[1]) {
        console.log(results[1].place_id);
      } else {
        window.alert('No results found');
      }
    } else {
      window.alert('Geocoder failed due to: ' + status);
    }
  });
    }

    func.userMapInit = function()
    {
        var location = { lat: 11.5483925, lng: 104.93257779999999 };
        var map = new google.maps.Map(
            document.getElementById('map'), { zoom: 15, center: location });

            var marker = new google.maps.Marker({
                position: location,
                map: map,
                url: 'https://www.google.com/maps/place/11.5483925,104.93257779999999'
            });
            google.maps.event.addListener(marker, 'click', function () {
    
                window.open(marker.url, '_blank');
    
            });
    }

})(jQuery);