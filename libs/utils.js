'use strict';
const _ = require('lodash');
const Promise = require('promise');
const Response = require('./response');

const Permissions = require('../models/permissionModel');
const Roles = require('../models/roleModel');

const PermissionsData = require('../seed/permissions');
const RoleData = require('../seed/roles');

module.exports.seedData = () => {
    Permissions.find({}).then((result) => {
        if (_.isEmpty(result)) {
            const permissions = PermissionsData;
            Permissions.insertMany(permissions).then((result) => {
                console.log("Seed Permission Successfully!!!");
            }).catch((err) => {
                return err;
            })
        }
    });

    Roles.find({}).then((result) => {
        if (_.isEmpty(result)) {
            const roles = RoleData;
            Roles.insertMany(roles).then((result) => {
                console.log('Seed Roles Successfully!!!');
            }).catch((err) => {
                console.log(err);
                return err;
            })
        }
    });
}

module.exports.getQueryAuthen = (req, query) => {
    if (req.user.role != 'admin') {
        query['userId'] = req.user._id;
    }
    return query;
};

module.exports.genSubDevices = (type, numberSubDevice) => {
    const subDevices = [];
    return new Promise(async function(resolve, reject) {
        try {
            for (let channel = 1; channel <= parseInt(numberSubDevice); channel++) {
                const subDevice = {
                    channelId: channel,
                    name: type  + '_device_' + channel,
                    type: type,
                    flows: '',
                    capacity: '',
                    status: true
                };
                subDevices.push(subDevice);
            }
            resolve(subDevices);
        } catch(error) {
            console.log(error);
            resolve(subDevices);
        }
    });
}


module.exports.convertDecToBinArray = (number, numberBits = 16) => {
    let binary = "";
    let temp = parseInt(number);
    for(let i = 0; i < numberBits; i++) {
        if(temp % 2 == 0){
            binary = "0" + binary;
        }
        else {
            binary = "1" + binary;
        }
        temp = Math.floor(temp / 2);
    }
    return binary.split("");
}

module.exports.convertBinToDec = (binaryNumber) => {
    let total = 0;
    for(let i = 0; i < binaryNumber.length; i++){
        const bit = binaryNumber.charAt(binaryNumber.length - (i + 1 ));
        if(bit == 1){
            const temp = Math.pow(2, i* parseInt(bit));
            total += temp;
        }
    }
    return total;
}

module.exports.checkPermissionDetail = (req, res, next) => {
    let path = req.baseUrl;
    path = path.replace(process.env.BASE_URL_API, '');
    let pers = _.includes(req.dataPermissions, path);
    if(req.dataPermissions && pers) {
      return next();
    } else {
      return Response.error(res, 403, 'Unauthorized access');
    }
}