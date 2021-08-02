exports.helloGCS = (event, context) => {

  const {Storage} = require('@google-cloud/storage')
  const automl = require('@google-cloud/automl')
  const fs = require('fs')

  const storage = new Storage()

  let bucketName = event.bucket
  let fileName = event.name
  
  console.log("Bucket trigger : " + bucketName)
  console.log("Received file : " + fileName)

  const fileGCP = storage.bucket(bucketName).file(fileName)
  var fileData
  fileGCP.download(function(err, contents) {
        if(err) console.log("File download error : "+err)
        else {
            console.log("FILE CONTENT : "+contents)
            fileData = new Buffer.from(contents).toString()
        }

        predictFunction(fileData)
         .then( (output) => {
            console.log("OUPUT received : ",output)

            let fileTmpPath = '/tmp/'+fileName

            fs.writeFileSync(fileTmpPath, output)
            console.log("SUCESSFULY written to Cloud Function tmp")

            // let newData = fs.readFileSync(fileTmpPath)
            // console.log("SUCCESSFULLY READ FROM Cloud Function tmp : "+newData)

            const bucket = storage.bucket('output-prediction')

            bucket.upload(fileTmpPath, (err, data) => {
                if(err) console.log(err)
                else { 
                    console.log("File uploaded to BUCKET2")
                    if(fs.existsSync(fileTmpPath)) console.log("PRESENT")
                    fs.unlinkSync(fileTmpPath)
                    if(!fs.existsSync(fileTmpPath)) console.log("DELETED")
                    console.log('File deleted FROM TMP')
                }
            })
         });  
    });
};

const predictFunction = async (fileData) => {

    const projectId = 'csci5408-a2p2'
    const location = 'us-central1'
    const modelId = 'TCN1289320320078970880'
    const content = fileData;
    console.log(fileData);

    // Imports the Google Cloud AutoML library
    const {PredictionServiceClient} = require('@google-cloud/automl').v1
    console.log('Predictservice client loaded...')
    // Instantiates a client
    const client = new PredictionServiceClient()
    console.log('Predictservice client object created...')
    

    async function predict() {
        // Construct request
        const request = {
            name: client.modelPath(projectId, location, modelId),
            payload: {
                textSnippet: {
                    content: content,
                    mimeType: 'text/plain'
                }
            }
        }

        const [response] = await client.predict(request);
        console.log('Response object Received');
        const predictionMap = new Map();
        var max=0;
        var predictedClass = "";

        for (const annotationPayload of response.payload) {
            let className = annotationPayload.displayName
            let classScore = annotationPayload.classification.score
            console.log("Predicted class name: " + className);
            console.log("Predicted class score: " + classScore);
            predictionMap.set(className,classScore);

            if(classScore > max) {
                max = classScore;
                predictedClass = className;
            }
        }
        const fileToSend = JSON.stringify(mapToObj(predictionMap))
        console.log("Predicted CLASS : ", predictedClass);
        console.log('Returning fileTosend : ', fileToSend);
        return fileToSend
    }
    let fileReturn = await predict();
    console.log('Predict called and Output : ', fileReturn);
    return fileReturn
}

function mapToObj(map) {
    let obj = Object.create(null);
    for (let [k,v] of map) {
        obj[k] = v;
    }
    return obj;
}

process.on('unhandledRejection', err => {
    console.log('Prediction Error - Could not handle Rejection');
    console.error(err.message);
    process.exitCode = 1;
});
