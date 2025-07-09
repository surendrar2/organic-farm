import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // ✅ specific CSS for login

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const speakMessage = (message) => {
    const speech = new SpeechSynthesisUtterance(message);
    speechSynthesis.speak(speech);
  };

  useEffect(() => {
    speakMessage('Welcome to the login page. Please enter your credentials to login.');
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser && username === storedUser.username && password === storedUser.password) {
      speakMessage('Login successful!');
      alert('✅ Login successful!');
      navigate('/home');
    } else {
      speakMessage('Invalid credentials. Please try again.');
      alert('❌ Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onClick={() => speakMessage('Please enter your username')}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onClick={() => speakMessage('Please enter your password')}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p className="link-text" onClick={() => navigate('/register')}>
        Don&apos;t have an account? Register here.
      </p>
    </div>
  );
}
