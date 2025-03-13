// src/BrowseItems.js
import React, { useEffect, useState } from 'react';
import './BrowseItems.css';

const BrowseItems = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Fetch items from the backend
    const fetchItems = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/items');
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);

  // Group items by category
  const groupedItems = items.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <div>
      <h1>Browse Items</h1>
      {Object.keys(groupedItems).map((category) => (
        <div key={category} className="category-section">
          <h2>{category}</h2>
          <div className="item-list">
            {groupedItems[category].map((item) => (
              <div key={item._id} className="item">
                <h3>{item.name}</h3>
                <p>Price: ${item.price}</p>
                <div className="image-container">
                  {item.images.map((image, index) => (
                    <img
                      key={index}
                      src={`http://localhost:5001/${image}`}
                      alt={`Item ${index + 1}`}
                      className="item-image"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BrowseItems;