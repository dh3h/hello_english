const sql = require('mysql');

const conn = sql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'course'
});
// conn.connect(function(err){});

module.exports = conn;