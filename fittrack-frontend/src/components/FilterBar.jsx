import React from 'react';

const FilterBar = ({ selectedMuscleGroup, onFilterChange }) => {
  const muscleGroups = ['All', 'Arms', 'Legs', 'Chest', 'Back', 'Abs'];

  return (
    <div className="mb-3">
      <h6>Filter by Muscle Group:</h6>
      <div className="btn-group" role="group">
        {muscleGroups.map(group => (
          <button
            key={group}
            type="button"
            className={`btn ${selectedMuscleGroup === group ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => onFilterChange(group)}
          >
            {group}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;