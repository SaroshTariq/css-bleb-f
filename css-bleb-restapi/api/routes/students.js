const express = require('express');
const router = express.Router();
const Database = require('../database/database');
const multer = require('multer');
const generateToken = require('../authentication/token');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');


const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './photos/students/');
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toString().replace(/:/g, '-')+"-"+file.originalname);
  }
});

const upload = multer({storage: storage});

const db = new Database();

router.get('/', (req, res, next) => {
    db.execQuery("SELECT *, (SELECT project.title FROM project WHERE project.project_id=student.project_id) AS project FROM student;", null).then(result => {
        res.status(200).json(result);
    });
});

router.post('/login/:email', (req, res, next) => {
    db.execQuery("SELECT * FROM student WHERE ? ", req.params).then(result => {
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

                    result[0].token = token1;
                    session = {token: token1}
                    db.execQuery("INSERT INTO session SET ?", session).then(result2 => {
                        return res.status(201).json(result[0]);
                    });
                });
            } else {
                res.status(406).json({message: 'Incorrect credentials.'});
            } 
          });
    });
});


router.post('/', upload.fields([{ name: 'display_picture', maxCount: 1 }]), (req, res, next) => {
    if(req.files.display_picture!=undefined){
        req.body.display_picture = req.files.display_picture[0].path;
    }
    if(req.body.password==undefined){
        req.body.password = generateToken(7);
    }
    var userPassword = req.body.password;
    bcrypt.hash(req.body.password, 10, function(err, hash) {
        req.body.password = hash;
        db.execQuery("INSERT INTO student SET ?", req.body).then(result => {
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                       user: 'cssbleb@gmail.com',
                       pass: 'frdeswaq12'
                   }
               });
            const mailOptions = {
                from: 'cssbleb@gmail.com', // sender address
                to: req.body.email, // list of receivers
                subject: 'CSS-BLEB Student Portal Registration', // Subject line
                html: '<p>Your login credentials are.</p>'+'<p>'+req.body.email+'</p>'+'<p>'+userPassword+'</p>'// plain text body
            };  

            transporter.sendMail(mailOptions, function (err, info) {
                if(err)
                  console.log(err)
                else
                  console.log(info);
                  return res.status(201).json(result);
             });
            
        });
    });
    
});

router.delete('/', (req, res, next) => {
    db.execQuery("DELETE FROM student WHERE (student_id) IN (?)", [req.body]).then(result => {
        res.status(202).json(result);
    });
});

router.get('/:student_id', (req, res, next) => {
    db.execQuery("SELECT * FROM student WHERE ?",  [req.params, null]).then(result => {
        res.status(200).json(result);
    });
});

router.put('/:student_id', upload.fields([{ name: 'display_picture', maxCount: 1 }]), (req, res, next) => {
    console.log(req.body);
    if(req.files.display_picture!=undefined){
        req.body.display_picture = req.files.display_picture[0].path;
    }
    db.execQuery("UPDATE student SET ? WHERE ?",  [req.body, req.params]).then(result => {
        res.status(202).json(result);
    });
});

router.delete('/:student_id', (req, res, next) => {
    db.execQuery("DELETE FROM student WHERE ?",  [req.params, null]).then(result => {
        res.status(202).json(result);
    });
});

module.exports = router;