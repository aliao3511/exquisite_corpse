const AWS = require('aws-sdk');
const { ID, SECRET, BUCKET_NAME_PRO } = require('./config/aws');

const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET
});

const params = {
    Bucket: BUCKET_NAME_PRO,
    CreateBucketConfiguration: {
        LocationConstraint: 'ap-northeast-1'
    }
};

s3.createBucket(params, (err, data) => {
    if (err) console.log(err, err.stack);
    else console.log('bucket created!', data.Location);
});
