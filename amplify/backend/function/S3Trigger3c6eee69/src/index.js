const AWS = require('aws-sdk');
const rek = new AWS.Rekognition();

exports.handler = async function (event, context) { //eslint-disable-line
  console.log('Received S3 event:', JSON.stringify(event, null, 2));
  // Get the object from the event and show its content type
  const bucket = event.Records[0].s3.bucket.name; //eslint-disable-line
  const key = event.Records[0].s3.object.key; //eslint-disable-line
  console.log(`Bucket: ${bucket}`, `Key: ${key}`);

  const params = {
    Image: {
      S3Object: {
        Bucket: bucket,
        Name: key,
      },
    },
    MaxLabels: 100,
    MinConfidence: 10,
  }

  try {
    const data = await rek.detectLabels(params).promise();
    console.log("Labels:", data.Labels);
    context.done(null, 'Successfully processed S3 event'); // SUCCESS with message
  } catch (err) {
    console.log(err);
    console.log('Cannot recognize image');
    context.done(null, 'Successfully processed S3 event'); // SUCCESS with message
  }
};
