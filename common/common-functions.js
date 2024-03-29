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
module.exports = {
    randomStr,obj_not_empty
}