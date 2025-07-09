import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Registration.css'; // Keep your CSS

export default function RegistrationPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const speakMessage = (message) => {
    const speech = new SpeechSynthesisUtterance(message);
    speechSynthesis.speak(speech);
  };

  useEffect(() => {
    speakMessage('Welcome to the registration page. Please fill in the credentials to register.');
  }, []);

  const handleRegister = (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      speakMessage('Please fill all fields.');
      alert('❌ Please fill all fields.');
      return;
    }

    // ✅ Check if a user already exists
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser && storedUser.username === username) {
      speakMessage('A user with this username already exists.');
      alert('❌ A user with this username already exists.');
      return;
    }

    const user = { username, email, password };
    localStorage.setItem('user', JSON.stringify(user));

    speakMessage('Registration successful.');
    alert('✅ Registration successful!');
    navigate('/login');
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onClick={() => speakMessage('Please type your username')}
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onClick={() => speakMessage('Please type your email')}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onClick={() => speakMessage('Please type your password')}
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
