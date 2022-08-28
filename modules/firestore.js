'use strict';

const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const admin = require('firebase-admin');
const { response } = require('express');
// const credential = {
//   projectId: process.env.FIREBASE_PROJECT_ID,
//   clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
//   privateKey: process.env.FIREBASE_PRIVATE_KEY,
// }

admin.initializeApp({
  credential: admin.credential.cert({  
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY, }),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});

const db = admin.firestore();
app.use(express.urlencoded({ extended: true }));
const firestore = {};

// add to task collection
firestore.addTask = async (req, res) => {
  try{
    const task = {
      flare: req.body.flare,
      title: req.body.title,
      details: req.body.details,
      status: req.body.status
    }
    const response = await db.collection('tasks').add(task);
    res.status(200).send(task);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

// delete selected task
firestore.deleteTask = async (req, res) => {
  try{
    const id = req.body.id;
    const reponseRef = await db.collection('tasks').doc(id).delete();
    req.status(200).send('task deleted');
  } catch (error) {
    res.status(404).send(error.message);
  }
}

// get all tasks
firestore.getAllTasks = async (req, res) => {
  try {
    const response = db.collection('tasks')
  } catch (error) {

  }
}

module.exports = firestore;