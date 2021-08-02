const express = require('express');
const fs = require('fs');
const cors = require('cors');
const { Storage } = require('@google-cloud/storage');

const app = express();
const storage = new Storage();

// bucket that stores uploaded file and triggers the cloud function
const bucket1 = 'recipe-datafiles';
// bucket that stores the predicted data from cloud function
const bucket2 = 'output-prediction';

//parse the body
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
// Use Routes
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With,X-Auth-Token, Content-Type, Accept'
  );
  next();
});

app.post('/uploadrestaurant', (req, res) => {
  var restaurant = req.body.text;
  console.log(req.body);
  const storage = new Storage();
  const reportsBucketName = 'reports-foodie';
  const fileName = 'report.csv';
  const fileGCP = storage.bucket(reportsBucket).file(fileName);

  fileGCP.download().then((data, err) => {
    if (err) console.log('File download error : ' + err);
    else {
      console.log('FILE FOUND for reports : ' + data);
      let newData = data + '\n' + restaurant;
      fs.writeFileSync(fileName, newData);
      const reportsBucket = storage.bucket(reportsBucketName);
      reportsBucket.upload(fileName, (err, data) => {
        if (err) console.log(err);
        else {
          console.log('Report uploaded : ', data);
          res.json({ output: 'Report updated' });
        }
      });
    }
  });
});

app.post('/uploadrecipe', (req, res) => {
  console.log(req.body);

  // user entered input data
  var data = req.body.text;
  var fileName = 'recipe.txt'; // filename of the uploaded file.txt

  fs.writeFileSync(fileName, data);

  const bucket = storage.bucket(bucket1);

  // fetch the output from bucket2
  const fileGCP = storage.bucket(bucket2).file(fileName);
  let fileData;

  // function to download output file from bucket2
  const bucketDownload = async () => {
    await fileGCP.download().then((data, err) => {
      if (err) console.log('File Download Error : ' + err);
      else {
        console.log('FILE FOUND ON B2 : ' + data);
        // return contents as response
        res.json({ output: data.toString() });

        // delete the file from bucket2
        fileGCP.delete().then((data, err) => {
          if (err) console.log('File Delete Error : ', err);
          else {
            console.log('FILE deleted : ', data);
          }
        });
      }
    });
  };

  // function to keep checking the bucket2 at certain intervals for output file
  const checkForOutput = async () => {
    let flag = true;
    while (flag) {
      console.log('inside while');
      console.log('sleeping...');
      sleep(5000);
      await fileGCP.exists().then(function (data) {
        console.log('inside then');
        const exists = data[0];
        console.log('EXISTS ?? ', exists);
        if (exists) {
          bucketDownload();
          flag = false;
        }
      });
    }
  };

  // function to upload the user input to bucket1
  bucket.upload(fileName, (err, data) => {
    if (err) console.log(err);
    else {
      console.log('File uploaded : ', data);
      checkForOutput();
    }
  });
});

const sleep = (timeInms) => {
  const date = Date.now();
  let currentDate = Date.now();
  while (currentDate - date < timeInms)
      currentDate = Date.now();
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));