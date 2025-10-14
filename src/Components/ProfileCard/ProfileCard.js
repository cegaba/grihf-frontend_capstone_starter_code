import React from 'react';
import './ProfileCard.css';

const ProfileCard = () => {
  return (
    <div className="profile-card">
      <ul className="profile-options">
        <li>
          <a href="/profile">Your Profile</a>
        </li>        
        <li>
          <a href="/reports">Your Reports</a>
        </li>
      </ul>
    </div>
  );
};

export default ProfileCard;