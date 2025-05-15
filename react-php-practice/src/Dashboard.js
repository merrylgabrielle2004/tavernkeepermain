// Dashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Search, Bell, LogOut } from 'lucide-react';
import bgImage from './assets/bg.png';
import logo from './assets/logo.png';

const Dashboard = ({ onLogout }) => {
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = React.useState(false);
  const [showNotifications, setShowNotifications] = React.useState(false);

  const handleProfileClick = () => setShowProfileMenu(!showProfileMenu);
  const handleNotificationClick = () => setShowNotifications(!showNotifications);

  const getUserData = () => {
    const userData = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user') || '{"username": "Reybold Eccesto"}');
    return userData.username;
  };

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  const navigateToTavern = () => navigate('/tavern');
  const navigateToInventory = () => navigate('/inventory');

  // Data Definitions
  const ratingData = [
    { label: 'Customer Service', percentage: 88, color: '#4CAF50' },
    { label: 'Staff Satisfaction', percentage: 92, color: '#2196F3' },
    { label: 'Repeat Visits Rate', percentage: 94, color: '#FF9800' }
  ];

  const lineChartData = [
    { month: 'Jan', sales: 4000, prevSales: 3000 },
    { month: 'Feb', sales: 3000, prevSales: 2800 },
    { month: 'Mar', sales: 5000, prevSales: 4200 },
    { month: 'Apr', sales: 2780, prevSales: 2400 },
    { month: 'May', sales: 1890, prevSales: 2100 },
    { month: 'Jun', sales: 2390, prevSales: 2000 }
  ];

  const orderData = {
    count: '2,568',
    percentage: '+15%',
    dateRange: 'June 20 - December 01, 2024'
  };

  return (
    <div className="flex h-screen bg-amber-50">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        
        <div className="menu-title">MENU</div>
        
        <ul className="menu-items">
          <li className="active">
            <span className="icon">📊</span>
            Dashboard
          </li>
          <li onClick={() => navigate('/tavern')}>
            <span className="icon">🍺</span>
            Taverns
          </li>
          <li onClick={() => navigate('/menu-items')}>
            <span className="icon">📝</span>
            Menu Items
          </li>
          <li onClick={() => navigate('/inventory')}>
            <span className="icon">📦</span>
            Inventory
          </li>
          <li onClick={handleLogout}>
            <span className="icon">
              <LogOut size={20} />
            </span>
            Logout
          </li>
        </ul>
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
            <span className="username">{getUserData()}</span>
            <div 
              className={`avatar ${showProfileMenu ? 'active' : ''}`} 
              onClick={handleProfileClick}
            >
              {getUserData().split(' ').map(n => n[0]).join('')}
            </div>
            <div 
              className="notification"
              onClick={handleNotificationClick}
            >
              <Bell />
              <span className="notification-badge">1</span>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="main-content">
          <h1>Dashboard</h1>

          {/* Rating Section */}
          <div className="rating-grid">
            {ratingData.map((rating, index) => (
              <div key={index} className="rating-item">
                <h3>{rating.label}</h3>
                <div className="circular-chart">
                  <svg viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#eee"
                      strokeWidth="3"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke={rating.color}
                      strokeWidth="3"
                      strokeDasharray={`${rating.percentage}, 100`}
                    />
                    <text 
                      x="18" 
                      y="20.35" 
                      textAnchor="middle" 
                      dominantBaseline="central"
                      className="percentage-text"
                      style={{ fontSize: '0.45em' }}
                    >
                      {rating.percentage}%
                    </text>
                  </svg>
                </div>
              </div>
            ))}
          </div>

          {/* Sales Trend Chart */}
          <div className="card sales-trend-card">
            <h2>Sales Trend</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={lineChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="sales" stroke="#4CAF50" />
                <Line type="monotone" dataKey="prevSales" stroke="#FFC107" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Orders Section */}
          <div className="card order-card">
            <h2>Orders</h2>
            <p>Total Orders: {orderData.count}</p>
            <p>Change: {orderData.percentage}</p>
            <p>{orderData.dateRange}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

<mcfile name="Dashboard.js" path="react-php-practice/src/Dashboard.js"></mcfile>
