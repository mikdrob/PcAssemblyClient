import React, { useEffect, useRef, useState } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';


const Map = () => {
    const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
    mapboxgl.accessToken = 'pk.eyJ1IjoibWlraGFpbGRyb2J5c2hldiIsImEiOiJja3BsMmR2bmkwMWp3Mm9tZTgzN3IzaGN3In0.42CCm2jjwA5zxbGpoCyC0Q';
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng] = useState(24.75);
    const [lat] = useState(59.43);
    const [zoom] = useState(11);

    const [viewport, setViewport] = React.useState({
        longitude: -122.45,
        latitude: 37.78,
        zoom: 14
    });


    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom
        });
        let marker = new mapboxgl.Marker()
            .setLngLat([24.75, 59.43])
            .addTo(map.current);
        console.log(map.current + "dsfas");

    });


    return (
        <div className="h-100 w-100 p-5 d-inline-block">
            <div className="alert alert-primary" role="alert">
                Our Stores
            </div>
            <div ref={mapContainer} className="map-container" />
            <ReactMapGL mapboxApiAccessToken={mapboxgl.accessToken} >
                <Marker onDrag={()=>console.log("dragged")} latitude={59.43} longitude={24.75} offsetLeft={-20} offsetTop={-10}>
                    <div>You are here</div>
                </Marker>
            </ReactMapGL>
        </div>
    );
}

export default Map;