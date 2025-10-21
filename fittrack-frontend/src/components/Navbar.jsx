import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ user, onLogout }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">FitTrack</Link>
        <div className="navbar-nav me-auto">
          {user && (
            <>
              <Link className="nav-link" to="/">Home</Link>
              <Link className="nav-link" to="/bmi">BMI Calculator</Link>
              <Link className="nav-link" to="/workouts">Workouts</Link>
            </>
          )}
        </div>
        <div className="navbar-nav">
          {user ? (
            <>
              <span className="navbar-text me-3">Welcome, {user.username}!</span>
              <button className="btn btn-outline-light" onClick={onLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link className="nav-link" to="/login">Login</Link>
              <Link className="nav-link" to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;