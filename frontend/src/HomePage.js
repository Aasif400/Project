import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import { Container, Typography, Select, MenuItem, FormControl, InputLabel, Paper, Box } from '@mui/material';

const HomePage = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('All');

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const filteredTasks = tasks.filter((task) => filter === 'All' || task.status === filter);

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Task Management
        </Typography>
        <TaskForm fetchTasks={fetchTasks} />
        <Box sx={{ mt: 3, mb: 2 }}>
          <FormControl fullWidth>
            <InputLabel>Filter by status</InputLabel>
            <Select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              label="Filter by status"
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="To Do">To Do</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Done">Done</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <TaskList tasks={filteredTasks} fetchTasks={fetchTasks} />
      </Paper>
    </Container>
  );
};

export default HomePage;
