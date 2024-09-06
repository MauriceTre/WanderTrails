import React, { useState } from 'react';
import PropTypes from 'prop-types';

const predefinedAvatars = [
  '/avatars/avatar1.png',
  '/avatars/avatar2.png',
  '/avatars/avatar3.png',
  // Weitere Avatare hinzufügen
];

const Avatar = ({ avatarUrl, onAvatarChange }) => {
  const [showAvatarSelection, setShowAvatarSelection] = useState(false); // Auswahloptionen anzeigen oder verbergen

  const handleAvatarChange = (newAvatarUrl) => {
    onAvatarChange(newAvatarUrl);
    setShowAvatarSelection(false); // Verberge die Auswahloptionen nach Auswahl
  };

  const handleCustomAvatarUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      onAvatarChange(reader.result);
      setShowAvatarSelection(false); // Verberge die Auswahloptionen nach Upload
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="avatar-container">
      <div className="avatar-display">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt="Selected Avatar"
            className="avatar-image"
            onClick={() => setShowAvatarSelection(true)} // Ermöglicht, das Avatar durch Klick zu ändern
          />
        ) : (
          <button onClick={() => setShowAvatarSelection(true)}>
            Avatar auswählen
          </button>
        )}
      </div>

      {/* Zeige die Avatar-Auswahl nur, wenn der Benutzer sie aktiviert */}
      {showAvatarSelection && (
        <div className="avatar-selection">
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
                  className="avatar-image"
                />
              </button>
            ))}
          </div>
          <div className="custom-avatar-upload">
            <input
              type="file"
              accept="image/*"
              onChange={handleCustomAvatarUpload}
            />
          </div>
        </div>
      )}
    </div>
  );
};

Avatar.propTypes = {
  avatarUrl: PropTypes.string,
  onAvatarChange: PropTypes.func.isRequired,
};

export default Avatar;
