import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import './Inventory.css';

const Inventory1 = ({ onLogout }) => {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState(null);  // Add this line

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };
  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  const menuItems = [
    {
      id: 1,
      name: "Goblin Gummy Worms",
      price: 21.00,
      image: "/images/goblin-gummy.png",
      description: "Goblin Gummy Worms are a tangy, chewy candy shaped like small, wriggly worms. Flavored with everything from strawberry to grape, they're a spooky and tasty treat for young and old alike.",
      available: "The Salty Sailor",
      ingredients: "Base, Gelatin, Corn Starch, Acidity Regulators, Flavor and Color.",
      stockRequired: 100,
      currentStock: 50
    }
  ];

  return (
    <div className="flex h-screen bg-amber-50">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo-container">
          <div className="logo">TK</div>
        </div>
        <div className="menu">
          <p className="menu-title">MENU</p>
          <ul className="menu-items">
            <li onClick={() => navigate('/dashboard')}><i className="icon">📊</i> Dashboard</li>
            <li onClick={() => navigate('/tavern')}><i className="icon">🍺</i> Taverns</li>
            <li onClick={() => navigate('/menu-items')}><i className="icon">📝</i> Menu Items</li>
            <li className="active"><i className="icon">📦</i> Inventory</li>
          </ul>
        </div>
        <div className="logout-button" onClick={handleLogout}>
          <span className="logout-icon"><LogOut size={20} /></span> Logout
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6">Menu Items</h1>
        
        <div className="grid grid-cols-2 gap-8">
          {/* Left side - Menu Items */}
          <div className="menu-items-grid">
            {menuItems.map((item) => (
              <div 
                key={item.id} 
                className={`menu-item-card ${selectedItem?.id === item.id ? 'selected' : ''}`}
                onClick={() => handleItemClick(item)}
              >
                <img src={item.image} alt={item.name} className="menu-item-image" />
                <div className="menu-item-info">
                  <h3>{item.name}</h3>
                  <p className="price">${item.price}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right side - Stock Information */}
          <div className="stock-info">
            <h2 className="text-xl font-bold mb-4">Stocks Available:</h2>
            <p className="text-gray-600 mb-2">Food</p>
            
            <div className="stock-chart">
              <div className="donut-chart">
                <svg viewBox="0 0 36 36" className="circular-chart">
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#eee"
                    strokeWidth="3"
                  />
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#4CAF50"
                    strokeWidth="3"
                    strokeDasharray={`${(50/100) * 100}, 100`}
                  />
                  <text x="18" y="18" textAnchor="middle" dominantBaseline="central" className="percentage">
                    50 Stocks
                  </text>
                </svg>
                <div className="stock-label">
                  <span>Goblin Gummy Worms</span>
                  <span className="quantity">Quantity Required: 100</span>
                </div>
              </div>
            </div>

            {/* Description Section */}
            <div className="description-section mt-8">
              <h2 className="text-xl font-bold mb-4">Description</h2>
              <div className="description-content">
                <img src="/images/goblin-gummy.png" alt="Goblin Gummy Worms" className="description-image" />
                <p className="description-text">{menuItems[0].description}</p>
              </div>

              {/* Details Section */}
              <div className="details-section mt-6">
                <h2 className="text-xl font-bold mb-4">Details:</h2>
                <p><strong>Price:</strong> ${menuItems[0].price}</p>
                <p><strong>Available:</strong> {menuItems[0].available}</p>
                <p><strong>Ingredients:</strong> {menuItems[0].ingredients}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventory1;