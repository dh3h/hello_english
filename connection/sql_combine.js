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



    select_assoc: async (tbl_name, columns, where = {1:1}, order_by = false) => {
        let sql = `SELECT ${columns} FROM ${tbl_name} WHERE `;
        for (const [key, val] of Object.entries(where)) {
            sql += `${key} = "${val}" AND `;
        }

        sql = sql.slice(0, -4);

        if(order_by){
            sql+= " ORDER BY '" + order_by + "'"
        }

        try {
            const res = await new Promise((resolve, reject) => {
                conn.query(sql, (err, result) => {
                    resolve(result);
                });
            });

            return res;
        } catch (error) {
            return 'Error While Executing Query';
        }
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



    insert: async function (tbl_names, fields) {
        let sql = `INSERT INTO ${tbl_names} ( `;
        sql += Object.keys(fields).join(', ');
        sql += `) VALUES ( `;
        sql += Object.values(fields).map(val => typeof val === 'string' ? `'${val}'` : val).join(', ');
        sql += `)`;

        try {
            const res = await new Promise((resolve, reject) => {
                conn.query(sql, (err, result) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });

            return !!res.affectedRows;
        } catch (error) {
            return 'Data Not Inserted';
        }
    },



    update: async (tbl_names, where, data, fields) => {
        let sql = `UPDATE ${tbl_names} SET `;
        for (const [key, val] of Object.entries(fields)) {
            sql += `${key} = "${val}", `;
        }

        sql = sql.slice(0, -2);
        sql += ` WHERE ${where} = "${data}"`;

        console.log(sql);
        try {
            const res = await new Promise((resolve, reject) => {
                conn.query(sql, (err, result) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });

            return !!res.affectedRows;
        } catch (error) {
            return 'Data Not Inserted';
        }
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