'use strict';

const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const PORT = process.env.PORT || 3002;
const firestore = require('./modules/firestore');
const logger = require('./middleware/logger');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(logger);

app.get('/', (req, res) => {
  try{
    console.log('Kanban Server');
    res.status(200).send('Welcome to my Kanban server!');
  } catch (error) {
    res.status(404).send(error.message);
  }
});

// Database requests
app.post('/board/add', firestore.createBoard);
app.get('/board/get/:id', firestore.getBoardData);
app.post('/task/add', firestore.addTask);
app.delete('/task/delete/:id', firestore.deleteTask);
app.patch('/task/update/:id', firestore.updateTask);
app.get('/task', firestore.getAllTasks);
app.get('/task/:id', firestore.getOneTasks);
app.patch('/task/save/:id', firestore.updateAllTasks);
app.get('/column', firestore.getColumns);
app.post('/column/add', firestore.addColumn);
// app.delete('/column/delete/:id', firestore.deleteColumn);
app.patch('/column/update/:id', firestore.updateColumn);

app.get('*', (req, res, next) => {
    res.send('Nothing is here! Try another endpoint...');
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));