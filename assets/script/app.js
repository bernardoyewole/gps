'use strict';

import { onEvent, select, selectAll, create, print } from "./utils.js";

function getLocation(position){    
    const {latitude, longitude} = position.coords;

    mapConfig(longitude, latitude);
}
 
function errorHandler(){
    mapConfig(-97.19267,49.81486);
}
 
const options = {
    enableHighAccuracy: true,
    maximumAge: 0
};
 
mapboxgl.accessToken = 'pk.eyJ1IjoieXV2cnhqc3IiLCJhIjoiY2xxM3g4a3NhMDE0bzJrbnZ6dGp6cmQwYSJ9.ko0Ddi2P09rnxx5TYkiSpQ';
 
function mapConfig(longitude, latitude){
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [longitude,latitude],
        zoom: 16
    });
 
    map.addControl(
        new MapboxDirections({
        accessToken: mapboxgl.accessToken
        }),
        'top-left'
    );
    
    const marker1 = new mapboxgl.Marker({color: '#ff7342'})
    .setLngLat([longitude, latitude])
    .addTo(map);
}


onEvent('load', window, () => {
    if(navigator.geolocation) {
        navigator.geolocation.watchPosition(getLocation, errorHandler, options);
    }
});