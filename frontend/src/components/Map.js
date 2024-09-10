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
import { saveRoute } from '../services/authService'; // Importiere die API-Funktion

const defaultCenter = [51.1657, 10.4515]; // Zentrale Koordinaten für Deutschland
const defaultZoom = 6; // Zoom Level

// Hook zum Hinzufügen von Markierungen
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
    if (!routeName || markers.length === 0) {
      alert('Bitte geben Sie einen Routenname ein und fügen Sie Markierungen hinzu.');
      return;
    }

    setSaving(true);
    try {
      await saveRoute(token, routeName, markers);
      alert('Route erfolgreich gespeichert!');
      setMarkers([]); // Optionale: Markierungen zurücksetzen nach dem Speichern
    } catch (error) {
      alert('Fehler beim Speichern der Route: ' + error.message);
    } finally {
      setSaving(false);
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
