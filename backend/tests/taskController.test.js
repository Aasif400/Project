const mongoose = require('mongoose');
const Task = require('../models/Task');
const { createTask } = require('../controllers/taskController');

describe('Task Controller', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  test('createTask should create a task', async () => {
    const req = { body: { title: 'Test Task', description: 'Test Description', status: 'To Do' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await createTask(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ title: 'Test Task', description: 'Test Description', status: 'To Do' }));
  });
});
