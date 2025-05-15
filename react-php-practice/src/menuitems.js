import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './menuitems.css';

function MenuItems() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality
  };

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
    setShowNotificationDropdown(false);
  };

  const toggleNotificationDropdown = () => {
    setShowNotificationDropdown(!showNotificationDropdown);
    setShowProfileDropdown(false);
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo-container">
          <div className="logo">TK</div>
        </div>
        <div className="menu-title">MENU</div>
        <ul className="menu-items">
          <li onClick={() => navigate('/dashboard')}><i className="icon">📊</i> Dashboard</li>
          <li onClick={() => navigate('/tavern')}><i className="icon">🍺</i> Taverns</li>
          <li className="active"><i className="icon">📝</i> Menu Items</li>
          <li onClick={() => navigate('/inventory')}><i className="icon">📦</i> Inventory</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Top Navigation */}
        <div className="top-nav">
          <div className="search-container">
            <form onSubmit={handleSearch}>
              <input
                type="text"
                className="search-input"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="search-button">
                🔍
              </button>
            </form>
          </div>

          <div className="user-profile">
            {/* Notification Icon */}
            <div 
              className={`notification ${showNotificationDropdown ? 'active' : ''}`}
              onClick={toggleNotificationDropdown}
            >
              🔔
              <span className="notification-badge">3</span>
              {showNotificationDropdown && (
                <div className="notification-dropdown">
                  <ul>
                    <li>New order received</li>
                    <li>Customer feedback</li>
                    <li>System update</li>
                  </ul>
                </div>
              )}
            </div>

            {/* User Avatar */}
            <div 
              className={`avatar ${showProfileDropdown ? 'active' : ''}`}
              onClick={toggleProfileDropdown}
            >
              U
              {showProfileDropdown && (
                <div className="profile-dropdown">
                  <ul>
                    <li>Profile</li>
                    <li>Settings</li>
                    <li>Logout</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Add your menu items content here */}
      </div>
    </div>
  );
}

export default MenuItems;