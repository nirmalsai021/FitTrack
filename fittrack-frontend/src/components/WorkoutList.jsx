import React from 'react';

const WorkoutList = ({ workouts, onEdit, onDelete }) => {
  if (workouts.length === 0) {
    return (
      <div className="text-center py-4">
        <p className="text-muted">No workouts found. Add your first workout!</p>
      </div>
    );
  }

  return (
    <div className="row">
      {workouts.map(workout => (
        <div key={workout.id} className="col-md-6 mb-3">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <h5 className="card-title">{workout.name}</h5>
                  <span className="badge bg-secondary mb-2">{workout.muscle_group}</span>
                  <p className="card-text mb-1">
                    <strong>Sets:</strong> {workout.sets} | <strong>Reps:</strong> {workout.reps}
                  </p>
                  {workout.notes && (
                    <p className="card-text text-muted small">{workout.notes}</p>
                  )}
                </div>
                <div className="btn-group-vertical">
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => onEdit(workout)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => onDelete(workout.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WorkoutList;