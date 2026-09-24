import React, { useEffect, useRef } from 'react'
import Map from 'ol/Map.js'
import View from 'ol/View.js'
import TileLayer from 'ol/layer/Tile.js'
import OSM from "ol/source/OSM"
import 'ol/ol.css'
import { fromLonLat } from 'ol/proj'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import { Feature } from 'ol'
import { Point } from 'ol/geom'
import Style from 'ol/style/Style'
import Icon from 'ol/style/Icon'
import viteLogo from './assets/vite.svg'

const MapView = () => {
    const mapElement = useRef(null);
    useEffect(() => {
    
        const markerFeature = new Feature({
            geometry: new Point(fromLonLat([12.5, 41.9])),
        });


        markerFeature.setStyle(
        new Style({
            image: new Icon({
            color: "black",
            src: viteLogo,
            }),
        })
        );


        const markerSource = new VectorSource({
        features: [markerFeature],
        });
    
        const markerLayer = new VectorLayer({
            source:markerSource,
        })
        const baseMap = new TileLayer({
            source: new OSM(),
        });

        const map = new Map({
            target:mapElement.current,
            layers: [baseMap, markerLayer],
            view: new View({
                center:fromLonLat([21.6391, 47.5316]),
                zoom: 9,
            }),
        });
        return() => {
            map.setTarget(null);
        };
 }, []);

 return <div ref={mapElement} style={{width:"100%", height:"450px"}}/>;
}

export default MapView