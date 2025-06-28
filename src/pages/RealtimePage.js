import React, { useEffect, useState } from 'react';
import API from '../services/api';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const RealtimePage = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const res = await API.get('/tasks');
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
    socket.on('taskUpdated', fetchTasks);
    return () => socket.off('taskUpdated');
  }, []);

  return (
    <div className="container">
      <h2>Live Tasks</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tasks.map((task) => (
          <li key={task._id} className="task">
            <strong>{task.title}</strong><br />
            <span>{task.description}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RealtimePage;
