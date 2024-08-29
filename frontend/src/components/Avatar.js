// src/components/Avatar.js
import React, { useState } from 'react';

const predefinedAvatars = [
  '/avatars/avatar1.png',
  '/avatars/avatar2.png',
  '/avatars/avatar3.png',
  // Weitere Avatare hinzufügen
];

const Avatar = ({ avatarUrl, onAvatarChange }) => {
  const [showPredefined, setShowPredefined] = useState(true);
  const [customAvatar, setCustomAvatar] = useState('');

  const handleAvatarChange = (newAvatarUrl) => {
    onAvatarChange(newAvatarUrl);
  };

  const handleCustomAvatarUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setCustomAvatar(reader.result);
      onAvatarChange(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="avatar-container">
      <div className="avatar-selection">
        <button onClick={() => setShowPredefined(true)}>Predefined</button>
        <button onClick={() => setShowPredefined(false)}>Custom</button>
      </div>
      <div
        className={`avatar-display ${showPredefined ? 'show-predefined' : 'show-custom'}`}
      >
        {showPredefined ? (
          <div className="predefined-avatars">
            {predefinedAvatars.map((url, index) => (
              <button
                key={index}
                className={`avatar-button ${avatarUrl === url ? 'selected' : ''}`}
                onClick={() => handleAvatarChange(url)}
              >
                <img
                  src={url}
                  alt={`Avatar ${index + 1}`}
                  className={`avatar-image ${avatarUrl === url ? 'visible' : 'hidden'}`}
                />
              </button>
            ))}
          </div>
        ) : (
          <div className="custom-avatar-upload">
            <input
              type="file"
              accept="image/*"
              onChange={handleCustomAvatarUpload}
            />
            {customAvatar && (
              <img
                src={customAvatar}
                alt="Custom Avatar"
                className="avatar-image visible"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Avatar;
