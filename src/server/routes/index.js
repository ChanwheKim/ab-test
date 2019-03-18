const express = require('express');
const mongoose = require('mongoose');
const keys = require('../config/keys');
const Project = require('../models/Project');
const { GeneralServiceError } = require('../lib/error');

const router = express.Router();

mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

const db = mongoose.connection;

db.on('error', (error) => {
  console.log('An error has occured while connecting.', error);
});

db.once('open', () => {
  console.log('The database has been connected.');
});

router.post('/projects/:project_name', async (req, res, next) => {
  const name = req.params.project_name;
  let newProject;

  try {
    newProject = await new Project({
      name,
    }).save();
  } catch (err) {
    return next(new GeneralServiceError());
  }

  res.json(newProject);
});

router.get('/projects', async (req, res, next) => {
  let projects;

  try {
    projects = await Project.find();
  } catch (err) {
    return next(new GeneralServiceError());
  }

  res.json(projects);
});

router.delete('/projects/:project_id', async (req, res, next) => {
  let projectId = req.params.project_id;

  try {
    projectId = await Project.findOneAndDelete({ _id: projectId });
  } catch (err) {
    return next(new GeneralServiceError());
  }

  res.json(projectId._id);
});

router.post('/testpage', async (req, res, next) => {
  const event = req.body.event;
  console.log('event info received', event);
  res.json(event);
});

module.exports = router;
