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
            }
            else {
                callback(true, res);
            }
        })
    },



    select_assoc: async (tbl_name, column, data) => {
        return new Promise((resolve, reject) => {
            conn.query(`SELECT * FROM ${tbl_name} WHERE ${column} = '${data}'`, (err, res) => {
                if (err) {
                    reject('No Data Found');
                } else {
                    if (res.length === 0) {
                        reject('No Data Found');
                    } else {
                        resolve(res);
                    }
                }
            });
        });
    },



    delete: (tbl_name, column, data, callback) => {
        let sql = `DELETE FROM ${tbl_name} WHERE ${column} = '${data}'`;
        conn.query(sql, (err, res) => {
            if (err) {
                callback(false, 'No Data Found');
            }
            else {
                if (res.affectedRows > 0) {
                    callback(true, res.affectedRows + ' Data Deleted');
                }
                else {
                    callback(false, 'Unable to Delete');
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
            }
            else {
                if (res.affectedRows > 0) {
                    callback(true, res.affectedRows + " Data Inserted");
                }
                else {
                    callback(false, 'Data not Inserted');
                }
            }
        });
    },



    update: async (tbl_names, where, data, fields) => {
        let sql = `UPDATE ${tbl_names} SET `;
        for (const [key, val] of Object.entries(fields)) {
            sql += `${key} = "${val}", `;
        }

        sql = sql.slice(0, -2);
        sql += ` WHERE ${where} = "${data}"`;

        return new Promise((resolve, reject) => {
            conn.query(sql, (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    if (res.affectedRows > 0) {
                        resolve('Data Updated');
                    } else {
                        reject('Unable To Update');
                    }
                }
            });
        });
    },


    /* * SQL FUNCTION INCOMPLETE * */

    run: (sql, callback) => {
        conn.query(sql, (err, res) => {
            if (err) {
                callback(false, err);
            }
            else {
                if (typeof res == 'object' && res.affectedRows != undefined) {
                    callback(true, res.affectedRows + ' Rows Affected');
                }
                else {
                    callback(true, res);
                }
            }
        })
    }
}



module.exports = functions;