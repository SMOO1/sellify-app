// src/FrontPage.js and BrowseItems.js
import { Link } from 'react-router-dom'; 
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './FrontPage.css';

const FrontPage = ({ user }) => {
  const navigate = useNavigate(); // Use useNavigate for navigation

  const handleListClick = () => {
    if (!user) {
      alert('Please log in or sign up to list an item.');
    } else {
      navigate('/list'); // Redirect to the listing page
    }
  };

  return (
    <div>
      <header className="main-header">
        <h1>Welcome to Sellify</h1>
        <p>Your one-stop destination to buy and sell products.</p>
      </header>
      <div className="button-container">
        <button className="action-button" onClick={handleListClick}>
          List Item
        </button>
        <Link to="/browse" className="action-button">
          Browse Items
        </Link>
        <Link to="/signup" className="action-button">
          Create Account
        </Link>
      </div>
    </div>
  );
};

export default FrontPage;