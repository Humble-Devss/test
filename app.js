

import express from 'express';
import cors from 'cors';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const TASKS_FILE = join(process.cwd(), 'tasks.json');


// Helper to read tasks from file
function readTasks() {
  if (!existsSync(TASKS_FILE)) {
    writeFileSync(TASKS_FILE, '[]', 'utf-8');
    return [];
  }
  try {
    const data = readFileSync(TASKS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
}

// Helper to write tasks to file
function writeTasks(tasks) {
  writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2), 'utf-8');
}

const app = express();
app.use(cors());
app.use(express.json());

app.get('/tasks', (req, res) => {
  const tasks = readTasks();
  res.status(200).json(tasks);
});

app.post('/tasks', (req, res) => {
  try {
    const task = req.body;
    const tasks = readTasks();
    tasks.push(task);
    writeTasks(tasks);
    res.status(201).json(task);
  } catch (e) {
    res.status(400).json({ error: 'Invalid JSON' });
  }
});

// Start server
app.listen(3000, '127.0.0.1', () => {
  console.log('Listening on 127.0.0.1:3000');
});

