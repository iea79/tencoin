// When the window has finished loading create our google map below
google.maps.event.addDomListener(window, 'load', init);

function init() {
    // Basic options for a simple Google Map
    // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
    var mapOptions = {
        // How zoomed in you want the map to start at (always required)
        zoom: 17.25,
        zoomControl: false,
        scrollwheel: false,
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false,

        // The latitude and longitude to center the map (always required)
        center: new google.maps.LatLng(35.901549, 14.494426), // New York

        // How you would like to style the map. 
        // This is where you would paste any style found on Snazzy Maps.
        // styles: [{"featureType":"all","elementType":"all","stylers":[{"visibility":"on"}]}]
    };

    // Get the HTML DOM element that will contain your map 
    // We are using a div with id="map" seen below in the <body>
    var mapElement = document.getElementById('map');

    // Create the Google Map using our element and options defined above
    var map = new google.maps.Map(mapElement, mapOptions);

    // Let's also add a marker while we're at it
    // var marker = new google.maps.Marker({
    //     position: new google.maps.LatLng(40.6700, -73.9400),
    //     map: map,
    //     title: 'Snazzy!'
    // });

    // Используется, если не нужны информационные окошки к объектам/маркерам
    var neighborhoods = [
        // Main
        {lat: 35.901549, lng: 14.494426, title: 'Tencoins Ltd ', icon: '../img/pin.svg'},
    ];

    var markers = [];

    function drop() {
        for (var i = 0; i < neighborhoods.length; i++) {
            addMarkerWithTimeout(neighborhoods[i], i * 1500);
        }
    }

    function addMarkerWithTimeout(marker, timeout) {
        window.setTimeout(function() {
            markers.push(new google.maps.Marker({
                position: new google.maps.LatLng(marker["lat"], marker["lng"]),
                map: map,
                title: marker["title"],
                icon: {
                    url: "i/" + marker["icon"]
                },
                animation: google.maps.Animation.DROP
            }));
        }, timeout);
    }

    drop();

    // Enable scroll zoom after click on map
    map.addListener('click', function() {
        map.setOptions({
            scrollwheel: true
        });
    });

    // Enable scroll zoom after drag the map
    map.addListener('drag', function() {
        map.setOptions({
            scrollwheel: true
        });
    });

    // Disable scroll zoom when mouse leave the map
    map.addListener('mouseout', function() {
        map.setOptions({
            scrollwheel: false
        });
    });

    /* Map center on resize
    =========================*/
    var getCen = map.getCenter();

    google.maps.event.addDomListener(window, 'resize', function() {
        map.setCenter(getCen);
    });
}