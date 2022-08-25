'use strict';

const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const admin = require('firebase-admin');
const credential = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY,
}

admin.initializeApp({
  credential: admin.credential.cert({ credential }),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});

const firestore = {};

firestore.addTask = async (req, res) => {
  try{

  } catch (error) {

  }
}