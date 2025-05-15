import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, LogOut } from 'lucide-react';
import { LineChart, XAxis, YAxis, Tooltip, Line, ResponsiveContainer } from 'recharts';
import './Tavern.css';

// Import tavern images
import saltySailor from './assets/taverns/salty-sailor.png';
import wearyWanderer from './assets/taverns/weary-wanderer.png';
import bustedBottle from './assets/taverns/busted-bottle.png';
import mysticTavern from './assets/taverns/mystic-tavern.png';
import goldenSerpent from './assets/taverns/golden-serpent.png';

// Import map images
import saltySailorMap from './assets/maps/mapsSaltySailor.png';
import wearyWandererMap from './assets/maps/mapsWearyWanderer.png';
import bustedBottleMap from './assets/maps/mapsBustedBottle.png';
import mysticTavernMap from './assets/maps/mapsMysticTavern.png';
import goldenSerpentMap from './assets/maps/mapsGoldenSerpent.png';

// Define taverns data
const tavernsData = [
  {
    id: 1,
    name: "The Salty Sailor",
    revenue: "4,250",
    image: saltySailor,
    mapImage: saltySailorMap,
    progress: 75,
    level: 3,
    title: "Popular Establishment"
  },
  {
    id: 2,
    name: "The Weary Wanderer",
    revenue: "3,800",
    image: wearyWanderer,
    mapImage: wearyWandererMap,
    progress: 62,
    level: 2,
    title: "Known Establishment"
  },
  {
    id: 3,
    name: "The Busted Bottle",
    revenue: "2,950",
    image: bustedBottle,
    mapImage: bustedBottleMap,
    progress: 45,
    level: 1,
    title: "New Establishment"
  },
  {
    id: 4,
    name: "The Mystic Tavern",
    revenue: "5,100",
    image: mysticTavern,
    mapImage: mysticTavernMap,
    progress: 88,
    level: 4,
    title: "Renowned Establishment"
  },
  {
    id: 5,
    name: "The Golden Serpent",
    revenue: "4,550",
    image: goldenSerpent,
    mapImage: goldenSerpentMap,
    progress: 70,
    level: 3,
    title: "Popular Establishment"
  }
];

// Order data that changes based on selected tavern
const getOrderData = (tavernId) => {
  switch(tavernId) {
    case 1: // Salty Sailor
      return [
        { day: "15", currentValue: 750, previousValue: 700 },
        { day: "16", currentValue: 850, previousValue: 820 },
        { day: "17", currentValue: 780, previousValue: 850 },
        { day: "18", currentValue: 900, previousValue: 820 },
        { day: "19", currentValue: 800, previousValue: 780 },
        { day: "20", currentValue: 950, previousValue: 800 }
      ];
    case 2: // Weary Wanderer
      return [
        { day: "17", currentValue: 700, previousValue: 650 },
        { day: "18", currentValue: 850, previousValue: 700 },
        { day: "19", currentValue: 800, previousValue: 750 },
        { day: "20", currentValue: 750, previousValue: 800 },
        { day: "21", currentValue: 700, previousValue: 750 },
        { day: "22", currentValue: 900, previousValue: 700 }
      ];
    case 3: // Busted Bottle
      return [
        { day: "19", currentValue: 700, previousValue: 650 },
        { day: "20", currentValue: 750, previousValue: 680 },
        { day: "21", currentValue: 800, previousValue: 700 },
        { day: "22", currentValue: 850, previousValue: 720 },
        { day: "23", currentValue: 750, previousValue: 680 },
        { day: "24", currentValue: 900, previousValue: 750 }
      ];
    case 4: // Mystic Tavern
      return [
        { day: "02", currentValue: 700, previousValue: 650 },
        { day: "03", currentValue: 850, previousValue: 700 },
        { day: "04", currentValue: 800, previousValue: 750 },
        { day: "05", currentValue: 750, previousValue: 800 },
        { day: "06", currentValue: 700, previousValue: 750 },
        { day: "07", currentValue: 900, previousValue: 700 }
      ];
    case 5: // Golden Serpent
      return [
        { day: "18", currentValue: 750, previousValue: 700 },
        { day: "19", currentValue: 800, previousValue: 750 },
        { day: "20", currentValue: 780, previousValue: 760 },
        { day: "21", currentValue: 790, previousValue: 770 },
        { day: "22", currentValue: 750, previousValue: 780 },
        { day: "23", currentValue: 900, previousValue: 750 }
      ];
    default:
      return [];
  }
};

const Tavern = ({ onLogout }) => {
  const navigate = useNavigate();
  const [selectedTavern, setSelectedTavern] = useState(1); // Default to first tavern
  const orderData = getOrderData(selectedTavern);

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
            <li className="active"><i className="icon">🍺</i> Taverns</li>
            <li onClick={() => navigate('/menu-items')}><i className="icon">📝</i> Menu Items</li>
            <li onClick={() => navigate('/inventory')}><i className="icon">📦</i> Inventory</li>
          </ul>
        </div>
        <div className="logout-button" onClick={handleLogout}>
          <span className="logout-icon"><LogOut size={20} /></span> Logout
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Main Content Area */}
        <div className="main-content">
          {/* Main Dashboard Content */}
          <div className="flex-1">
            {/* Left Panel with Taverns */}
            <div className="flex-1 p-4 overflow-y-auto">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Taverns</h2>
                <div className="grid grid-cols-3 gap-4">
                  {tavernsData.map((tavern) => (
                    <div 
                      key={tavern.id} 
                      className={`tavern-card ${tavern.id === selectedTavern ? "active" : ""}`}
                      onClick={() => setSelectedTavern(tavern.id)}
                    >
                      <img src={tavern.image} alt={tavern.name} className="tavern-image" />
                      <div className="tavern-info">
                        <div className="tavern-name">{tavern.name}</div>
                        <div className="tavern-revenue">${tavern.revenue}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
              
              <div className="flex gap-6">
                {/* Location section with map */}
                <section className="w-96">
                  <h2 className="text-2xl font-semibold mb-4">Location</h2>
                  <div className="flex justify-center">
                    <div className="relative bg-gray-100 rounded-md overflow-hidden">
                      {selectedTavern && (
                        <img
                          src={tavernsData.find(t => t.id === selectedTavern).mapImage}
                          alt="Tavern Location"
                          style={{ width: '350px', height: '262px' }}
                          className="object-contain"
                        />
                      )}
                    </div>
                  </div>
                </section>

                {/* Reputation Level section */}
                <section className="flex flex-col items-center">
                  <h2 className="text-2xl font-semibold mb-4">Reputation Level</h2>
                  <div className="text-xs text-gray-500 mb-4">Default</div>
                  
                  <div className="flex flex-col items-center gap-4">
                    {/* Progress Circle */}
                    <div className="relative">
                      <div className="h-36 w-36 rounded-full border-8 border-purple-200 flex items-center justify-center relative">
                        <svg className="absolute inset-0 transform -rotate-90 w-36 h-36">
                          <circle
                            cx="72"
                            cy="72"
                            r="64"
                            className="stroke-purple-600"
                            fill="none"
                            strokeWidth="8"
                            strokeLinecap="round"
                            strokeDasharray={`${selectedTavern && (tavernsData.find(t => t.id === selectedTavern).progress * 4.02)} 402`}
                          />
                        </svg>
                        <div className="text-center z-10">
                          <div className="text-4xl font-bold">{selectedTavern && tavernsData.find(t => t.id === selectedTavern).progress}%</div>
                          <div className="text-xs text-purple-600">Progress</div>
                        </div>
                      </div>
                    </div>

                    {/* Level info box */}
                    <div className="bg-indigo-800 text-white p-2 rounded w-full text-center">
                      <div className="text-lg font-bold">Level {selectedTavern && tavernsData.find(t => t.id === selectedTavern).level}</div>
                      <div className="text-xs text-blue-300">{selectedTavern && tavernsData.find(t => t.id === selectedTavern).title}</div>
                    </div>
                  </div>
                </section>
              </div>

              <section>
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-2xl font-semibold">Orders</h2>
                  <button className="text-blue-600 text-sm">View Report</button>
                </div>
                
                <div className="mb-4">
                  <div className="text-lg font-semibold">Total Price</div>
                  <div className="flex items-center text-xs text-green-600">
                    <span>▲ 2.1% vs last week</span>
                  </div>
                  <div className="text-xs text-gray-500">Orders from 20 June, 2024</div>
                </div>
                
                <div className="h-40">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={orderData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                      <XAxis dataKey="day" tickLine={false} axisLine={false} />
                      <YAxis hide={true} />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="currentValue" 
                        stroke="#3b82f6" 
                        strokeWidth={2} 
                        dot={{ r: 3 }}
                        activeDot={{ r: 5 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="previousValue" 
                        stroke="#e5e7eb" 
                        strokeWidth={2} 
                        dot={{ r: 3 }}
                        activeDot={{ r: 5 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="flex justify-center space-x-6 text-xs">
                  <div className="flex items-center">
                    <span className="h-2 w-2 bg-blue-500 rounded-full mr-1"></span>
                    <span>Current Total Price</span>
                  </div>
                  <div className="flex items-center">
                    <span className="h-2 w-2 bg-gray-300 rounded-full mr-1"></span>
                    <span>Last Week Total Price</span>
                  </div>
                </div>
              </section>  
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tavern;