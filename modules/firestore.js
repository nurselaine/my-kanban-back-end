'use strict';

const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const admin = require('firebase-admin');
const { response } = require('express');

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

// Create a new board
firestore.createBoard = async (req,res) => {
  try {
    const boardName = req.body.name;
    const responseRef = await db.collection('boards').add({name: boardName});
    // console.log({id: responseRef._path.segments[1]});
    res.status(200).send(responseRef);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

// Get data from specific board
firestore.getBoardData = async (req, res) => {
  try{
    const taskRef = db.collection('tasks');
    const columnRef = db.collection('columns');
    const id = req.params.id;
    console.log(id);
    // create collection query
    const taskQueryRef = await taskRef.where('boardId', '==', id).get();
    const columnQueryRef = await columnRef.where('boardId', '==', id).get();
    // console.log(`taskQueryRef ${taskQueryRef}`);
    // console.log(`columnQueryRef ${columnQueryRef}`);
    const responseArr = [];
    taskQueryRef.forEach(doc => {
      responseArr.push(doc.data());
    });
    columnQueryRef.forEach(doc => {
      responseArr.push(doc.data());
    })
    console.log(responseArr);
    res.status(200).send(taskQueryRef, columnQueryRef);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

// add to task collection
firestore.addTask = async (req, res) => {
  try{
    const task = {
      // boardId: req.body.boardId,
      title: req.body.title,
      details: req.body.details,
      status: req.body.status,
      imageUrl: req.body.imageUrl,
      tasklist: req.body.tasklist
    }
    const response = await db.collection('tasks').add(req.body);
    res.status(200).send(response); //docRef
  } catch (error) {
    res.status(400).send(error.message);
  }
}

// get task collection
firestore.getOneTasks = async (req, res) => {
  try {
    const response = await db.collection('tasks').get();
    const responseArr = [];
    response.forEach(doc => {
      responseArr.push({_id: doc.id, ...doc.data()})
    });
    res.status(200).send(responseArr[0]);
  } catch (error) {
    res.status(404).send(error.message);
  }
}

// get all tasks
firestore.getAllTasks = async (req, res) => {
  try {
    console.log('hello get All');
    const response = await db.collection('tasks').get();
    const responseArr = [];
    response.forEach(doc => {
      responseArr.push({_id: doc.id, ...doc.data()})
    });
    res.status(200).send(responseArr);
  } catch (error) {
    res.status(404).send(error.message);
  }
}

// delete selected task
firestore.deleteTask = async (req, res) => {
  try{
    const id = req.params.id;
    const reponseRef = await db.collection('tasks').doc(id).delete();
    res.status(200).send('task deleted');
  } catch (error) {
    res.status(404).send(error.message);
  }
}

// update selected task
firestore.updateTask = async (req, res) => {
  try{
    const id = req.params.id;
    const body = req.body;
    // console.log(`request body : ${JSON.stringify(body)}`); 
    const reponseRef = await db.collection('tasks').doc(id).update(body);
    res.status(200).send('task updated!');
  } catch (error) {
    res.status(404).send(error.message);
  }
}

// add columns
firestore.addColumn = async (req, res) => {
  try{
    const column = {
      name: req.body.name,
      index: req.body.index,
      // boardId: req.body.boardId
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
      responseArr.push({_id: doc.id, ...doc.data()})
    });
    res.status(200).send(responseArr);
  } catch (error) {
    res.status(404).send(error);
  }
}

// delete selected task
firestore.deleteColumn = async (req, res) => {
  try{
    const id = req.params.id;
    const reponseRef = await db.collection('columns').doc(id).delete();
    res.status(200).send('task deleted');
  } catch (error) {
    res.status(404).send(error.message);
  }
}

// update column title
firestore.updateColumn = async (req, res) => {
  try {
    const responseRef = await db.collection('columns').doc(req.params.id).update(req.body);
    res.status(200).send('successfully updated!');
  } catch (error) {
    res.status(404).send(error.message);
  }
}

firestore.updateAllTasks = async (req, res) => {
  try{
    const { id } = req.params;
    const body = req.body;
    const reponseRef = await db.collection('tasks').doc(id).update(body);
    console.log(`apparently updated now`);

    res.status(200).send('successfully updated');
  } catch (error) {
    res.status(404).send(error.message);
  }
}

module.exports = firestore;