const _ = require('lodash');
const EmqxHelper = require('../libs/emqxHelper');
const RequestPromise = require('../libs/requestPromise');

const DeviceStatusService = require('../services/deviceStatusService');
const DeviceReportService = require('../services/deviceReportService');
const DeviceService = require('../services/deviceService');

const ReportRawDevice = require('../models/reportRawDeviceModel');
const LogConfigDevice = require('../models/logConfigDeviceModel');

module.exports = {
    dinhKy(payload) {
        return new Promise(async function(resolve, reject) {
            try {
                const dataInsert = payload;
                delete dataInsert['maLenh'];
                await DeviceStatusService.processDeviceStatus(dataInsert);
                await DeviceReportService.processDeviceReport(dataInsert);
                await ReportRawDevice.create(dataInsert);
                const initData = {
                    deviceId: dataInsert['deviceId'],
                    config: dataInsert['config'],
                    input: dataInsert['input1'],
                    output1: dataInsert['output1'],
                    output2: dataInsert['output2'],
                    warning1: dataInsert['warning1'],
                    warning2: dataInsert['warning2'],
                    backup1: dataInsert['backup1'],
                    backup2: dataInsert['backup2'],
                    backup3: dataInsert['backup3'],
                    backup4: dataInsert['backup4'],
                    backup5: dataInsert['backup5'],
                  };
                const data = `idtb=${initData.deviceId}&config=${initData.config}&input=${initData.input}&output1=${initData.output1}&
                output2=${initData.output2}&warning1=${initData.warning1}&warning2=${initData.warning2}&backup1=${initData.backup1}
                &backup2=${initData.backup2}&backup3=${initData.backup3}&backup4=${initData.backup4}&backup5=${initData.backup5}`;
                console.log(data);
                RequestPromise.requestPromise(data);
                resolve(true);
            } catch(error) {
                console.log(error);
                resolve(false);
            }
        });
    },

    dieuKhien(payload) {
        return new Promise(async function(resolve, reject) {
            try {
                const request = await EmqxHelper.getCheckConnectionRequest(deviceId);
                const connection = await EmqxHelper.requestPromise(request);
                if (connection && (!_.isEmpty(connection.data))) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            } catch(error) {
                console.log(error);
                resolve(false);
            }
        });
    },

    cauHinh(payload) {
        return new Promise(async function(resolve, reject) {
            try {
                const dataConfig = payload;
                await LogConfigDevice.create(dataConfig);
                delete dataConfig['maLenh'];
                await DeviceService.processConfigDevice(dataConfig);
                resolve(true);
            } catch(error) {
                console.log(error);
                resolve(false);
            }
        });
    },

    update(payload) {
        return new Promise(async function(resolve, reject) {
            try {
                const request = await EmqxHelper.getCheckConnectionRequest(deviceId);
                const connection = await EmqxHelper.requestPromise(request);
                if (connection && (!_.isEmpty(connection.data))) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            } catch(error) {
                console.log(error);
                resolve(false);
            }
        });
    },

    henGio(payload) {
        return new Promise(async function(resolve, reject) {
            try {
                const request = await EmqxHelper.getCheckConnectionRequest(deviceId);
                const connection = await EmqxHelper.requestPromise(request);
                if (connection && (!_.isEmpty(connection.data))) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            } catch(error) {
                console.log(error);
                resolve(false);
            }
        });
    },
};
