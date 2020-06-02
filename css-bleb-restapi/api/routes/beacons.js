const express = require('express');
const router = express.Router();
const Database = require('../database/database');
const db = new Database();

router.get('/', (req, res, next) => {
    db.execQuery("SELECT * FROM beacon;", null).then(result => {
        res.status(200).json(result);
    });
});

router.post('/', (req, res, next) => {
    db.execQuery("INSERT INTO beacon SET ?", req.body).then(result => {
        res.status(201).json(result);
    });
});

router.delete('/', (req, res, next) => {
    db.execQuery("DELETE FROM beacon WHERE (beacon_id) IN (?)", [req.body]).then(result => {
        res.status(202).json(result);
    });
});

router.get('/:beacon_id', (req, res, next) => {
    db.execQuery("SELECT * FROM beacon WHERE ?",  [req.params, null]).then(result => {
        res.status(200).json(result);
    });
});

router.put('/:beacon_id', (req, res, next) => {
    db.execQuery("UPDATE beacon SET ? WHERE ?",  [req.body, req.params]).then(result => {
        res.status(202).json(result);
    });
});

router.delete('/:beacon_id', (req, res, next) => {
    db.execQuery("DELETE FROM beacon WHERE ?",  [req.params, null]).then(result => {
        res.status(202).json(result);
    });
});



module.exports = router;