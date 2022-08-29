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
      status: req.body.status,
      imageUrl: req.body.image,
      tasklist: req.body.tasklist
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
    const id = req.params.id;
    const reponseRef = await db.collection('tasks').doc(id).delete();
    req.status(200).send('task deleted');
  } catch (error) {
    res.status(404).send(error.message);
  }
}

// update selected task
firestore.updateTask = async (req, res) => {
  try{
    const id = req.params.id;
    const newbody = {
      flare: req.body.flare,
      title: req.body.title,
      details: req.body.details,
      status: req.body.status,
      imageUrl: req.body.image,
      tasklist: req.body.tasklist
    }
    const body = req.body; // can i grab the entire req body as an object?
    console.log('hell0');
    console.log(`request body : ${body}`); 
    const reponseRef = await db.collection('tasks').doc(id).update(body);
    // const reponseRef = await db.collection('tasks').doc(id).update({
    //   flare: req.body.flare,
    //   title: req.body.title,
    //   details: req.body.details,
    //   status: req.body.status,
    //   imageUrl: req.body.imageUrl,
    //   tasklist: req.body.tasklist});
    res.status(200).send('task updated!');
  } catch (error) {
    res.status(404).send(error.message);
  }
}

// get all tasks
firestore.getAllTasks = async (req, res) => {
  try {
    const response = await db.collection('tasks').get();
    const responseArr = [];
    response.forEach(doc => {
      responseArr.push(doc.data())
    });
    res.status(200).send(responseArr);
  } catch (error) {
    res.status(404).send(error.message);
  }
}

// add columns
firestore.addColumn = async (req, res) => {
  try{
    const column = {
      name: req.body.name
    }
    const response = await db.collection('columns').add(column);
    res.status(200).send('item succesfully added');
  } catch (error) {
    res.status(404).send(error.message);
  }
}

// get columns 
firestore.getColumns = async (req, res) => {
  try{
    const response = await db.collection('columns').get();
    const responseArr = [];
    response.forEach(doc => {
      responseArr.push(doc.data())
    });
    res.status(200).send(responseArr);
  } catch (error) {
    res.status(404).send(error.message);
  }
}

// delete selected task
firestore.deleteColumn = async (req, res) => {
  try{
    const id = req.params.id;
    const reponseRef = await db.collection('columns').doc(id).delete();
    req.status(200).send('task deleted');
  } catch (error) {
    res.status(404).send(error.message);
  }
}

// 

module.exports = firestore;