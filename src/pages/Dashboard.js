import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import API from '../services/api';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: '', description: '' });
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const res = await API.get('/tasks');
      setTasks(res.data);
    } catch (err) {
      toast.error("Failed to fetch tasks");
    }
  };

  const createTask = async () => {
    if (!form.title) {
      toast.warn("Title is required");
      return;
    }

    try {
      await API.post('/tasks', form);
      setForm({ title: '', description: '' });
      fetchTasks();
    } catch {
      toast.error("Failed to create task");
    }
  };

  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
    } catch {
      toast.error("Failed to delete task");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.info("Logged out");
    navigate('/login');
  };

  useEffect(() => {
    // Handle Google auth redirect
    const token = new URLSearchParams(window.location.search).get('token');
    if (token) {
      localStorage.setItem('token', token);
      window.history.replaceState(null, null, '/dashboard');
    }

    fetchTasks();
  }, []);

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Dashboard</h1>
        <button onClick={handleLogout} style={{ background: 'red', color: '#fff', padding: '6px 12px', border: 'none', borderRadius: '4px' }}>
          Logout
        </button>
      </div>

      <div style={{ margin: '1rem 0' }}>
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          style={{ marginRight: '8px', padding: '5px' }}
        />
        <input
          type="text"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          style={{ marginRight: '8px', padding: '5px' }}
        />
        <button onClick={createTask}>Add</button>
      </div>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tasks.map((task) => (
          <li key={task._id} className="task" style={{ marginBottom: '10px', borderBottom: '1px solid #ccc', paddingBottom: '5px' }}>
            <strong>{task.title}</strong><br />
            <span>{task.description}</span>
            <div style={{ float: 'right' }}>
              <button
                onClick={() => deleteTask(task._id)}
                style={{ background: 'red', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '4px' }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
