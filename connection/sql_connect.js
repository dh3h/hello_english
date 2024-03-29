const sql = require('mysql');

const conn = sql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'hello_english'
});
// conn.connect(function(err){});

module.exports = conn;