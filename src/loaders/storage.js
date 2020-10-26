const { Storage } = require('@google-cloud/storage');
const path = require('path');

module.exports = () => {
    return new Promise(async (resolve, reject) => {
        const storage = new Storage();
        const bucket = storage.bucket(process.env.STORAGE_BUCKET);

        bucket.getMetadata()
            .then(() => {
                console.log('Bucket loaded');
                resolve(bucket);
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            });
        // const res = await bucket.upload(path.join(__dirname, '../../Untitled.jpg'), {
        //     gzip: true,
        //     metadata: {
        //         cacheControl: 'public, max-age=31536000',
        //     }
        // });

        // await bucket.file('Untitled.jpg').makePublic();
        // console.log('Bucket loaded ', res[0].metadata.mediaLink);
        // res[0].metadata.name
        // resolve(bucket);
    });
}