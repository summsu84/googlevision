/*
var express = require('express');
var router = express.Router();

/!* GET home page. *!/
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
*/
var express = require('express');
var router = express.Router();
var fs = require('fs');
var multiparty = require('multiparty');
var encode_module = require('../module/ecoding-module');
var vision_module = require('../module/vision-module');


router.route('/')
    .get(function(req, res) {
      // Handlebars loading(layout:false means not to use "view/layout/default.hbs" file)
      // Handlebars 기본 레이아웃 사용시 views/layout/default.hbs파일을 로드하고 index.hbs에 "{{{body}}}" 추가 필요
      // res.render('index', {
      //   layout: 'default'
      // });

      // Handlebars 기본 레이아웃 미사용시
      res.render('home', {
        layout: false
      });
    })
    .post(function(req, res) {
      res.send('POST!!');
    });

router.post('/upload', function(req, res){
    console.log(">>post request");

    var form = new multiparty.Form();
    var filename;
    var options =
    {
        landmark : false,
        labels : false,
        web : false,
        text : false,
        document : false,
        properties : false,
        safesearch : false
    }
    // get field name & value

    form.on('field',function(name,value){

        console.log('normal field / name = '+name+' , value = '+value);
        if(value == 'Landmarks')
            options.landmark = true;
        else if(value == 'Labels')
            options.label = true;
        else if(value == 'Web')
            options.web = true;
        else if(value == 'Text')
            options.text = true;
        else if(value == 'Document')
            options.document = true;
        else if(value == 'Properties')
            options.properties = true;
        else if(value == 'SafeSearch')
            options.safesearch = true;

        if (/^http/.test(value)) {
            filename = value;
            console.log("HTTP URL File Write Streaming file :"+filename);
        }
    });



    // file upload handling

    form.on('part',function(part){
        //var filename;
        var size;
        var isFile = true;
        if (part.filename) {
            filename = part.filename;
            size = part.byteCount;
        }else{
            part.resume();
            isFile = false;
       }

       if(isFile) {
           console.log("Local File Write Streaming file :" + filename);
           //var writeStream = fs.createWriteStream(__dirname + '/tmp/'+filename);
           //test
           var writeStream = fs.createWriteStream(__dirname + '/../public/images/' + filename);
           writeStream.filename = filename;
           part.pipe(writeStream);
           part.on('data', function (chunk) {
               console.log(filename + ' read ' + chunk.length + 'bytes');
           });

           part.on('end', function () {

               console.log(filename + ' Part read complete');

               writeStream.end();

               //json 파일로 엔코딩한다.

           });
       }
    });



    // all uploads are completed

    form.on('close',function(){

        //var encodedString = encode_module.getEncodedString(__dirname + '/tmp/'+filename);
        var visioinImgUrl;
        if (/^http/.test(filename)) {
            visioinImgUrl = filename;
        }else
        {
            visioinImgUrl = __dirname + '/../public/images/'+filename
        }

        vision_module.processVisionModule(options, visioinImgUrl, function(resultObjectList) {
        //vision_module.processVisionModule(options, 'https://storagewithsummsu.blob.core.windows.net/airport/jeju.png', function(resultObjectList) {
            console.log(">>>resultObjectList : " + resultObjectList);
/*            res.status(200).render('result', {
                layout: false,
                face : resultObjectList[0],
                label : resultObjectList[1],
                originImgUrl : '/images/' + filename
            });*/

            var imgUrl;
            if (/^http/.test(filename)) {
                imgUrl = filename;
            }else
            {
                imgUrl = '/images/' + filename;
            }

            res.status(200).json( {
             layout: false,
             face : resultObjectList[0],
             label : resultObjectList[1],
             originImgUrl : imgUrl,
                results : resultObjectList
             });
            res.end();
        });
        //vision_module.detectFaces(__dirname + '/tmp/'+filename);

        var californiapeople = {
            people: [
                {"name":"Adams","first":"Ansel","profession":"photographer",
        "born"       :"SanFrancisco"},
        {"name":"Muir","first":"John","profession":"naturalist",
            "born":"Scotland"},
        {"name":"Schwarzenegger","first":"Arnold",
            "profession":"governator","born":"Germany"},
        {"name":"Wellens","first":"Paul","profession":"author",
            "born":"Belgium"}
        ]   };

/*        res.status(200).render('result', {
            layout: false,
            people : californiapeople.people,
            originImgUrl : '/images/' + filename
        });*/
       // res.render('result', californiapeople);
        //res.status(200).send('Upload complete');

    });



    // track progress

    form.on('progress',function(byteRead,byteExpected){

        console.log(' Reading total  '+byteRead+'/'+byteExpected);

    });



    form.parse(req);



    /*fs.readFile(req.files.uploadFile.path, function(err, data) {

        var filePath = __dirname + "\\files\\" + req.files.uploadFile.name;
        fs.writeFile(filePath, data, function(error){
            if(error){
                throw error;
            }else
            {
                console.log(">>success");
            }
        })

        // the data is passed to the callback in the second argument
        console.log(data);
    });*/


});



router.post('/upload2', function(req, res) {
    console.log(">>upload2 post request");

    var californiapeople = {
        people: [
            {"name":"Adams","first":"Ansel","profession":"photographer",
                "born"       :"SanFrancisco"},
            {"name":"Muir","first":"John","profession":"naturalist",
                "born":"Scotland"},
            {"name":"Schwarzenegger","first":"Arnold",
                "profession":"governator","born":"Germany"},
            {"name":"Wellens","first":"Paul","profession":"author",
                "born":"Belgium"}
        ]   };

    res.status(200).render('home', {layout:false, people : californiapeople});

    /*res.status(200).render('result', {
     layout: false,
     people : californiapeople.people,
     originImgUrl : '/images/' + filename
     });*/

});


module.exports = router;