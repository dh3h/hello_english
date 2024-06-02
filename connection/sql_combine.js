const conn = require('./sql_connect');

function processString(str) {
    str = String(str);
    if (str.charAt(0) === "*") {
      str = str.substring(1).trim();

      const firstSpaceIndex = str.indexOf(' ');  
      if (firstSpaceIndex !== -1) {
        const criteria = str.substring(0, firstSpaceIndex).trim();
        const val = str.substring(firstSpaceIndex + 1).trim();
        return { criteria, val };
      } else {
        return { criteria: str, val: '' };
      }
    } else {
      return null;
    }
  }

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


    select_assoc: async (tbl_name, columns, where = { 1: 1 }, order_by = false, key_col = false, val_col = false) => {
        let sql = `SELECT ${columns} FROM ${tbl_name} WHERE `;
        for (const [key, val] of Object.entries(where)) {
            console.log(val);
            param = processString(val);
            if(param){
                sql += `${key} ${param.criteria} ${param.val} AND `;
            }else{
                sql += `${key} = "${val}" AND `;
            }
        }
        sql = sql.slice(0, -4);

        if (order_by) {
            sql += " ORDER BY '" + order_by + "'"
        }
        try {
            let res = await new Promise((resolve, reject) => {
                conn.query(sql, (err, result) => {
                    resolve(result);
                });
            });

            if(key_col && val_col){
                response = [];
                res.forEach((key,element) => {
                    response[element[key_col]] = element[val_col]
                    console.log(key);
                });
                res = response

            }

            return res;
        } catch (error) {
            return 'Error While Executing Query';
        }
    },


    delete: async (tbl_name, column, data) => {
        let sql = `DELETE FROM ${tbl_name} WHERE ${column} = '${data}'`;
        try {
            const res = await new Promise((resolve, reject) => {
                conn.query(sql, (err, result) => {
                    resolve(result);
                });
            });
            if (typeof res == 'object' && res.affectedRows != undefined) {
                return res.affectedRows + ' Data Deleted';
            }
            else {
                return 'Unable to Delete';
            }
        } catch (error) {
            return 'Query Failed';
        }
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

    run: async (sql) => {
        try {
            const res = await new Promise((resolve, reject) => {
                conn.query(sql, (err, result) => {
                    resolve(result);
                });
            });
            if (typeof res == 'object' && res.affectedRows != undefined) {
                return res.affectedRows + ' Rows Affected';
            }
            else {
                return res;
            }
        } catch (error) {
            return 'Query Failed';
        }
    }
}

module.exports = functions;