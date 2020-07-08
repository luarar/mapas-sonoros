
//import React from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
import AudioPlayer from "../AudioPlayer"
import React, { useState } from 'react';


const icon = new Icon({
  iconUrl: "/volume-down-solid.svg",
  iconSize: [25, 25]
});

export default function CustomMap() {

	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [items, setItems] = useState([]);
	const [activeSound, setActiveSound] = React.useState(null);
	const sounds = items && !error ? items.slice(0, 100) : [];

	React.useEffect(() => {
    fetch('https://redpanal.org/api/audio/list/?user=Luarit')
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result.results);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
	}, [])
	
 

  
  return (
    <Map center={[
      -34.5920249, -58.4093395]} zoom={14}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />



      {sounds.map(sound => (

        (sound.position_lat !=null ? 
          (
            <Marker
            key={sound.id}
            position={[sound.position_lat, sound.position_long]}
            icon={icon}
            onClick={() => {
              setActiveSound(sound);
            }}
          />
            ) 
          : ('') 
        )
        
      )
      )}

      {activeSound && activeSound.position_lat!=null && (
        <Popup
          position={[
            activeSound.position_lat,
            activeSound.position_long
          ]}
          onClose={() => {
            setActiveSound(null);
          }}
        >
          <AudioPlayer audioUrl={activeSound.audio}
            name={activeSound.name}
            description={activeSound.description}
          />
        </Popup>
      )}
    </Map>
  );
}