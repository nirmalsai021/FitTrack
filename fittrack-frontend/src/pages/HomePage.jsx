import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="row">
      <div className="col-md-8 mx-auto text-center">
        <h1 className="display-4 mb-4">Welcome to FitTrack</h1>
        <p className="lead mb-4">Your personal fitness companion for tracking BMI and workout routines.</p>
        <div className="row">
          <div className="col-md-6 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">BMI Calculator</h5>
                <p className="card-text">Calculate your Body Mass Index and track your health.</p>
                <Link to="/bmi" className="btn btn-primary">Calculate BMI</Link>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Workout Tracker</h5>
                <p className="card-text">Manage and track your workout routines by muscle group.</p>
                <Link to="/workouts" className="btn btn-success">Track Workouts</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;