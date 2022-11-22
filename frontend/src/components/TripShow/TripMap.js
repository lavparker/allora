import React, { useEffect, useState, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import Geocode from "react-geocode";
import ActivitiesMap from '../Map/Map'
Geocode.setApiKey(process.env.REACT_APP_MAPS_API_KEY);

function TripMap ({city, activities}) {
    const history = useHistory();
    
    const [mapLoaded, setMapLoaded] = useState(false);
    const [highlightedActivity,setHighlightedActivity] = useState(null);
    const [bounds, setBounds] = useState(null);
    const [centerLat, setCenterLat] = useState(null);
    const [centerLng, setCenterLng] = useState(null);
    const [activityCoords, setActivityCoords] = useState([]);

    console.log(city, 'city')
    console.log(activities, 'act')

    const generateActivityCoords = (place, id) => {
        Geocode.fromAddress(place).then(
            (response) => {
                const {lat, lng } = response.results[0].geometry.location;
                let obj = { id: id, lat: lat, lng: lng, title: place }
                setActivityCoords(old => [...old, obj])
            },
            (error) => {
                console.error(error);
            }
        );
    };

    useEffect(() => {
        const generateCityLatLng = async (city) => {
                const res = await Geocode.fromAddress(city);
                const { lat, lng } = res.results[0].geometry.location;
                setCenterLat(lat);
                setCenterLng(lng);
                setMapLoaded(true);
            
        };
        generateCityLatLng();
    });




    useEffect(() => {
            activities.forEach((activity) => {
                generateActivityCoords(activity.title, activity._id);
            });  
    }, [activities]);

    

    //   useEffect(() => {
    //     if (activities && activityCoords.length > 0) {
    //       setMapLoaded(true);
    //     } else if (!activities) {
    //         setMapLoaded(true);
    //     }
    //   }, [activityCoords]);

    //   const mapEventHandlers  = useMemo(() => ({
    //       click: event => {
    //         const search = new URLSearchParams(event.latLng.toJSON()).toString();
    //         history.push({ pathname: '/trip/:tripID', search });
    //         },
    //         idle: map => setBounds(map.getBounds().toUrlValue())
    //   }), [history]);



    if (mapLoaded) return (
        <>
            <div className='act-map-container'>
                { centerLat&& <ActivitiesMap  
                centerLat={centerLat}
                centerLng={centerLng}
                activities={activityCoords}
                // mapEventHandlers={mapEventHandlers}
                markerEventHandlers={{
                    click: (activity) => history.push(`//${activity._id}`),
                    mouseover: (activity) => setHighlightedActivity(activity._id),
                    mouseout: () => setHighlightedActivity(null)
                }}
                highlightedActivity={highlightedActivity}
                />}
            </div>
        </>
    )
}

export default TripMap;