const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const database = require('./database')

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// cors init
const cors = require('cors')
app.use(cors())


app.post('/basic/insert', function (req, res, next) {
    const arrayJson = (req && req.body && req.body.data) ? req.body.data : [];
    if (arrayJson.length === 0) {
        res.send('/basic/insert - Unsuccessful - Bad Request 300')
    } else {
        arrayJson.forEach(element => console.log(element))
        database.insertData(arrayJson, (error, result) => {
            if (error) {
                res.send('/basic/insert - Error')
                return next(error)
            } else {
                console.log('/basic/insert - Result', result)
                res.send('/basic/insert - OK 200')
            }
        })
    }
})

app.get('/basic/data', function (req, res, next) {
    const { meetingId, participantId } = req.query;
    database.selectAllData(meetingId, participantId, (error, result) => {
        if (error) {
            res.send('/basic/data Error')
            return next(error)
        } else {
            console.log('/basic/data - Result', result)
            res.json(result)
        }
    });
})


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json({
        error: err.message,
        code: err.status || 500
    });
});
//:)
module.exports = app;
