const dummyData = require("./dummy.json");

async function getById(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (id >= 1 && id <= 1000) {
                resolve(dummyData[id - 1]);
            } else {
                reject("Sorry. This id cannot be found.");
            }
        }, 5000);
    });
}

module.exports = {
    getById
}