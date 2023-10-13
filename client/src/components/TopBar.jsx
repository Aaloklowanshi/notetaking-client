import React from 'react';
import '../styles/topbar.css';

export const TopBar = () => {
  return (
    <div className="top-bar">
      <div className="profile">
        <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="Profile" />
      </div>
      <div className="search-box">
        <input type="text" placeholder="Search notes" />
      </div>
      <div className="filter">
        <label>Sort by :</label>
        <select>
          <option value="recent">Most Recent</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>
    </div>
  );
};