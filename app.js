const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');
const morgan = require('morgan');

const io = require('./libs/redisSocket');


const authenRouter = require('./routes/authenRouter');
const userRouter = require('./routes/userRouter');
const devicesRouter = require('./routes/deviceRouter');
const subDevicesRouter = require('./routes/subDeviceRouter');

const thingControlRouter = require('./routes/thingControlRouter');
const webhookRouter = require('./routes/webhookRouter');
const Response = require('./libs/response');
const app = express();

// Allow Cross-Origin requests
app.use(cors());

app.use(morgan('combined'));

// Set security HTTP headers
app.use(helmet());

// Limit request from the same API 
const limiter = rateLimit({
    max: 150,
    windowMs: 60 * 60 * 1000,
    message: 'Too Many Request from this IP, please try again in an hour'
});
app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({
    limit: '50mb'
}));

// Data sanitization against Nosql query injection
app.use(mongoSanitize());

// Data sanitization against XSS(clean user input from malicious HTML code)
app.use(xss());

// Prevent parameter pollution
app.use(hpp());


// Routes
app.use('/api/v1/authen', authenRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/devices', devicesRouter);
app.use('/api/v1/subdevices', subDevicesRouter);
app.use('/api/v1/things', thingControlRouter);
app.use('/api/v1/mqtt', webhookRouter);

// handle undefined Routes
app.use('*', (req, res, next) => {
    return Response.error(res, 404, 'undefined route');
});

module.exports = app;