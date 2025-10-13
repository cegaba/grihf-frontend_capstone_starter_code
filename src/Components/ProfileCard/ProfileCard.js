import React from 'react';
import './ProfileCard.css';

const ProfileCard = () => {
  return (
    <div className="profile-card">
      <ul className="profile-options">
        <li>
          <a href="/profile">Your Profile</a>
        </li>
        {/* You can add more links like "Settings" or "Dashboard" here */}
      </ul>
    </div>
  );
};

export default ProfileCard;