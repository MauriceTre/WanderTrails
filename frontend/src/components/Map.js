import React, { useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMapEvents,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { saveRoute } from '../services/authService'; // Importiere die saveRoute API-Funktion

const defaultCenter = [51.1657, 10.4515];
const defaultZoom = 6;

function LocationMarker({ addMarker }) {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      addMarker(lat, lng);
    },
  });

  return null;
}

const Map = ({ token }) => {
  const [markers, setMarkers] = useState([]);
  const [routeName, setRouteName] = useState(''); // Route Name State

  const handleAddMarker = (lat, lng) => {
    setMarkers([...markers, [lat, lng]]);
  };

  // Funktion zum Speichern der Route
  const handleSaveRoute = async () => {
    if (!routeName) {
      alert('Bitte gib der Route einen Namen.');
      return;
    }

    try {
      await saveRoute(token, routeName, markers);
      alert('Route erfolgreich gespeichert!');
    } catch (error) {
      alert('Fehler beim Speichern der Route: ' + error.message);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={routeName}
        onChange={(e) => setRouteName(e.target.value)}
        placeholder="Route Name"
      />
      <button onClick={handleSaveRoute}>Route speichern</button>
      <MapContainer
        center={defaultCenter}
        zoom={defaultZoom}
        style={{ height: '500px', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <LocationMarker addMarker={handleAddMarker} />
        {markers.length > 0 && (
          <>
            {markers.map((position, index) => (
              <Marker key={index} position={position}>
                <Popup>
                  Punkt {index + 1}
                  <br />
                  Latitude: {position[0]}
                  <br />
                  Longitude: {position[1]}
                </Popup>
              </Marker>
            ))}
            <Polyline positions={markers} color="blue" />
          </>
        )}
      </MapContainer>
    </div>
  );
};

export default Map;
