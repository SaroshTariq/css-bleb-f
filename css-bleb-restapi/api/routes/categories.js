const express = require('express');
const router = express.Router();
const Database = require('../database/database');

const db = new Database();

router.get('/', (req, res, next) => {
    db.execQuery("SELECT *, (SELECT COUNT(*) FROM project WHERE project.category_id=category.category_id) AS projects FROM category;", null).then(result => {
        res.status(200).json(result);
    });
});

router.post('/', (req, res, next) => {
    db.execQuery("INSERT INTO category SET ?", req.body).then(result => {
        res.status(201).json(result);
    });
});

router.delete('/', (req, res, next) => {
    db.execQuery("DELETE FROM category WHERE (category_id) IN (?)", [req.body]).then(result => {
        res.status(200).json(result);
    });
});

router.get('/:category_id', (req, res, next) => {
    db.execQuery("SELECT * FROM category WHERE ?",  [req.params, null]).then(result => {
        res.status(200).json(result);
    });
});

router.put('/:category_id', (req, res, next) => {
    db.execQuery("UPDATE category SET ? WHERE ?",  [req.body, req.params]).then(result => {
        res.status(200).json(result);
    });
});

router.delete('/:category_id', (req, res, next) => {
    db.execQuery("DELETE FROM category WHERE ?",  [req.params, null]).then(result => {
        res.status(202).json(result);
    });
});



module.exports = router;