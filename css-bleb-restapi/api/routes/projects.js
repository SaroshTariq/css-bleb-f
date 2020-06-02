const express = require('express');
const router = express.Router();
const Database = require('../database/database');
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './photos/projects/');
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toString().replace(/:/g, '-')+"-"+file.originalname);
  }
});

const upload = multer({storage: storage});

const db = new Database();

router.get('/', (req, res, next) => {
    db.execQuery("SELECT *, (SELECT COUNT(*) FROM student WHERE student.project_id=project.project_id)  AS students, (SELECT category.name FROM category WHERE category.category_id=project.category_id) AS category, (SELECT beacon.location FROM beacon WHERE beacon.beacon_id=project.beacon_id) AS room  FROM project;", null).then(result => {
        res.status(200).json(result);
    });
});

router.post('/', upload.fields([{ name: 'photo1', maxCount: 1 }, { name: 'photo2', maxCount: 1 }, { name: 'photo3', maxCount: 1 }]), (req, res, next) => {
    if(req.files.photo1!=undefined){
        req.body.photo1 = req.files.photo1[0].path;
    }
    if(req.files.photo2!=undefined){
        req.body.photo2 = req.files.photo2[0].path;
    }
    if(req.files.photo3!=undefined){
        req.body.photo3 = req.files.photo3[0].path;
    }
    db.execQuery("INSERT INTO project SET ?", req.body).then(result => {
        res.status(201).json(result);
    });
});

router.delete('/', (req, res, next) => {    
    db.execQuery("DELETE FROM project WHERE (project_id) IN (?)", [req.body]).then(result => {
        res.status(202).json(result);
    });
});

router.get('/:project_id', (req, res, next) => {
    db.execQuery("SELECT *, (SELECT COUNT(*) FROM student WHERE student.project_id=project.project_id) AS students, (SELECT category.name FROM category WHERE category.category_id=project.category_id) AS category FROM project WHERE ?",  [req.params, null]).then(result => {
        res.status(200).json(result);
    });
});

router.get('/:project_id/students', (req, res, next) => {
    db.execQuery("SELECT * FROM student WHERE ?",  [req.params, null]).then(result => {
        res.status(200).json(result);
    });
});

router.put('/:project_id', upload.fields([{ name: 'photo1', maxCount: 1 }, { name: 'photo2', maxCount: 1 }, { name: 'photo3', maxCount: 1 }]), (req, res, next) => {
    if(req.files.photo1!=undefined){
        req.body.photo1 = req.files.photo1[0].path;
    }
    if(req.files.photo2!=undefined){
        req.body.photo2 = req.files.photo2[0].path;
    }
    if(req.files.photo3!=undefined){
        req.body.photo3 = req.files.photo3[0].path;
    }
    
    
    db.execQuery('UPDATE project SET ? WHERE ?',  [req.body, req.params]).then(result => {
        res.status(202).json(result);
    });
});

router.delete('/:project_id', (req, res, next) => {
    db.execQuery("DELETE FROM project WHERE ?",  [req.params, null]).then(result => {
        res.status(202).json(result);
    });
});

module.exports = router;