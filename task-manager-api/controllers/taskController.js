import Task from '../models/Task.js';

export const createTask = async (req, res) => {
  try {
    const task = new Task({ ...req.body, user: req.user.id });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getTasks = async (req, res) => {
  const { status, priority, page = 1, limit = 10 } = req.query;
  const filter = { user: req.user.id };
  if (status) filter.status = status;
  if (priority) filter.priority = priority;

  const tasks = await Task.find(filter)
    .skip((page - 1) * limit)
    .limit(parseInt(limit));
  res.json(tasks);
};
