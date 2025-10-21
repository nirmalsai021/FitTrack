import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WorkoutForm from '../components/WorkoutForm';
import WorkoutList from '../components/WorkoutList';
import FilterBar from '../components/FilterBar';

const API_URL = 'http://127.0.0.1:8000/api/workouts/';

const WorkoutTracker = () => {
  const [workouts, setWorkouts] = useState([]);
  const [filteredWorkouts, setFilteredWorkouts] = useState([]);
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState('All');
  const [editingWorkout, setEditingWorkout] = useState(null);
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });

  useEffect(() => {
    fetchWorkouts();
  }, []);

  useEffect(() => {
    if (selectedMuscleGroup === 'All') {
      setFilteredWorkouts(workouts);
    } else {
      setFilteredWorkouts(workouts.filter(w => w.muscle_group === selectedMuscleGroup));
    }
  }, [workouts, selectedMuscleGroup]);

  const fetchWorkouts = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(API_URL, {
        headers: { Authorization: `Token ${token}` }
      });
      setWorkouts(response.data);
    } catch (error) {
      showAlert('Error fetching workouts', 'danger');
    }
  };

  const showAlert = (message, type) => {
    setAlert({ show: true, message, type });
    setTimeout(() => setAlert({ show: false, message: '', type: '' }), 3000);
  };

  const handleSubmit = async (workoutData) => {
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Token ${token}` } };
      
      if (editingWorkout) {
        await axios.put(`${API_URL}${editingWorkout.id}/`, workoutData, config);
        showAlert('Workout updated successfully!', 'success');
      } else {
        await axios.post(API_URL, workoutData, config);
        showAlert('Workout added successfully!', 'success');
      }
      fetchWorkouts();
      setEditingWorkout(null);
    } catch (error) {
      showAlert('Error saving workout', 'danger');
    }
  };

  const handleEdit = (workout) => {
    setEditingWorkout(workout);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this workout?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`${API_URL}${id}/`, {
          headers: { Authorization: `Token ${token}` }
        });
        showAlert('Workout deleted successfully!', 'success');
        fetchWorkouts();
      } catch (error) {
        showAlert('Error deleting workout', 'danger');
      }
    }
  };

  return (
    <div>
      <h2 className="mb-4">Workout Tracker</h2>
      
      {alert.show && (
        <div className={`alert alert-${alert.type} alert-dismissible`}>
          {alert.message}
        </div>
      )}

      <div className="row">
        <div className="col-md-4">
          <WorkoutForm 
            onSubmit={handleSubmit}
            editingWorkout={editingWorkout}
            onCancel={() => setEditingWorkout(null)}
          />
        </div>
        <div className="col-md-8">
          <FilterBar 
            selectedMuscleGroup={selectedMuscleGroup}
            onFilterChange={setSelectedMuscleGroup}
          />
          <WorkoutList 
            workouts={filteredWorkouts}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default WorkoutTracker;