const compression = require('compression');
const express = require('express');
const cors = require('cors');
const app = express();

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// https://stackoverflow.com/questions/62396498/tslint-marks-body-parser-as-deprecated
// parse application/json
app.use(express.json());
app.use(cors());
app.use(compression());


app.use(express.static("public"));

// app.use('/admin', require('./../admin/v1/admin'));

// Send all other requests to the Angular app
// app.use(express.static(path.join(__dirname, './../dist')));
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, './../dist/index.html'));
// });

require('./swagger.connection')(app);

app.use('/admin', require('./../api/index'));




/***
 * 
 * Middleware API - If not found any url
 * 
 */
app.use(async (req, res, next) => {

    /**
     * ERROR CODE FOR ROUTE NOT FOUND
     * 
     * const err = new Error("NOT FOUND");
     * 
     */

    res.statusCode = 404;
    return res.json({
        status: false,
        msg: 'The url you are trying to reach is not hosted on our server.'
    });
    // next(err);
});




module.exports = app;