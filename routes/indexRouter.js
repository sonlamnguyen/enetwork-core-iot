const express = require('express');
const router = express.Router();

const authenRouter = require('./authenRouter');
const userRouter = require('./userRouter');
const roleRouter = require('./roleRouter');
const permissionRouter = require('./permissionRouter');
const devicesRouter = require('./deviceRouter');
const deviceUserRouter = require('./deviceUserRouter');
const reportRouter = require('./reportRouter');

const thingControlRouter = require('./thingControlRouter');
const webhookRouter = require('./webhookRouter');

router.use('/authen', authenRouter);
router.use('/users', userRouter);
router.use('/devices', devicesRouter);
router.use('/device-users', deviceUserRouter);
router.use('/roles', roleRouter);
router.use('/permissions', permissionRouter);
router.use('/report', reportRouter);

router.use('/things', thingControlRouter);
router.use('/mqtt', webhookRouter);

module.exports = router;