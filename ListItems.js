import React, { useState } from 'react';
import './ListItems.css';

const ListItems = () => {
  // Declare state variables
  const [itemName, setItemName] = useState('');
  const [itemCategory, setItemCategory] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [images, setImages] = useState([]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!itemName || !itemCategory || !itemPrice || images.length === 0) {
      alert('Please fill out all fields and upload at least one image.');
      return;
    }

    // Create a FormData object to send the data
    const formData = new FormData();
    formData.append('name', itemName);
    formData.append('category', itemCategory);
    formData.append('price', itemPrice);
    images.forEach((image) => {
      formData.append('images', image);
    });

    try {
      // Log the form data
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      // Send data to the backend
      const response = await fetch('http://localhost:5001/api/items', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Item listed successfully!');
        // Reset the form
        setItemName('');
        setItemCategory('');
        setItemPrice('');
        setImages([]);
      } else {
        const errorData = await response.json(); // Log the error response
        console.error('Error response:', errorData);
        alert('Failed to list the item.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while listing the item.');
    }
  };

  return (
    <div className="list-items-page">
      <h1>List an Item</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Item Name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Item Category"
          value={itemCategory}
          onChange={(e) => setItemCategory(e.target.value)}
        />
        <input
          type="number"
          placeholder="Item Price"
          value={itemPrice}
          onChange={(e) => setItemPrice(e.target.value)}
        />
        <input
          type="file"
          multiple
          onChange={(e) => setImages([...e.target.files])}
        />
        <button type="submit">List Item</button>
      </form>
    </div>
  );
};

export default ListItems;