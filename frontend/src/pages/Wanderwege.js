// src/pages/WanderwegePage.js
import React, { useState } from 'react';
import Map from '../components/Map';
import '../styles/WanderwegePage.css';

const WanderwegePage = () => {
  const [markers, setMarkers] = useState([]);

  const addMarker = (lat, lng) => {
    setMarkers([...markers, [lat, lng]]);
  };

  return (
    <div className="wanderwege-page">
      <h1>Wanderwege</h1>
      <Map markers={markers} onAddMarker={addMarker} />
      <div className="marker-list">
        <h2>Wanderwege Liste</h2>
        <ul>
          {markers.map((position, index) => (
            <li key={index}>
              Wanderweg {index + 1}: Latitude {position[0]}, Longitude{' '}
              {position[1]}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WanderwegePage;
