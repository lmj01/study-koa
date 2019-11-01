const fs = require('fs');

module.exports = (folder) => {
    try {
        fs.accessSync(folder);
    } catch(e) {
        fs.mkdirSync(folder);
    }
}
