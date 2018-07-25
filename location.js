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
        
            

        });
     
    }

    func.userMapInit = function()
    {
        $('#floating-panel').hide();
        var location = { lat: 11.5483925, lng: 104.93257779999999 };
        var map = new google.maps.Map(
            document.getElementById('map'), { zoom: 15, center: location });

            var marker = new google.maps.Marker({
                position: location,
                map: map,
                url: 'https://www.google.com/maps/place/11.5483925,104.93257779999999'
            });
            google.maps.event.addListener(marker, 'click', function () {
    
            DP.location.getCurrentPosition();
    
            });
    }

    func.getCurrentPosition = function () {

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(DP.location.geoSuccess, DP.location.geoError);
            // alert("Geolocation is supported by this browser.");
        } else {
            alert("Geolocation is not supported by this browser.");
        }

        
        
    }
   func.geoError = function () {
        alert("Geocoder failed.");
    }

    func.geoSuccess = function(position)
    {
        var marker = { lat: 11.5483925, lng: 104.93257779999999 };
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        myLatLng = {
            lat: latitude,
            lng: longitude
        };
        $('#floating-panel').show();
   
        var directionsService = new google.maps.DirectionsService;
            var directionsDisplay = new google.maps.DirectionsRenderer;
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 7,
            center: myLatLng
          });
          directionsDisplay.setMap(map);
          
          DP.location.calculateAndDisplayRoute(directionsService, directionsDisplay,myLatLng,marker);
          document.getElementById('mode').addEventListener('change', function() {
            DP.location.calculateAndDisplayRoute(directionsService, directionsDisplay,myLatLng,marker);
           });
  
          
      
    }

    func.calculateAndDisplayRoute = function(directionsService, directionsDisplay,myLatLng,marker) {
        var selectedMode = document.getElementById('mode').value;
            directionsService.route({
            origin: myLatLng,
            destination: marker,
          travelMode: google.maps.TravelMode[selectedMode]
        }, function(response, status) {
          if (status == 'OK') {
            
            directionsDisplay.setDirections(response);
            DP.location.getDuration(myLatLng,marker,selectedMode);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      }

      func.getDuration = function(myLatLng,marker,mode)
      {

        var service = new google.maps.DistanceMatrixService;
        service.getDistanceMatrix({
          origins: [myLatLng],
          destinations: [marker],
          travelMode: mode,
          unitSystem: google.maps.UnitSystem.METRIC,
          avoidHighways: false,
          avoidTolls: false
        },function(response,status){
            if (status !== 'OK') {
                alert('Error was: ' + status);
              } else {
                //   alert(response.rows[0].elements[0].duration.text);
                  $("p").text(response.rows[0].elements[0].duration.text)
                //   console.log(response.rows[0].elements[0].duration.text);
              }
        });
    }
    

})(jQuery);