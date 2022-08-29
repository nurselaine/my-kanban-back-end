'use strict';

const express = require('express');
const app = express();
const cors = require('cors');
const { request } = require('express');
require('dotenv').config();
const PORT = process.env.PORT || 3002;
const firestore = require('./modules/firestore');


app.use(express.json());
app.use(cors());

app.get('/', res => {
  try{
    console.log('Kanban Server');
    res.status(200).send('Welcome to my Kanban server!');
  } catch (error) {
    res.status(404).send(error.message);
  }
});

// Database requests
app.post('/task/add', firestore.addTask);
app.delete('/task/delete', firestore.deleteTask);
app.get('/task', firestore.getAllTasks);
app.post('/column/add', firestore.addColumn);

app.get('*', res => {
    res.send('Nothing is here! Try another endpoint...');
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));