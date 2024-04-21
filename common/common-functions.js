const sql = require("../connection/sql_combine");
const crypto = require('crypto');

const randomStr = (length) => {
    const buffer = crypto.randomBytes(Math.ceil(length / 2));
    return buffer.toString('hex').slice(0, length);
}

const obj_not_empty = (obj) => {
    for (key in obj) {
        if (obj[key] == "" || obj[key] == null || obj[key] == undefined) {
            return false;
        }
    }
    return true;
}

function dec2string(decimal, base, length = 6) {
    let string = '';

    const charSets = {
        64: '0123456789AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz()',
        32: '0123456789abcdefghijklmnopqrstuvwxyz',
        get default() {
            return this['64'];
        }
    };

    const charset = charSets[base] || charSets.default;

    if (!/^([0-9]{1,62})$/.test(decimal)) {
        throw new Error('Value must be a positive integer with < 50 digits');
    }

    do {
        const remainder = decimal % base;
        const char = charset.charAt(remainder);
        string = char + string;
        decimal = Math.floor((decimal - remainder) / base);
    } while (decimal > 0);

    return string.padStart(length, '0');
}

const generateUid = async (type) => {
    try {
        const res = await sql.select_assoc('repo_guid', 'type', type);
        const count = (res[0]?.count || 0) + 1;
        await sql.update('repo_guid', 'type', type, { count });
        return dec2string(count, 64);
    } catch (error) {
        throw new Error('No Data Found');
    }
};


class Cookies {
    /**
     * This function is used to set cookies on user Browser
     *
     * @param  Object  res is the response object of a request from express
     * @param  String  cookie_name is the name from which we will retrieve a cookie
     * @param  Any     value is the value for the cookie
     * @param  Integer expiry used to define when will the cookie will expire in ms ( 1000 = 1 second )
     * @return Boolean as response of the function.
     */
    set = (res, cookie_name = '', value = '', expiry = 604800000) => {
        if (!cookie_name) {
            return false;
        }
        res.cookie(cookie_name, value, {
            maxAge: expiry,
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            path: '/',
        });
        return true;
    }


    /**
     * This function is used to get cookies from user request (Browser)
     *
     * @param  Object  req is the request object from user browser
     * @param  string  cookie_name is the name from which we will retrieve a cookie
     * @return Any as response of the function.
     */
    get = (req, cookie_name = '') => {
        if (!cookie_name) {
            return '';
        }
        return req.cookies[cookie_name] ?? '';
    }

}



module.exports = {
    Cookies,
    randomStr, obj_not_empty, generateUid
}