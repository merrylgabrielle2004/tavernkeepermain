import { useState } from "react";
import { Search, ChevronDown, Bell } from "lucide-react";
import "./Inventory.css";
import { useNavigate } from 'react-router-dom';

// Import sample images for inventory items
import aleImage from './assets/inventory/ale.png';
import whiskeyImage from './assets/inventory/whiskey.png';
import ciderImage from './assets/inventory/cider.png';
import soupImage from './assets/inventory/soup.png';
import berriesImage from './assets/inventory/berries.png';

const Inventory = ({ onLogout }) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("admin");
  const [selectedItem, setSelectedItem] = useState(null);
  const inventoryItems = [
  
    { 
      id: 1011, 
      name: "Ale", 
      image: aleImage, 
      type: "Drink", 
      price: 19.00, 
      available: "The Salty Sailor", 
      ingredients: "Grains, Yeast, Hops, and Water", 
      supplier: "Esmeralda",
      description: "A crisp, golden ale with a frothy head—our ale is brewed for those who appreciate rich flavor and smooth refreshment. Whether you're unwinding after a long day or celebrating with friends, every sip delivers the perfect balance of tradition and taste.",
      quantity: 3,
      required: 10
    },
    { 
      id: 1012, 
      name: "Whiskey", 
      image: whiskeyImage,
      type: "Drink",
      price: 25.00,
      available: "The Salty Sailor",
      ingredients: "Whiskey, Gin, Rum, Gold Tequila, Silver Tequila",
      supplier: "Nana",
      description: "Discover a rich selection of whiskeys, from smooth bourbons to bold Scotches. Whether you enjoy it neat, on the rocks, or in a crafted cocktail, every bottle tells a story of tradition and taste. Raise your glass and savor the moment.",
      quantity: 3,
      required: 10
    },
    { 
      id: 1013, 
      name: "Cider", 
      image: ciderImage,
      type: "Drink",
      price: 22.00,
      available: "The Mystic Tavern",
      ingredients: "Base, Cinnamon Sticks, Orange, Allspice liqueur, White sugar.",
      supplier: "Luna",
      description: "A refreshing blend of carefully selected apples, fermented to perfection. Our cider offers a perfect balance of sweetness and crisp apple flavor, making it an ideal choice for any occasion.",
      quantity: 3,
      required: 10
    },
    { 
      id: 1014, 
      name: "Healer's Chicken Soup", 
      image: soupImage,
      type: "Food",
      price: 32.00,
      available: "The Weary Wanderer",
      ingredients: "1 whole chicken, chicken broth,Garlic, Thyme, Bay Leaf, Carrot,Turnip,Yellow Onion,Parsnip,Rib Cellery,Kosher Salt, Ground Black Pepper,Dill, Parsley.",
      supplier: "Balmond",
      description: "A comforting bowl of homemade chicken soup, made with tender chicken, fresh vegetables, and aromatic herbs. This healing brew is perfect for restoring both health and spirit.",
      quantity: 3,
      required: 10
    },
    { 
      id: 1015, 
      name: "Wild Berries", 
      image: berriesImage,
      type: "Food",
      price: 15.00,
      available: "The Forest Grove",
      ingredients: "Assorted fresh berries",
      supplier: "Harith",
      description: "Freshly picked wild berries, bursting with natural sweetness and vibrant flavors. Perfect for snacking or adding to your favorite dishes.",
      quantity: 3,
      required: 10
    }
  ];

  const handleItemClick = (item) => {
    setSelectedItem(item === selectedItem ? null : item);
  };

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

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
          <span className="logout-icon">↩</span> Logout
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation */}
        <div className="top-nav">
          <div className="search-container">
            <input type="text" placeholder="Search" className="search-input" />
            <Search className="search-icon" />
          </div>
          <div className="user-profile">
            <span className="username">{userName}</span>
            <div className="avatar">{userName.split(' ').map(n => n[0]).join('')}</div>
            <div className="notification">
              <Bell />
              <span className="notification-badge">1</span>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="inventory-content">
          <h1>Inventory Items</h1>
          
          {/* Inventory Grid */}
          <div className="inventory-grid">
            {inventoryItems.map((item) => (
              <div 
                key={item.id}
                className={`inventory-item ${selectedItem?.id === item.id ? 'active' : ''}`}
                onClick={() => handleItemClick(item)}
              >
                <img src={item.image} alt={item.name} />
                <div className="item-info">
                  <h3>{item.name}</h3>
                  <p>{item.id}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Description Section */}
          {selectedItem && (
            <div className="description-section">
              <h2>Description</h2>
              <div className="description-content">
                <div className="description-image">
                  <img src={selectedItem.image} alt={selectedItem.name} />
                </div>
                <p>{selectedItem.description}</p>
              </div>
            </div>
          )}

          {/* Right Panel - Item Details */}
          <div className="inventory-details">
            <div className="usage-section">
              <h2>Inventory Usage</h2>
              <p className="subtitle">{selectedItem ? selectedItem.type.toUpperCase() : 'ITEMS'}</p>
              {selectedItem && (
                <>
                  <div className="usage-chart">
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
                          stroke="#966F33"
                          strokeWidth="3"
                          strokeDasharray={`${(selectedItem.quantity/selectedItem.required) * 100}, 100`}
                        />
                        <text x="18" y="18" textAnchor="middle" dominantBaseline="central" className="percentage">
                          {selectedItem.quantity}
                        </text>
                      </svg>
                      <div className="chart-label">
                        <span>Current Stock</span>
                        <span className="required">Required: {selectedItem.required}</span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {selectedItem && (
              <div className="details-section">
                <h2>Item Details</h2>
                <div className="detail-card">
                  <div className="detail-header">
                    <img src={selectedItem.image} alt={selectedItem.name} className="detail-image" />
                    <div className="detail-title">
                      <h3>{selectedItem.name}</h3>
                      <span className="item-id">ID: {selectedItem.id}</span>
                    </div>
                  </div>
                  
                  <div className="detail-grid">
                    <div className="detail-item">
                      <span className="detail-label">Type</span>
                      <span className="detail-value">{selectedItem.type}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Price</span>
                      <span className="detail-value price">${selectedItem.price.toFixed(2)}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Available At</span>
                      <span className="detail-value location">{selectedItem.available}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Supplier</span>
                      <span className="detail-value supplier">{selectedItem.supplier}</span>
                    </div>
                  </div>

                  <div className="ingredients-section">
                    <h4>Ingredients</h4>
                    <p>{selectedItem.ingredients}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventory;