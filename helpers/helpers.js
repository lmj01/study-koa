const bcrypt = require('bcryptjs');
const logger = require('../middlewares/logger');

const helpers = {};

helpers.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
}

helpers.matchPassword = async (password, savedPassword) => {
    try {
        return await bcrypt.compare(password, savedPassword);
    } catch(e) {
        logger.error('valid password error ', e);
    }
}

module.exports = helpers;