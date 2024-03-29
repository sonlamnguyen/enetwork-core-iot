const Promise = require('promise');
const request = require('request');

module.exports.requestPromise = (data) => {
    console.log(data);
    return new Promise(function(resolve, reject) {
        try {
            request('http://127.0.0.1/plciot_api/device?' + data, function (error, response, body) {
                console.log('body:', body);
                resolve(true);
            });
        } catch( error) {
            reject(false);
        }   
    });
}