import React, { useEffect, useRef, useState } from 'react'
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
import markerData from './datas/markers.json'
import Popup from './Popup'

const MapView = () => {
    const [markers, setmarkers] = useState(markerData);
    const mapElement = useRef(null);
    const [activeData, setactiveData] = useState(null);
    useEffect(() => {
        
        const features = markers.map((item) => {
            const feature = new Feature({
                geometry: new Point(fromLonLat(item.coordinates)),
                name: item.name,

            });
            feature.setStyle(new Style({
                image: new Icon({
                color: "black",
                src: viteLogo,
                }),
            }));
            return feature;
        });
        
        
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
        features: features,
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

        map.on('click', function(evt){
            const feature = map.forEachFeatureAtPixel(evt.pixel, function(feature){
                return feature;
            });
            if(feature && typeof feature.getProperties === 'function'){
                console.log("kattintva");
                setactiveData({
                    name:feature.get('name'),

                })
            }
        })

        return() => {
            map.setTarget(null);
        };
 }, [markers]);

 return (
    <div>
        <div ref={mapElement} style={{width:"100%", height:"450px"}}/>
        <Popup data={activeData} onClose={() => setactiveData(null)}/>
    </div>
    );
}

export default MapView