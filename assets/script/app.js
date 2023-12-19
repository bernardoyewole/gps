'use strict';

import { onEvent, select, selectAll, create, print } from "./utils.js";

let lat;
let long;

mapboxgl.accessToken = 'pk.eyJ1IjoieXV2cnhqc3IiLCJhIjoiY2xxM3g4a3NhMDE0bzJrbnZ6dGp6cmQwYSJ9.ko0Ddi2P09rnxx5TYkiSpQ';

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [-97.143173, 49.895313],
    zoom: 16
});


function getLocation(position){    
    const {latitude, longitude} = position.coords;
    lat = latitude;
    long = longitude;
    center(latitude, longitude);
    mapConfig(longitude, latitude);
}
 
function center(latitude, longitude) {
    map.flyTo({
      center: [longitude, latitude],
      essential: true, // this animation is considered essential with respect to prefers-reduced-motion
      zoom: 16,
    });
}

function errorHandler(){
    console.log(error.message);
}
 
const options = {
    enableHighAccuracy: true,
    maximumAge: 0,
    timeout: 5000
};
 
let currentMarker = null;

function mapConfig(longitude, latitude) {

    map.addControl(
        new MapboxDirections({
        accessToken: mapboxgl.accessToken
        }),
        'top-left'
    );

    currentMarker ? currentMarker.remove() : '';

    const marker = new mapboxgl.Marker({color: '#ff7342'})
    .setLngLat([longitude, latitude])
    .addTo(map);

    currentMarker = marker;
}


onEvent('load', window, () => {
    if(navigator.geolocation) {
        navigator.geolocation.watchPosition(getLocation, errorHandler, options);
    }
});