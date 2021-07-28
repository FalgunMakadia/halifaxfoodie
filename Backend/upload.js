const path = require('path');
const express = require('express');
const app = express();

const {Storage} = require('@google-cloud/storage');

const fs = require('fs');

const storage = new Storage();

// bucket that stores uploaded file and triggers the cloud function
const bucket1 = 'recipe-files-data'
// bucket that stores the predicted data from cloud function
const bucket2 = 'recipe-prediction'

//initialise passport
//require('./config/passport')(passport);
//app.use(passport.initialize());
//app.use(passport.session());

//parse the body
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// Use Routes
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With,X-Auth-Token, Content-Type, Accept'
  );
  next();
});


app.post('/uploadrecipe', (req, res) => {
  console.log(req.body);
  // console.log(req.body.formData);

  // data should hold data from the uploaded file
  var data = "cheese pizza - dough, mozarella"
  var fileName = "recipe.txt" // filename of the uploaded file.txt
    
  fs.writeFileSync(fileName, data)

  const bucket = storage.bucket(bucket1)
  bucket.upload(fileName, (err, data) => {
      if(err) console.log(err)
      else console.log("File uploaded : ", data)
  })

  // fetch the output from bucket2 
  const fileGCP = storage.bucket(bucket2).file(fileName)
  let fileData
  const bucketDownload = async () =>{
    await fileGCP.download().then((data, err)=>{
      if(err) console.log("File download error : "+err);  
      else {
          console.log("FILE FOUND ON B2 : " + data);
          // return contents as response
          fileGCP.delete().then((data, err)=> {
            if(err) console.log("delete err")
            else console.log("FILE deleted")
          })
      }
    })
  }
  const asyncu = async () => {
    let flag = true;
    while(flag) {
      console.log("inside while")
      console.log("sleeping...")
      sleep(5000)
      await fileGCP.exists()
              .then(function(data) {
                  console.log("inside then")
                  const exists = data[0];
                  console.log("EXISTS ?? ", exists)
                  if(exists) {
                    bucketDownload()
                    flag = false;
                  }
              });
      
    }
  }
  asyncu()
  res.json({ msg: req.body.msg });
});
function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
