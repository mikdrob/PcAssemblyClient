import React, { useEffect, useRef, useState } from 'react';



const Map = () => {
    const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
    mapboxgl.accessToken = 'pk.eyJ1IjoibWlraGFpbGRyb2J5c2hldiIsImEiOiJja3BsMmR2bmkwMWp3Mm9tZTgzN3IzaGN3In0.42CCm2jjwA5zxbGpoCyC0Q';

    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng] = useState(24.75);
    const [lat] = useState(59.43);
    const [zoom] = useState(11);

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom
        });
    });

    return (
        <div className="h-100 w-100 p-5 d-inline-block">
            <div ref={mapContainer} className="map-container"/>
        </div>
    );
}

export default Map;