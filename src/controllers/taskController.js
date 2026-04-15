import { findAll } from '../repositories/taskRepo.js';
import * as taskService from '../services/taskService.js';

export async function getTasks(req, res, next) {
  const {
    completed,
    search = '',
    sortBy = 'id',
    order = 'asc',
    offset = 0,
    limit = 5,
  } = req.query;

  const options = {
    search,
    sortBy,
    completed,
    order,
    offset: parseInt(offset),
    limit: parseInt(limit),
  };
  let tasks = await findAll(options);
  res.status(200).json(tasks);
}

export async function createTask(req, res, next) {
  const { title, completed } = req.body;
  const task = await taskService.createTask({ title, completed });
  res.status(201).json(task);
}
