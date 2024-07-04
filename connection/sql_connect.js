const sql = require('mysql');
const conn = sql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'hello_english'
});

conn.connect((err) => {
  if (err) {
    console.error('error connecting:', err);
    return;
  }
  console.log('connected as id ' + conn.threadId);
});

module.exports = conn;