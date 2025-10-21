import React, { useState } from 'react';

const BMICalculator = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState('');

  const calculateBMI = (e) => {
    e.preventDefault();
    if (height && weight) {
      const heightInMeters = height / 100;
      const bmiValue = weight / (heightInMeters * heightInMeters);
      setBmi(bmiValue.toFixed(1));
      
      if (bmiValue < 18.5) setCategory('Underweight');
      else if (bmiValue < 25) setCategory('Normal');
      else if (bmiValue < 30) setCategory('Overweight');
      else setCategory('Obese');
    }
  };

  const reset = () => {
    setHeight('');
    setWeight('');
    setBmi(null);
    setCategory('');
  };

  return (
    <div className="row">
      <div className="col-md-6 mx-auto">
        <h2 className="mb-4">BMI Calculator</h2>
        <form onSubmit={calculateBMI}>
          <div className="mb-3">
            <label className="form-label">Height (cm)</label>
            <input
              type="number"
              className="form-control"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Weight (kg)</label>
            <input
              type="number"
              className="form-control"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary me-2">Calculate</button>
          <button type="button" className="btn btn-secondary" onClick={reset}>Reset</button>
        </form>
        
        {bmi && (
          <div className="mt-4 p-3 bg-light rounded">
            <h4>Results:</h4>
            <p><strong>BMI:</strong> {bmi}</p>
            <p><strong>Category:</strong> <span className={`badge ${
              category === 'Normal' ? 'bg-success' : 
              category === 'Underweight' ? 'bg-warning' : 'bg-danger'
            }`}>{category}</span></p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BMICalculator;