'use strict';
const Promise = require('promise');


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