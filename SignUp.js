// src/SignUp.js
import React, { useState } from 'react';
import { auth } from './firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import './SignUp.css'; // Import the updated CSS

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('Account created successfully!');
      // Redirect or update UI as needed
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div> {/* Add this wrapper div for gradient background */}
      <div className="signup-container">
        <h2>Create an Account</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSignUp}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;