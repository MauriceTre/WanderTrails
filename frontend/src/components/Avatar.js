import React, { useState } from 'react';
import PropTypes from 'prop-types';

const predefinedAvatars = [
  '/avatars/avatar1.png',
  '/avatars/avatar2.png',
  '/avatars/avatar3.png',
];

const Avatar = ({ avatarUrl, onAvatarChange }) => {
  const [showAvatarSelection, setShowAvatarSelection] = useState(false); 

  const handleAvatarChange = (newAvatarUrl) => {
    onAvatarChange(newAvatarUrl);
    setShowAvatarSelection(false); 
  };

  const handleCustomAvatarUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      onAvatarChange(reader.result);
      setShowAvatarSelection(false); 
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
            onClick={() => setShowAvatarSelection(true)} 
          />
        ) : (
          <button onClick={() => setShowAvatarSelection(true)}>
            Avatar auswählen
          </button>
        )}
      </div>
      {}
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
