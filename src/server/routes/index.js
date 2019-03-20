const express = require('express');
const mongoose = require('mongoose');
const uniqID = require('uniqid');
const fs = require('fs');

const keys = require('../config/keys');
const Project = require('../models/Project');
const Test = require('../models/Test');
const { GeneralServiceError, WrongEntityError } = require('../lib/error');

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
  let project = req.params.project_id;

  try {
    project = await Project.findOneAndDelete({ _id: project });
  } catch (err) {
    return next(new GeneralServiceError());
  }

  res.json(project._id);
});

router.post('/projects/:project_id/testlist/:test_name', async (req, res, next) => {
  const projectId = req.params.project_id;
  const name = req.params.test_name;
  const uniqId = uniqID();
  let newTest;
  const project = await Project.findById(projectId);

  if (!name || !projectId || !project) {
    return next(WrongEntityError());
  }

  try {
    newTest = await new Test({
      name,
      uniqId,
      projectId,
      clickEvent: [],
      conversion: 0,
      visit: [],
      visit_count: 0,
      revisit_count: 0,
      visitorIPs: {},
    }).save();
  } catch (err) {
    return next(GeneralServiceError());
  }

  project.testIds.push(newTest._id);

  await project.save();

  res.json(newTest);
});

router.get('/projects/:project_id/testlist', async (req, res, next) => {
  const projectId = req.params.project_id;

  if (!projectId) {
    return next(WrongEntityError());
  }

  try {
    const project = await Project.findById(projectId);

    const testList = await Promise.all(project.testIds.map(id => Test.findById(id)));

    res.json(testList);
  } catch (err) {
    return next(GeneralServiceError());
  }
});

router.delete('/projects/testlist/:testlist_id', async (req, res, next) => {
  let testList = req.params.testlist_id;

  try {
    testList = await Test.findOneAndDelete({ _id: testList });
  } catch (err) {
    return next(GeneralServiceError());
  }

  const project = await Project.findById(testList.projectId);

  project.testIds.pull(testList._id);
  await project.save();

  res.json(testList._id);
});

router.get('/test-page/source-file', (req, res, next) => {
  const uniqId = req.query.key;

  if (!uniqId) {
    return next(WrongEntityError());
  }

  fs.unlinkSync('./source/visitor.js');

  const read = fs.createReadStream('./visitor.js');
  const write = fs.createWriteStream('./source/visitor.js');

  write.on('error', err => next(new GeneralServiceError()));

  write.on('close', () => {
    fs.appendFileSync('./source/visitor.js', `const key = "${uniqId}";`);

    const source = fs.readFileSync('./source/visitor.js', 'utf8');

    res.send(source);
  });

  read.pipe(write);
});

router.post('/test-page/:uniqId', async (req, res, next) => {
  const { uniqId } = req.params;
  const { event } = req.body;
  let test;

  try {
    test = await Test.findOne({ uniqId });
  } catch (err) {
    return next(GeneralServiceError());
  }

  if (!uniqId.trim() || !test) {
    return next(WrongEntityError());
  }

  if (event.name === 'connect') {
    test.visit_count++;
  }

  if (event.name === 'click') {
    test.clickEvent.push(event);

    if (event.isButtonCTA) {
      test.conversion++;
    }
  }

  await test.save();

  res.json(event);
});

module.exports = router;
