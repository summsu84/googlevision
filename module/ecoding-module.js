/**
 * Created by JJW on 2017-06-21.
 */
// Read the file into memory.
var fs = require('fs');

exports.getEncodedString = function(imagePath) {


    var imageFile = fs.readFileSync(imagePath);

// Covert the image data to a Buffer and base64 encode it.
    var encoded = new Buffer(imageFile).toString('base64');


    return encoded;
}





