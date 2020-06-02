const express = require('express');
const router = express.Router();
const Database = require('../database/database');
const bcrypt = require('bcrypt');
const generateToken = require('../authentication/token');

const db = new Database();

router.post('/create', (req, res, next) => {
    console.log(req.body);
    
    bcrypt.hash(req.body.password, 10, function(err, hash) {
        req.body.password = hash;
        db.execQuery("INSERT INTO admin SET ?", req.body).then(result => {
            res.status(201).json(result);
        });
    });
});

router.get('/authenticate/:token', (req, res, next) => {
    db.execQuery("SELECT * FROM session WHERE ?", req.params).then(result => {
        if(result.length>0){
            return res.status(202).json({message: 'auth'});
        }else{
            return res.status(200).json({message: 'unauth'});
        }
    });
});


router.post('/login/:email', (req, res, next) => { 
    db.execQuery("SELECT * FROM admin WHERE ?", req.params).then(result => {
        if(result.length==0){
            return res.status(406).json({message: 'Incorrect credentials.'});
        }
        bcrypt.compare(req.body.password, result[0].password, function(err, auth) {
            if(auth) {
                db.execQuery("SELECT * FROM session;", req.params).then(result1 => {
                    var token1 = '';
                    do{
                        token1 =  generateToken(20);
                        valid = true;
                        for(let result in result1){
                            if(result.token==token1){
                                valid = false;
                            }
                        }                        
                    }while(!valid);
                    session = { token: token1};
                    db.execQuery("INSERT INTO session SET ?", session).then(result2 => {
                        return res.status(201).json({ token: session.token});
                    });
                });
            } else {
                res.status(406).json({message: 'Incorrect credentials.'});
            } 
          });
    });
});

router.put('/updateBasics/:email', (req, res, next) => {
    db.execQuery("UPDATE admin SET ? WHERE ?",  [req.body, req.params]).then(result => {
        res.status(202).json(result);
    }); 
});

router.put('/updatePassword/:email', (req, res, next) => {    
    db.execQuery("SELECT * FROM admin WHERE ?", req.params).then(result => {
        bcrypt.compare(req.body.password, result[0].password, function(err, auth) {
            if(auth) {
                bcrypt.hash(req.body.newPassword, 10, function(err, hash) {
                    db.execQuery("UPDATE admin SET ? WHERE ?",  [{password: hash}, req.params]).then(result => {
                        res.status(202).json(result);
                    });
                });
                 
            } else {
                res.status(200).json({message: 'unauth'});
            } 
          });
    });
});

router.delete('/logout/:token', (req, res, next) => { 
    db.execQuery("SELECT * FROM session WHERE ?", req.params).then(result => {
        if(result.length==0){
            return res.status(200).json({message: 'Wrong Session ID'});
        }
        db.execQuery("DELETE FROM session WHERE ?",  [req.params, null]).then(result => {
            return res.status(202).json({message: 'Success'});
        });
    });
});

router.get('/', (req, res, next) => { 
    db.execQuery("SELECT * FROM admin;", req.params).then(result => {
        result.password = 
        res.status(200).json(result);
    });
});

router.get('/:email', (req, res, next) => { 
    db.execQuery("SELECT * FROM admin WHERE ?;", req.params).then(result => {
        result.password = 
        res.status(200).json(result);
    });
});


module.exports = router;