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
import { saveRoute } from '../services/authService'; 

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
  const [routeName, setRouteName] = useState('');
  const [saving, setSaving] = useState(false);

  const handleAddMarker = (lat, lng) => {
    setMarkers([...markers, [lat, lng]]);
  };

  const handleSaveRoute = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Du bist nicht eingeloggt.');
        return;
      }
      if (!routeName || markers.length === 0) {
        alert('Bitte einen Routennamen angeben und Marker setzen.');
        return;
      }
  
      await saveRoute(token, routeName, markers); 
      alert('Route erfolgreich gespeichert!');
    } catch (error) {
      console.error('Fehler beim Speichern der Route:', error);
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
      <button onClick={handleSaveRoute} disabled={saving}>
        {saving ? 'Speichern...' : 'Route speichern'}
      </button>
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
