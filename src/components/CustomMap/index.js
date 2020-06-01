import React from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
import useSwr from "swr";
import AudioPlayer from "../AudioPlayer"

const fetcher = (...args) => fetch(...args).then(response => response.json());

const icon = new Icon({
  iconUrl: "/volume-down-solid.svg",
  iconSize: [25, 25]
});

export default function CustomMap() {
  const url =
    "https://data.police.uk/api/crimes-street/all-crime?lat=52.629729&lng=-1.131592&date=2019-10";
  const { data, error } = useSwr(url, fetcher);
  //const sounds = data && !error ? data.slice(0, 100) : [];
  var sounds = [
    {
      "id": 2142,
      "slug": "tanto-amor-cover",
      "name": "Tanto Amor (Cover)",
      "audio": "https://redpanal.org/media/uploads/audios/2020_05/tanto_amor_r1_sesion.ogg",
      "created_at": "2020-05-26T03:39:45.129744Z",
      "license": "CC-BY-SA-4.0",
      "description": "El Cuaterno de Lost",
      "totalframes": 8029632,
      "samplerate": 48000,
      "use_type": "song",
      "genre": "rock",
      "instrument": "multiple",
      "tags": [],
      "position_lat": "-34.5940562",
      "position_long": "-58.4120968"
    },
    {
      "id": 2141,
      "slug": "creep-cover",
      "name": "Creep (Cover)",
      "audio": "https://redpanal.org/media/uploads/audios/2020_05/creep_r1_sesion.ogg",
      "created_at": "2020-05-23T22:55:11.473385Z",
      "license": "CC-BY-SA-4.0",
      "description": "El Cuaterno de Lost",
      "totalframes": 11792448,
      "samplerate": 48000,
      "use_type": "song",
      "genre": "rock",
      "instrument": "multiple",
      "tags": [],
      "position_lat": "-34.5898243",
      "position_long": "-58.4103283"
    },
    {
      "id": 2140,
      "slug": "fade-into-you-cover",
      "name": "Fade Into You (Cover)",
      "audio": "https://redpanal.org/media/uploads/audios/2020_05/fade_into_you_r1_sesion.ogg",
      "created_at": "2020-05-23T22:50:36.751504Z",
      "license": "CC-BY-SA-4.0",
      "description": "El cuaterno de lost",
      "totalframes": 14664000,
      "samplerate": 48000,
      "use_type": "song",
      "genre": "rock",
      "instrument": "multiple",
      "tags": [],
      "position_lat": "34.5936936",
      "position_long": "-58.4130111"
    }
  ]
  const [activeSound, setActiveSound] = React.useState(null);

  return (
    <Map center={[
      -34.5920249, -58.4093395]} zoom={14}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />

      {sounds.map(sound => (
        <Marker
          key={sound.id}
          position={[sound.position_lat, sound.position_long]}
          icon={icon}
          onClick={() => {
            setActiveSound(sound);
          }}
        />
      ))}

      {activeSound && (
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