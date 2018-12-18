/**
 * Created by JJW on 2017-06-21.
 */


function detectFaces (fileName, resolve, rejceted) {
    // [START vision_face_detection]
    // Imports the Google Cloud client library
    const Vision = require('@google-cloud/vision');

    // Instantiates a client
    const vision = Vision();

    // The path to the local image file, e.g. "/path/to/image.png"
    // const fileName = '/path/to/image.png';

    // Performs face detection on the local file
    vision.detectFaces(fileName)
        .then((results) => {
        const faces = results[0];

        console.log('Faces:');
        faces.forEach((face, i) => {
            console.log(`  Face #${i + 1}:`);
        console.log(`    Joy: ${face.joy}`);
        console.log(`    Anger: ${face.anger}`);
        console.log(`    Sorrow: ${face.sorrow}`);
        console.log(`    Surprise: ${face.surprise}`);

    });
            resolve(faces);
}
)
.catch((err) => {
        console.error('ERROR:', err);
});
    // [END vision_face_detection]
}

function detectLabels (fileName, resolved, rejected) {
    // [START vision_label_detection]
    // Imports the Google Cloud client library
    const Vision = require('@google-cloud/vision');

    // Instantiates a client
    const vision = Vision();

    // The path to the local image file, e.g. "/path/to/image.png"
    // const fileName = '/path/to/image.png';

    // Performs label detection on the local file
    vision.detectLabels(fileName)
        .then((results) => {
            const labels = results[0];

            console.log('Labels:');
            labels.forEach((label) => console.log(label));
            resolved(labels);
        })
        .catch((err) => {
            console.error('ERROR:', err);
            rejected(err);
        });
    // [END vision_label_detection]
}

function detectLandmarks (fileName) {
    // [START vision_landmark_detection]
    // Imports the Google Cloud client library
    const Vision = require('@google-cloud/vision');

    // Instantiates a client
    const vision = Vision();

    // The path to the local image file, e.g. "/path/to/image.png"
    // const fileName = '/path/to/image.png';

    // Performs landmark detection on the local file
    vision.detectLandmarks(fileName)
        .then((results) => {
            const landmarks = results[0];

            console.log('Landmarks:');
            landmarks.forEach((landmark) => console.log(landmark));
            //callback(landmarks);
        })
        .catch((err) => {
            console.error('ERROR:', err);
        });
    // [END vision_landmark_detection]
}



function detectLandmarksGCS (bucketName, fileName) {
    // [START vision_landmark_detection_gcs]
    // Imports the Google Cloud client libraries
    const Storage = require('@google-cloud/storage');
    const Vision = require('@google-cloud/vision');

    // Instantiates clients
    const storage = Storage();
    const vision = Vision();

    // The name of the bucket where the file resides, e.g. "my-bucket"
    // const bucketName = 'my-bucket';

    // The path to the file within the bucket, e.g. "path/to/image.png"
    // const fileName = 'path/to/image.png';

    // Performs landmark detection on the remote file
    vision.detectLandmarks(storage.bucket(bucketName).file(fileName))
        .then((results) => {
            const landmarks = results[0];

            console.log('Landmarks:');
            landmarks.forEach((landmark) => console.log(landmark));
        })
        .catch((err) => {
            console.error('ERROR:', err);
        });
    // [END vision_landmark_detection_gcs]
}

//function detectText (fileName) {      //원래 소스
function detectText (fileName, resolve, rejected) {
    // [START vision_text_detection]
    // Imports the Google Cloud client library
    const Vision = require('@google-cloud/vision');

    // Instantiates a client
    const vision = Vision();

    // The path to the local image file, e.g. "/path/to/image.png"
    // const fileName = '/path/to/image.png';

    // Performs text detection on the local file
    vision.detectText(fileName)
        .then((results) => {
            const detections = results[0];

            console.log('Text:');
            detections.forEach((text) => console.log(text));
            resolve(detections);
        })
        .catch((err) => {
            console.error('ERROR:', err);
            rejected(err);
        });
    // [END vision_text_detection]
}

function detectTextGCS (bucketName, fileName) {
    // [START vision_text_detection_gcs]
    // Imports the Google Cloud client libraries
    const Storage = require('@google-cloud/storage');
    const Vision = require('@google-cloud/vision');

    // Instantiates clients
    const storage = Storage();
    const vision = Vision();

    // The name of the bucket where the file resides, e.g. "my-bucket"
    // const bucketName = 'my-bucket';

    // The path to the file within the bucket, e.g. "path/to/image.png"
    // const fileName = 'path/to/image.png';

    // Performs text detection on the remote file
    vision.detectText(storage.bucket(bucketName).file(fileName))
        .then((results) => {
            const detections = results[0];

            console.log('Text:');
            detections.forEach((text) => console.log(text));
        })
        .catch((err) => {
            console.error('ERROR:', err);
        });
    // [END vision_text_detection_gcs]
}

function detectLogos (fileName,  resolve, rejected) {
    // [START vision_logo_detection]
    // Imports the Google Cloud client library
    const Vision = require('@google-cloud/vision');

    // Instantiates a client
    const vision = Vision();

    // The path to the local image file, e.g. "/path/to/image.png"
    // const fileName = '/path/to/image.png';

    // Performs logo detection on the local file
    vision.detectLogos(fileName)
        .then((results) => {
            const logos = results[0];

            console.log('Logos:');
            logos.forEach((logo) => console.log(logo));

            resolve(logos);
        })
        .catch((err) => {
            console.error('ERROR:', err);
            rejected(err);
        });
    // [END vision_logo_detection]
}

function detectLogosGCS (bucketName, fileName) {
    // [START vision_logo_detection_gcs]
    // Imports the Google Cloud client libraries
    const Storage = require('@google-cloud/storage');
    const Vision = require('@google-cloud/vision');

    // Instantiates clients
    const storage = Storage();
    const vision = Vision();

    // The name of the bucket where the file resides, e.g. "my-bucket"
    // const bucketName = 'my-bucket';

    // The path to the file within the bucket, e.g. "path/to/image.png"
    // const fileName = 'path/to/image.png';

    // Performs logo detection on the remote file
    vision.detectLogos(storage.bucket(bucketName).file(fileName))
        .then((results) => {
            const logos = results[0];

            console.log('Logos:');
            logos.forEach((logo) => console.log(logo));
        })
        .catch((err) => {
            console.error('ERROR:', err);
        });
    // [END vision_logo_detection_gcs]
}

function detectProperties (fileName, resolve, rejected) {
    // [START vision_image_property_detection]
    // Imports the Google Cloud client library
    const Vision = require('@google-cloud/vision');

    // Instantiates a client
    const vision = Vision();

    // The path to the local image file, e.g. "/path/to/image.png"
    // const fileName = '/path/to/image.png';

    // Performs image property detection on the local file
    vision.detectProperties(fileName)
        .then((results) => {
            const properties = results[0];

            console.log('Colors:');
            properties.colors.forEach((color) => console.log(color));
            resolve(properties);
        })
        .catch((err) => {
            console.error('ERROR:', err);
            rejected(err);
        });
    // [END vision_image_property_detection]
}

function detectPropertiesGCS (bucketName, fileName) {
    // [START vision_image_property_detection_gcs]
    // Imports the Google Cloud client libraries
    const Storage = require('@google-cloud/storage');
    const Vision = require('@google-cloud/vision');

    // Instantiates clients
    const storage = Storage();
    const vision = Vision();

    // The name of the bucket where the file resides, e.g. "my-bucket"
    // const bucketName = 'my-bucket';

    // The path to the file within the bucket, e.g. "path/to/image.png"
    // const fileName = 'path/to/image.png';

    // Performs image property detection on the remote file
    vision.detectProperties(storage.bucket(bucketName).file(fileName))
        .then((results) => {
            const properties = results[0];

            console.log('Colors:');
            properties.colors.forEach((color) => console.log(color));
        })
        .catch((err) => {
            console.error('ERROR:', err);
        });
    // [END vision_image_property_detection_gcs]
}

function detectSafeSearch (fileName, resolve, rejected) {
    // [START vision_safe_search_detection]
    // Imports the Google Cloud client library
    const Vision = require('@google-cloud/vision');

    // Instantiates a client
    const vision = Vision();

    // The path to the local image file, e.g. "/path/to/image.png"
    // const fileName = '/path/to/image.png';

    // Performs safe search property detection on the local file
    vision.detectSafeSearch(fileName)
        .then((results) => {
            //const detections = results[0];
            const detections = results[1].responses[0].safeSearchAnnotation;

            console.log(`Adult: ${detections.adult}`);
            console.log(`Spoof: ${detections.spoof}`);
            console.log(`Medical: ${detections.medical}`);
            console.log(`Violence: ${detections.violence}`);

            resolve(detections);
        })
        .catch((err) => {
            console.error('ERROR:', err);
            rejected(err);
        });
    // [END vision_safe_search_detection]
}

function detectSafeSearchGCS (bucketName, fileName) {
    // [START vision_safe_search_detection_gcs]
    // Imports the Google Cloud client libraries
    const Storage = require('@google-cloud/storage');
    const Vision = require('@google-cloud/vision');

    // Instantiates clients
    const storage = Storage();
    const vision = Vision();

    // The name of the bucket where the file resides, e.g. "my-bucket"
    // const bucketName = 'my-bucket';

    // The path to the file within the bucket, e.g. "path/to/image.png"
    // const fileName = 'path/to/image.png';

    // Performs safe search property detection on the remote file
    vision.detectSafeSearch(storage.bucket(bucketName).file(fileName))
        .then((results) => {
            const detections = results[0];

            console.log(`Adult: ${detections.adult}`);
            console.log(`Spoof: ${detections.spoof}`);
            console.log(`Medical: ${detections.medical}`);
            console.log(`Violence: ${detections.violence}`);
        })
        .catch((err) => {
            console.error('ERROR:', err);
        });
    // [END vision_safe_search_detection_gcs]
}

function detectCropHints (fileName, resolve, rejected) {
    // [START vision_crop_hint_detection]

    // Imports the Google Cloud client library
    const Vision = require('@google-cloud/vision');

    // Instantiates a client
    const vision = Vision();

    // The path to the local image file, e.g. "/path/to/image.png"
    // const fileName = 'my-file.jpg';

    // Find crop hints for the local file
    vision.detectCrops(fileName)
        .then((results) => {
            const cropHints = results[0];

            cropHints.forEach((hintBounds, hintIdx) => {
                console.log(`Crop Hint ${hintIdx}:`);
                hintBounds.forEach((bound, boundIdx) => {
                    console.log(`  Bound ${boundIdx}: (${bound.x}, ${bound.y})`);
                });
            });

            resolve(cropHints);
        })
        .catch((err) => {
            console.error('ERROR:', err);
            rejected(err);
        });
    // [END vision_crop_hint_detection]
}

function detectCropHintsGCS (bucketName, fileName) {
    // [START vision_crop_hint_detection_gcs]

    // Imports the Google Cloud client libraries
    const Storage = require('@google-cloud/storage');
    const Vision = require('@google-cloud/vision');

    // Instantiates clients
    const storage = Storage();
    const vision = Vision();

    // The name of the bucket where the file resides, e.g. "my-bucket"
    // const bucketName = 'my-bucket';

    // The path to the file within the bucket, e.g. "path/to/image.png"
    // const fileName = 'my-file.jpg';

    // Find crop hints for the remote file
    vision.detectCrops(storage.bucket(bucketName).file(fileName))
        .then((results) => {
            const cropHints = results[0];

            cropHints.forEach((hintBounds, hintIdx) => {
                console.log(`Crop Hint ${hintIdx}:`);
                hintBounds.forEach((bound, boundIdx) => {
                    console.log(`  Bound ${boundIdx}: (${bound.x}, ${bound.y})`);
                });
            });
        })
        .catch((err) => {
            console.error('ERROR:', err);
        });
    // [END vision_crop_hint_detection_gcs]
}

function detectWeb (fileName, resolve, rejected) {
    // [START vision_web_detection]

    // Imports the Google Cloud client library
    const Vision = require('@google-cloud/vision');

    // Instantiates a client
    const vision = Vision();

    // The path to the local image file, e.g. "/path/to/image.png"
    // const fileName = 'my-file.jpg';

    // Detect similar images on the web to a local file
    vision.detectSimilar(fileName)
        .then((results) => {
            const webDetection = results[1].responses[0].webDetection;

            if (webDetection.fullMatchingImages.length) {
                console.log(`Full matches found: ${webDetection.fullMatchingImages.length}`);
                webDetection.fullMatchingImages.forEach((image) => {
                    console.log(`  URL: ${image.url}`);
                    console.log(`  Score: ${image.score}`);
                });
            }

            if (webDetection.partialMatchingImages.length) {
                console.log(`Partial matches found: ${webDetection.partialMatchingImages.length}`);
                webDetection.partialMatchingImages.forEach((image) => {
                    console.log(`  URL: ${image.url}`);
                    console.log(`  Score: ${image.score}`);
                });
            }

            if (webDetection.webEntities.length) {
                console.log(`Web entities found: ${webDetection.webEntities.length}`);
                webDetection.webEntities.forEach((webEntity) => {
                    console.log(`  Description: ${webEntity.description}`);
                    console.log(`  Score: ${webEntity.score}`);
                });
            }

            resolve(webDetection);
        })
        .catch((err) => {
            console.error('ERROR:', err);
            rejected(err);
        });
    // [END vision_web_detection]
}

function detectWebGCS (bucketName, fileName) {
    // [START vision_web_detection_gcs]

    // Imports the Google Cloud client libraries
    const Storage = require('@google-cloud/storage');
    const Vision = require('@google-cloud/vision');

    // Instantiates clients
    const storage = Storage();
    const vision = Vision();

    // The name of the bucket where the file resides, e.g. "my-bucket"
    // const bucketName = 'my-bucket';

    // The path to the file within the bucket, e.g. "path/to/image.png"
    // const fileName = 'my-file.jpg';

    // Detect similar images on the web to a remote file
    vision.detectSimilar(storage.bucket(bucketName).file(fileName))
        .then((results) => {
            const webDetection = results[1].responses[0].webDetection;

            if (webDetection.fullMatchingImages.length) {
                console.log(`Full matches found: ${webDetection.fullMatchingImages.length}`);
                webDetection.fullMatchingImages.forEach((image) => {
                    console.log(`  URL: ${image.url}`);
                    console.log(`  Score: ${image.score}`);
                });
            }

            if (webDetection.partialMatchingImages.length) {
                console.log(`Partial matches found: ${webDetection.partialMatchingImages.length}`);
                webDetection.partialMatchingImages.forEach((image) => {
                    console.log(`  URL: ${image.url}`);
                    console.log(`  Score: ${image.score}`);
                });
            }

            if (webDetection.webEntities.length) {
                console.log(`Web entities found: ${webDetection.webEntities.length}`);
                webDetection.webEntities.forEach((webEntity) => {
                    console.log(`  Description: ${webEntity.description}`);
                    console.log(`  Score: ${webEntity.score}`);
                });
            }
        })
        .catch((err) => {
            console.error('ERROR:', err);
        });
    // [END vision_web_detection_gcs]
}

function detectFulltext (fileName) {
    // [START vision_fulltext_detection]

    // Imports the Google Cloud client library
    const Vision = require('@google-cloud/vision');

    // Instantiates a client
    const vision = Vision();

    // The path to the local image file, e.g. "/path/to/image.png"
    // const fileName = 'my-file.jpg';

    // Read a local image as a text document
    vision.readDocument(fileName)
        .then((results) => {
            const fullTextAnnotation = results[1].responses[0].fullTextAnnotation;
            console.log(fullTextAnnotation.text);
        })
        .catch((err) => {
            console.error('ERROR:', err);
        });
    // [END vision_fulltext_detection]
}

function detectFulltextGCS (bucketName, fileName) {
    // [START vision_fulltext_detection_gcs]

    // Imports the Google Cloud client libraries
    const Storage = require('@google-cloud/storage');
    const Vision = require('@google-cloud/vision');

    // Instantiates clients
    const storage = Storage();
    const vision = Vision();

    // The name of the bucket where the file resides, e.g. "my-bucket"
    // const bucketName = 'my-bucket';

    // The path to the file within the bucket, e.g. "path/to/image.png"
    // const fileName = 'my-file.jpg';

    // Read a remote image as a text document
    vision.readDocument(storage.bucket(bucketName).file(fileName))
        .then((results) => {
            const fullTextAnnotation = results[1].responses[0].fullTextAnnotation;
            console.log(fullTextAnnotation.text);
        })
        .catch((err) => {
            console.error('ERROR:', err);
        });
    // [END vision_fulltext_detection_gcs]
}


function processVisionModule(options, filePath, callback)
{

    var resObjArray = new Array();

    //landmark 옵션 체크
/*    if(options.landmark == true)
    {
        //detectLandmarksGCS("boxwood-ward-6535", filePath);
        detectLandmarks(filePath, function(landmarkName){
            var landmarksObj =
            {
                'name' : 'landmark',
                'result' : landmarkName
            }
            resObjArray.push(landmarksObj);
            callback(resObjArray);
        });

    }*/
    //
    console.log(">>file Path : " + filePath);
    /*detectFacePromise(filePath)
        .then(detectTextPromise(filePath)
            .then(function(result){
                console.log(">>>sucess...");
            })).catch(function(error){

    })
        .catch(function(error)
        {
        })
);
})*/
    detectFacePromise(filePath)
        .then(function(result){
            console.log(">>>>detectFacePromise success ... result : " + result);

            //Face Detection 작업하기
            var faceRestArray = new Array();

            result.forEach((face, i) => {
                var category = `  Face #${i + 1}:`;
                var joy = `    Joy: ${face.joy}`;
                var anger = `    Anger: ${face.anger}`;
                var sorrow = `    Sorrow: ${face.sorrow}`;
                var surprise = `    Surprise: ${face.surprise}`;
                var faceObj =
                {
                    name : category,
                    detectList : [joy, anger, sorrow, surprise],
                    result : face
                }
                faceRestArray.push(faceObj);
            });

            var obj =
            {
                name : "FaceDetection",
                result : faceRestArray
            }
            resObjArray.push(obj);
            detectLabelPromise(filePath)
                .then(function(result){
                    console.log(">>>>detectTextPromise success ... result : " + result);
                    var obj =
                    {
                        name : "LabelDetection",
                        result : result
                    }
                    resObjArray.push(obj);
                    //text
                    detectTextPromise(filePath)
                        .then(function(result){
                            var obj =
                            {
                                name : "TextDetection",
                                result : result
                            }
                            resObjArray.push(obj);
                            detectLogoPromise(filePath)
                                .then(function(result){
                                    var obj =
                                    {
                                        name : "LogoDetection",
                                        result : result
                                    }
                                    resObjArray.push(obj);

                                    detectPropertiesPromise(filePath)
                                        .then(function(result){
                                            var obj =
                                            {
                                                name : "PropertiesDetection",
                                                result : result
                                            }
                                            resObjArray.push(obj);

                                            detectSafeSearchPromise(filePath)
                                                .then(function(result){

                                                    var obj =
                                                    {
                                                        name : "SafeSearchDetection",
                                                        result : result
                                                    }
                                                    resObjArray.push(obj);

                                                    detectCrophintsPromise(filePath)
                                                        .then(function(result){

                                                            var obj =
                                                            {
                                                                name : "CropHintsDetection",
                                                                result : result
                                                            }
                                                            resObjArray.push(obj);


                                                            detectWebPromise(filePath)
                                                                .then(function(result){

                                                                    var obj =
                                                                    {
                                                                        name : "WebDetection",
                                                                        result : result
                                                                    }
                                                                    resObjArray.push(obj);
                                                                    callback(resObjArray);

                                                                })
                                                                .catch(function(error){

                                                                })
                                                        })
                                                        .catch(function(error){

                                                        })

                                                })
                                                .catch(function(error){

                                                })
                                        })
                                        .catch(function(error){

                                        })
                                })
                                .catch(function(error){

                                })
                        })
                        .catch(function(error){

                        })
                    //callback(resObjArray);
                })
                .catch(function(error)
                {
                    console.log(">>>>detectTextPromise Failed ... error : " + error);
                })
        })
        .catch(function (error)
        {
            console.log(">>>>detectFacePromise Failed ... error : " + error);
        })

}

function detectFacePromise(filePath)
{
    return new Promise(function(resolve, rejected) {
        detectFaces(filePath, resolve, rejected);
    });
}

function detectLabelPromise(filePath)
{
    return new Promise(function(resolve, rejected){
        detectLabels(filePath, resolve, rejected);
    });
}

function detectTextPromise(filePath)
{
    return new Promise(function(resolve, rejected){
        detectText(filePath, resolve, rejected);
    });
}

function detectLogoPromise(filePath)
{
    return new Promise(function(resolve, rejected){
        detectLogos(filePath, resolve, rejected);
    });
}

function detectPropertiesPromise(filePath)
{
    return new Promise(function(resolve, rejected){
        detectProperties(filePath, resolve, rejected);
    });
}

function detectSafeSearchPromise(filePath)
{
    return new Promise(function(resolve, rejected){
        detectSafeSearch(filePath, resolve, rejected);
    });
}

function detectCrophintsPromise(filePath)
{
    return new Promise(function(resolve, rejected){
        detectCropHints(filePath, resolve, rejected);
    });
}

function detectWebPromise(filePath)
{
    return new Promise(function(resolve, rejected){
        detectWeb(filePath, resolve, rejected);
    });
}

function detectFullTextPromise(filePath)
{
    return new Promise(function(resolve, rejected){
        detectLabels(filePath, resolve, rejected);
    });
}

exports.detectFaces = detectFaces;
exports.processVisionModule = processVisionModule;
