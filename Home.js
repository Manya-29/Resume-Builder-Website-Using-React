import React from 'react';
import '../styles/Home.css';

function Home({ user, onLogout }) {
  return (
    <header className="home-header">
      <h1>Resume Builder</h1>
      <div className="home-user">
        <span>Hello, {user.name}!</span>
        <button onClick={onLogout}>Logout</button>
      </div>
    </header>
  );
}

export default Home;
