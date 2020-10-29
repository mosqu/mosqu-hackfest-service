const { Storage } = require('@google-cloud/storage');
const path = require('path');

module.exports = () => {
    return new Promise(async (resolve, reject) => {
        const storage = new Storage();
        const bucket = storage.bucket(process.env.STORAGE_BUCKET);

        bucket.getMetadata()
            .then(() => {
                console.log('Bucket successfully loaded');
                resolve(bucket);
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            });
    });
}