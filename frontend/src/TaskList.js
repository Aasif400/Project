import React from 'react';
import axios from 'axios';
import { Box, Paper, Typography, Select, MenuItem, Button, Grid } from '@mui/material';
import { styled } from '@mui/system';

const TaskContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const TaskActions = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

const TaskList = ({ tasks, fetchTasks }) => {
  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/tasks/${id}`, { status: newStatus });
      fetchTasks();
    } catch (error) {
      console.error('Error updating task status', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task', error);
    }
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={8} md={6}>
        <Box mt={4}>
          {tasks.map((task) => (
            <TaskContainer key={task._id} elevation={3}>
              <Typography variant="h6">{task.title}</Typography>
              <Typography variant="body1" color="textSecondary">
                {task.description}
              </Typography>
              <TaskActions>
                <Select
                  value={task.status}
                  onChange={(e) => handleStatusChange(task._id, e.target.value)}
                  variant="outlined"
                >
                  <MenuItem value="To Do">To Do</MenuItem>
                  <MenuItem value="In Progress">In Progress</MenuItem>
                  <MenuItem value="Done">Done</MenuItem>
                </Select>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleDelete(task._id)}
                >
                  Delete
                </Button>
              </TaskActions>
            </TaskContainer>
          ))}
        </Box>
      </Grid>
    </Grid>
  );
};

export default TaskList;
