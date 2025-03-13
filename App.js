// src/App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { auth } from './firebase';
import FrontPage from './FrontPage';
import SignUp from './SignUp';
import BrowseItems from './BrowseItems';
import ListItems from './ListItems'; // Import the new component
import './App.css';

function App() {
  const location = useLocation(); // useLocation is now properly wrapped in Router
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className={location.pathname === '/' ? 'front-page' : location.pathname === '/signup' ? 'signup-page' : location.pathname === '/list' ? 'list-items-page' : 'browse-items-page'}>
      <Routes>
        <Route path="/" element={<FrontPage user={user} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/browse" element={<BrowseItems user={user} />} />
        <Route path="/list" element={<ListItems />} /> {/* Add the new route */}
      </Routes>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App /> {/* App is now properly wrapped in Router */}
    </Router>
  );
}