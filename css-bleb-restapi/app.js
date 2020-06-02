const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyparser = require('body-parser');

app.use(morgan('dev'));
app.use('/photos',express.static('photos'));
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    if(req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
      return res.status(200).json({});
    }
    next();
});

const adminRoutes = require('./api/routes/admins');
const projectsRoutes = require('./api/routes/projects');
const studentsRoutes = require('./api/routes/students');
const categoriesRoutes = require('./api/routes/categories');
const beaconsRutes = require('./api/routes/beacons');

app.use('/admins', adminRoutes);
app.use('/projects', projectsRoutes);
app.use('/students', studentsRoutes);
app.use('/categories', categoriesRoutes);
app.use('/beacons', beaconsRutes);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;