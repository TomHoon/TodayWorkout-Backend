const maria = require('mysql');

const conn = maria.createConnection({
    host : '192.168.0.100', 
    // host : 'localhost',
    port : 13306,
    user:'root',
    password:'1234',
    database: 'todayworkout'
});

module.exports = conn;