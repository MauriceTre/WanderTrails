// src/components/Map.js
import React from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMapEvents,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import PropTypes from 'prop-types';
// Zentrale Koordinaten für Deutschland
const defaultCenter = [51.1657, 10.4515]; // Deutschland Koordinaten
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
Map.propTypes = {
  markers: PropTypes.arrayOf(
    PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
    })
  ).isRequired,
  onAddMarker: PropTypes.func.isRequired,
  addMarker: PropTypes.func.isRequired,
};
const Map = ({ markers, onAddMarker }) => {
  return (
    <MapContainer
      center={defaultCenter}
      zoom={defaultZoom}
      style={{ height: '500px', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <LocationMarker addMarker={onAddMarker} />
      {markers.length > 0 && (
        <>
          {markers.map((position, index) => (
            <Marker key={index} position={position}>
              <Popup>
                Punkt {index + 1}
                <br />
                {`Latitude: ${position[0]}`}
                <br />
                {`Longitude: ${position[1]}`}
              </Popup>
            </Marker>
          ))}
          <Polyline positions={markers} color="blue" />
        </>
      )}
    </MapContainer>
  );
};

export default Map;
