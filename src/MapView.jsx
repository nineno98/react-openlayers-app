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
import Calendar from './Calendar'

const MapView = () => {
    const [markers, setmarkers] = useState(markerData);
    const mapElement = useRef(null);
    const [activeData, setactiveData] = useState(null);
    const [activeCalendar, setactiveCalendar] = useState(null);
    const [location, setlocation] = useState([21.6391, 47.5316]);
    const mapRef = useRef(null);
    const [date, setdate] = useState(new Date());

    const handleCloseCalendar = () => {
            setactiveCalendar(false);
            setlocation([19.0402, 47.4979]);
            console.log("handlecalendar")
        }
    useEffect(() => {

        const month = date.toLocaleString('default', { month: 'long' });
        const day = date.toLocaleString('default', {day: '2-digit'});
        console.log(month);
        
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
                center:fromLonLat(location),
                zoom: 9,
            }),
        });

        mapRef.current = map;

        
        markers.map((item) => {
            if(item.id <= 2){
                const markerDiv = document.createElement('div');
                markerDiv.className = 'marker';

                const icon = document.createElement('div');
                icon.className='marker-icon';
                icon.textContent=item.icon;
                icon.style.fontSize='40px';
                icon.style.color='black';

                markerDiv.appendChild(icon);

                markerDiv.addEventListener('click', (evt) => {
                    evt.stopPropagation();
                    
                    setactiveData({
                        name:item.name,
                        icon:item.icon,
                        image:item.image,
                        description:item.description

                    })
                })

                const overlay = new Overlay({
                    element: markerDiv,
                    positioning: 'center-center',
                    position: fromLonLat(item.coordinates),
                    stopEvent: false
                });

                map.addOverlay(overlay);
            }
            
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
        });

        function opencalendar(){
            setTimeout(() => {
                
                setactiveCalendar({
                    month:month,
                    day:day
                });
                
            }, 6000);
        }

        opencalendar();

        

        return() => {
            mapRef.current?.setTarget(null);
        };
 }, [markers]);

    useEffect(() => {
        if(!mapRef.current || !location) return;
        mapRef.current.getView().animate({
            center: fromLonLat(location),
            zoom: 9,
            duration: 1000,
        })
    }, [location]);

 return (
    <div>
        <div ref={mapElement} style={{width:"100%", height:"450px"}}/>
        <Popup data={activeData} onClose={() => setactiveData(null)}/>
        <Calendar data={activeCalendar} onClose={handleCloseCalendar}/>
    </div>
    );
}

export default MapView