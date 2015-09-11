var userLocation = (function() {

    return {

        init: function() {
            this.getLocation();
        },

        getLocation: function() {
            var self = this;
            navigator.geolocation.getCurrentPosition(self.geocodeLocation, self.printError);
        },

        geocodeLocation: function(loc) {
            var self = userLocation;
            self.position = {
                lat: loc.coords.latitude,
                long: loc.coords.longitude
            }
            self.geocoder = new google.maps.Geocoder();

            var currentLocation = new google.maps.LatLng(self.position.lat, self.position.long);

            self.geocoder.geocode({
                'latLng': currentLocation
            }, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    self.address = results[2].formatted_address;
                    self.printLocation();
                }
            });
        },

        printLocation: function() {
            var self = userLocation;
            $('#results').append('Estimated location: ' + self.address );
        },

        printError: function() {
            $('#results').append('No location found');
        }
    };

}());

$(document).ready(function() {
    userLocation.init();
});