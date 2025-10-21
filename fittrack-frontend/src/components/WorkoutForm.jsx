import React, { useState, useEffect } from 'react';

const WorkoutForm = ({ onSubmit, editingWorkout, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    muscle_group: 'Arms',
    sets: '',
    reps: '',
    notes: ''
  });

  useEffect(() => {
    if (editingWorkout) {
      setFormData({
        name: editingWorkout.name,
        muscle_group: editingWorkout.muscle_group,
        sets: editingWorkout.sets,
        reps: editingWorkout.reps,
        notes: editingWorkout.notes || ''
      });
    } else {
      setFormData({
        name: '',
        muscle_group: 'Arms',
        sets: '',
        reps: '',
        notes: ''
      });
    }
  }, [editingWorkout]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    if (!editingWorkout) {
      setFormData({
        name: '',
        muscle_group: 'Arms',
        sets: '',
        reps: '',
        notes: ''
      });
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="card">
      <div className="card-header">
        <h5>{editingWorkout ? 'Edit Workout' : 'Add New Workout'}</h5>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Muscle Group</label>
            <select
              className="form-select"
              name="muscle_group"
              value={formData.muscle_group}
              onChange={handleChange}
            >
              <option value="Arms">Arms</option>
              <option value="Legs">Legs</option>
              <option value="Chest">Chest</option>
              <option value="Back">Back</option>
              <option value="Abs">Abs</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Sets</label>
            <input
              type="number"
              className="form-control"
              name="sets"
              value={formData.sets}
              onChange={handleChange}
              min="1"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Reps</label>
            <input
              type="number"
              className="form-control"
              name="reps"
              value={formData.reps}
              onChange={handleChange}
              min="1"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Notes (Optional)</label>
            <textarea
              className="form-control"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="3"
            />
          </div>
          <button type="submit" className="btn btn-primary me-2">
            {editingWorkout ? 'Update' : 'Add'} Workout
          </button>
          {editingWorkout && (
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default WorkoutForm;