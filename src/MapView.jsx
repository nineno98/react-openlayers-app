import React, { useEffect, useRef, useState } from 'react'
import Map from 'ol/Map.js'
import View from 'ol/View.js'
import TileLayer from 'ol/layer/Tile.js'
import OSM from "ol/source/OSM"
import 'ol/ol.css'
import { fromLonLat } from 'ol/proj'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import { Feature, Overlay } from 'ol'
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
            layers: [baseMap],
            view: new View({
                center:fromLonLat([21.6391, 47.5316]),
                zoom: 9,
            }),
        });


        
        markers.map((item) => {
            const markerDiv = document.createElement('div');
            markerDiv.className = 'marker';

            const icon = document.createElement('div');
            icon.className='marker-icon';
            icon.textContent=item.icon;
            icon.style.fontSize='24px';
            icon.style.color='black';

            markerDiv.appendChild(icon);

            markerDiv.addEventListener('click', (evt) => {
                evt.stopPropagation();
                
                setactiveData({
                    name:item.name,
                    icon:item.icon

                })
            })

            const overlay = new Overlay({
                element: markerDiv,
                positioning: 'center-center',
                position: fromLonLat(item.coordinates),
                stopEvent: false
            });

            map.addOverlay(overlay);
        });

        //****************************** */

        map.on('click', function(evt){
            const feature = map.forEachFeatureAtPixel(evt.pixel, function(feature){
                return feature;
            });
            if(feature && typeof feature.getProperties === 'function'){
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