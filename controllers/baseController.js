'use strict';
const _ = require('lodash');
const Promise = require('promise');

module.exports = {
    list(Model, query) {
        return new Promise(async function(resolve, reject) {
            try {
                const {page, pageSize} = query;
                const limit = parseInt(pageSize) ? parseInt(pageSize) : 20;
                const skip = parseInt(page) * limit;
                const data = await Model.find({}).skip(skip).limit(limit);
                if (data && (data.length < 1)) {
                    resolve({
                        status: false,
                        error: "Not found " + Model.collection.collectionName 
                    });
                } else {
                    resolve({
                        status: true,
                        data
                    });
                }
            } catch(error) {
                resolve({
                    status: false,
                    error: error.message
                });
            }
        });
    },
    
    getById(Model, id) {
        return new Promise(async function(resolve, reject) {
            try {
                const data = await Model.findById(id);
                if (data && (data.length < 1)) {
                    resolve({
                        status: false,
                        error: "Not found " + Model.collection.collectionName 
                    });
                } else {
                    resolve({
                        status: true,
                        data
                    });
                }
            } catch(error) {
                resolve({
                    status: false,
                    error: error.message
                });
            }
        });
    },

    addOne(Model, dataInsert) {
        return new Promise(async function(resolve, reject) {
            try {
                const data = await Model.create(dataInsert);
                if (data && (data.length < 1)) {
                    resolve({
                        status: false,
                        error: "Error insert to " + Model.collection.collectionName 
                    });
                } else {
                    resolve({
                        status: true,
                        data
                    });
                }
            } catch(error) {
                resolve({
                    status: false,
                    error: error.message
                });
            }
        });
    },

    addNotExist(Model, query, dataInsert) {
        return new Promise(async function(resolve, reject) {
            try {
                const dataOld = await Model.findOne(query);
                if (dataOld) {
                    resolve({
                        status: false,
                        error: Model.collection.collectionName + " is exist"  
                    });
                } else {
                    const dataNew = await Model.create(dataInsert);
                    if (!dataNew) {
                        resolve({
                            status: false,
                            error: "Error insert to " + Model.collection.collectionName 
                        });
                    } else {
                        resolve({
                            status: true,
                            data: dataNew
                        });
                    }
                }
            } catch(error) {
                resolve({
                    status: false,
                    error: error.message
                });
            }
        });
    },

    addMany(req, res) {

    },

    updateOne(Model, query, dataUpdate) {
        return new Promise(async function(resolve, reject) {
            try {
                const oldData = await Model.findOne(query);
                if (!oldData) {
                    resolve({
                        status: false,
                        error: Model.collection.collectionName + " is not found"  
                    });
                } else {
                    const migrateData =  _.merge(oldData, dataUpdate);
                    const dataSave = await migrateData.save();
                    if (!dataSave) {
                        resolve({
                            status: false,
                            error: "Error update to " + Model.collection.collectionName 
                        });
                    } else {
                        resolve({
                            status: true,
                            data: dataSave
                        });
                    }
                }
            } catch(error) {
                resolve({
                    status: false,
                    error: error.message
                });
            }
        });
    },
    delete(Model, _id) {
        return new Promise(async function(resolve, reject) {
            try {
                const result = await Model.deleteOne({_id});
                console.log(result);
                if (result && result['ok'] && (result['deletedCount'] == 1)) {
                    resolve({
                        status: true,
                        data: result
                    });
                } else {
                    resolve({
                        status: false,
                        error: 'Delete ' + Model.collection.collectionName  + ' is fail!'
                    });
                }
            } catch(error) {
                resolve({
                    status: false,
                    error: error.message
                });
            }
        });
    }
};