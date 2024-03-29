const conn = require('./sql_connect');



conn.connect((err, _) => {
    if (err) {
        console.log('Not Connected');
    }
    else {
        console.log('Connected');
    }
});
const break_conn = () => {
    conn.end((err, ok) => {
        if (err) {
            console.log('Not Disconnected');
        }
        else {
            console.log('Disconnected')
        }
    });
}




let functions = {
    select: (tbl_name, callback) => {
        conn.query(`SELECT * FROM ${tbl_name}`, (err, res) => {
            if (err) {
                callback(false, 'No Data Found');
                // break_conn();
            }
            else {
                callback(true, res);
                // break_conn();
            }
        })
    },



    select_assoc: (tbl_name, column, data, callback) => {
        conn.query(`SELECT * FROM ${tbl_name} WHERE ${column} = '${data}'`, (err, res) => {
            if (err) {
                callback(false, 'No Data Found');
            }
            else {
                if (res.length == 0) {
                    callback(false, 'No Data Found');
                    // break_conn();
                }
                else {
                    callback(true, res);
                    // break_conn();
                }
            }
        })
    },



    delete: (tbl_name, column, data, callback) => {
        let sql = `DELETE FROM ${tbl_name} WHERE ${column} = '${data}'`;
        console.log(sql);
        conn.query(sql, (err, res) => {
            if (err) {
                callback(false, 'No Data Found');
            }
            else {
                if (res.affectedRows > 0) {
                    callback(true, res.affectedRows+' Data Deleted');
                    // break_conn();
                }
                else {
                    callback(false, 'Unable to Delete');
                    // break_conn();
                }
            }
        })
    },



    insert: function (tbl_names, fields, callback) {
        sql = `INSERT INTO ${tbl_names} ( `;
        sql += Object.keys(fields)
        sql += `,id) VALUES ( `;
        for (const key in fields) {
            sql += '"' + (`${fields[key]}`) + '" ,';
        }
        sql += null + ')';

        conn.query(sql, (err, res) => {
            if (err) {
                callback(false, 'Data Not Inserted');
                // break_conn();
            }
            else {
                if (res.affectedRows > 0) {
                    callback(true, res.affectedRows + " Data Inserted");
                    // break_conn();
                }
                else {
                    callback(false, 'Data not Inserted');
                    // break_conn();
                }
            }
        });
    },



    update: (tbl_names, where, data, fields, callback) => {
        sql = `UPDATE ${tbl_names} SET `;
        for (const [key, val] of Object.entries(fields)) {
            sql += key + ` = "${val}" , `
        }
        sql += `id = ${data} WHERE ${where} = "${data}"`;
        console.log(sql);
        conn.query(sql, (err, res) => {
            if (err) {
                callback(false, err);
                // break_conn();
            }
            else {
                if (res.affectedRows > 0) {
                    callback(true, 'Data Updated');
                    // break_conn();
                }
                else {
                    callback(false, 'Unable To Update');
                    // break_conn();
                }

            }
        })
    },

    /* * SQL FUNCTION INCOMPLETE * */

    sql: (sql, callback) => {
        conn.query(sql, (err, res) => {
            if (err) {
                callback(false, err);
                // break_conn();
            }
            else {
                if (typeof res == 'object'  && res.affectedRows != undefined) {
                    callback(true, res.affectedRows + ' Rows Affected');
                    // break_conn();
                }
                else {
                    callback(true, res);
                    // break_conn();
                }
            }
        })
    }
}



module.exports = functions;