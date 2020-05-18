const io = require('socket.io-emitter')({ 
    host: process.env.REDIS_HOST, 
    port: process.env.REDIS_PORT, 
    key: process.env.REDIS_NAMESPACE
});
module.exports = io;