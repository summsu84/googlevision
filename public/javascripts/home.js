/**
 * Created by JJW on 2017-06-23.
 */
/**
 * Created by JJW on 2017-06-22.
 */
'use strict';

// The client-side "app" which leverages the shared Handlebars "echo" template.
// This will prompt the user for a message, then echo it out by rendering the
// message using the shared template which was exposed by the server.
(function () {
    console.log(">>>home js is loaded..");

/*    var canvasResult = document.getElementById('canvasResult');
    var imgResult = document.getElementById('imgResult');
    //drawing..
    var context = canvasResult.getContext('2d');
    context.drawImage(imgResult, 0, 0);

    context.moveTo(0, 0);
    context.lineTo(200, 100);
    context.stroke();*/

    var btnSend = document.getElementById('btnSend');
    var btnFile = document.getElementById('btnFile');
    var filePath = "";

    btnSend.addEventListener('click', function(e){
        console.log("btnFace clicked..");

        if(!checkImageValidation())
        {
            alert("파일을 선택하거나, URL 중 한개를 입력해주세요");
            return;
        }
        var loader = document.getElementById('loader');
        loader.style.display="block";
        loadBackgrund();
    });

    btnFile.addEventListener('change', function(e){
        //var filePath = this.value;
        filePath = this.value;
        console.log(">>>>>>filePath : " + filePath);
    });

    var testForm = document.getElementById('formData');

    testForm.onsubmit = function(event) {
        //clearInfo();
        event.preventDefault();
        var loader = document.getElementById('loader');
        loader.style.display="block";
        clearInfo();
        var request = new XMLHttpRequest();
        // POST to httpbin which returns the POST data as JSON
        request.open('POST', '/upload', /* async = */ false);
        var formData = new FormData(document.getElementById('formData'));

        request.onreadystatechange = function (aEvt) {
            if (req.readyState == 4) {
                if(req.status == 200)
                    alert(req.responseText);
                else
                    alert("Error loading page\n");
            }
        };

        request.send(formData);
        console.log(request.response);
        var dabaObj = JSON.parse(request.response);
        //process
       // imgResult.src = dabaObj.originImgUrl;
        //canvas size setting
        var canvasResult = document.getElementById('canvasResult');
        var imgResult = document.getElementById('imgResult');
        //imgResult.src = dabaObj.originImgUrl;
        //drawing..
//        var context = canvasResult.getContext('2d');
//        context.drawImage(imgResult, 0, 0);
        var img = new Image();
        img.onload = function() {
            loader.style.display="none";
            var resultDiv = document.getElementById('resultDiv');
            resultDiv.style.display="block";

            redraw(img, dabaObj);
            /*context.drawImage(img, 0, 0);
            //result Array
            var faceObj = dabaObj.face;
            for(var i in faceObj.result)
            {
                var faceResultList = faceObj.result[i];
                var faceObjectResultList = faceResultList.result;
                for(var j in faceObjectResultList)
                {
                    var faceInfo = faceObjectResultList[j];
                    var headBound = faceInfo.bounds.head;
                    //head부분 좌표 찾기
                    context.moveTo(0, 0);
                    var wonjum = {};
                    for (var k = 0; k < headBound.length; k++) {
                        var head = headBound[k];
                        if(k == 0)
                        {
                            wonjum = head;
                            context.moveTo(head.x, head.y);
                        }else {
                            context.lineTo(head.x, head.y);
                        }
                    }
                    //마지막 점에 연결
                    context.lineTo(wonjum.x, wonjum.y);
                    context.stroke();
                }
            }

            canvasResult.width = window.innerWidth;
            canvasResult.height = window.innerHeight;
            redraw();*/
        };
        img.src = dabaObj.originImgUrl;

        //탭에 정보 넣기
        //Face 정보
        var faceTable = document.getElementById('tblFace');
        //result Array
        var faceObj = dabaObj.face;
        var faceIdx = 0;
        for(var i in faceObj.result)
        {
            var faceResultList = faceObj.result[i];
            var row = faceTable.insertRow(faceIdx);
            var cell1 = row.insertCell(0);
            cell1.innerHTML = faceResultList.name;
            faceIdx++;
            for(var j in faceResultList.detectList)
            {
                var faceDetect = faceResultList.detectList[j];
                var row = faceTable.insertRow(faceIdx);
                var cell1 = row.insertCell(0);
                cell1.innerHTML = faceDetect;
                faceIdx++;
            }

        }
        //Label 정보
        //Face 정보
        var labelTable = document.getElementById('tblLabel');
        var labelIdx = 0;
        //result Array
        var labelObj = dabaObj.label;
        var row = labelTable.insertRow(labelIdx);
        var cell1 = row.insertCell(0);
        cell1.innerHTML = faceResultList.name;
        labelIdx++;
        for(var i in labelObj.result)
        {
            var label = labelObj.result[i];
            var row = labelTable.insertRow(labelIdx);
            var cell1 = row.insertCell(0);
            cell1.innerHTML = label;
            labelIdx++;
        }
    };

    //processLoading();

    var btnFace = document.getElementById('btnFace');
    var btnLabel = document.getElementById('btnLabel');
    var btnText = document.getElementById('btnText');
    var btnLogo = document.getElementById('btnLogo');
    var btnProperties = document.getElementById('btnProperties');
    var btnSafeSearch = document.getElementById('btnSafeSearch');
    var btnCropHints = document.getElementById('btnCropHints');
    var btnWeb = document.getElementById('btnWeb');

    btnFace.addEventListener('click', function(e){
        console.log("btnFace clicked..");
        openResult(event, 'divFace');
    });
    btnLabel.addEventListener('click', function(e){
        openResult(event, 'divLabel');
    });
    btnText.addEventListener('click', function(e){
        openResult(event, 'divText');
    });
    btnLogo.addEventListener('click', function(e){
        openResult(event, 'divLogo');
    });
    btnProperties.addEventListener('click', function(e){
        openResult(event, 'divProperties');
    });
    btnSafeSearch.addEventListener('click', function(e){
        openResult(event, 'divSafeSearch');
    });
    btnCropHints.addEventListener('click', function(e){
        openResult(event, 'divCropHints');
    });
    btnWeb.addEventListener('click', function(e){
        openResult(event, 'divWeb');
    });



    function openResult(evt, id) {
        // Declare all variables
        var i, tabcontent, tablinks;

        // Get all elements with class="tabcontent" and hide them
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }

        // Get all elements with class="tablinks" and remove the class "active"
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }

        // Show the current tab, and add an "active" class to the button that opened the tab
        document.getElementById(id).style.display = "block";
        //evt.currentTarget.className += " active";
        //document.getElementById(id).className = document.getElementById(id).className + " active";
        //var divFace = document.getElementById('divFace');
        //divFace.className = divFace.className + " active";
        console.log(id + " ClassName : " + document.getElementById(id).className);

    }



    function loadBackgrund() {

        //사진 정보를 가져오자..
/*        var filePath = document.getElemet


        Api.sendImagePath(filePath, function(result){

            //버튼 체크
            document.getElementById('Landmarks').checked = true;

        });*/

        clearInfo();
        var request = new XMLHttpRequest();
        // POST to httpbin which returns the POST data as JSON


        request.onreadystatechange = function (aEvt) {
            if (request.readyState == 4) {
                if(request.status == 200) {
                    //alert(request.responseText);
                    //console.log(request.response);
                    var dabaObj = JSON.parse(request.response);
                    //process
                    var canvasResult = document.getElementById('canvasResult');
                    var imgResult = document.getElementById('imgResult');

                    var img = new Image();
                    img.onload = function() {
                        var loader = document.getElementById('loader');
                        loader.style.display="none";
                        redraw(img, dabaObj);
                    };
                    img.src = dabaObj.originImgUrl;
                    //탭에 정보 넣기
                    processTabInfo(dabaObj);
                }
                else {
                    alert("Error loading page\n");
                }
            }
        };
        request.open('POST', '/upload', /* async = */ true);
        var formData = new FormData(document.getElementById('formData'));

        request.send(formData);


    }

    function processTabInfo(dabaObj)
    {
        /*var faceTable = document.getElementById('tblFace');
        //result Array
        var faceObj = dabaObj.face;
        var faceIdx = 0;
        for(var i in faceObj.result)
        {
            var faceResultList = faceObj.result[i];
            var row = faceTable.insertRow(faceIdx);
            var cell1 = row.insertCell(0);
            cell1.innerHTML = faceResultList.name;
            faceIdx++;
            for(var j in faceResultList.detectList)
            {
                var faceDetect = faceResultList.detectList[j];
                var row = faceTable.insertRow(faceIdx);
                var cell1 = row.insertCell(0);
                cell1.innerHTML = faceDetect;
                faceIdx++;
            }

        }*/
        //Label 정보
        //Face 정보
        var labelTable = document.getElementById('tblLabel');
        var labelIdx = 0;
        //result Array
        var labelObj = dabaObj.label;
/*        var row = labelTable.insertRow(labelIdx);
        var cell1 = row.insertCell(0);
        cell1.innerHTML = faceResultList.name;
        labelIdx++;*/
        for(var i in labelObj.result)
        {
            var label = labelObj.result[i];
            var row = labelTable.insertRow(labelIdx);
            var cell1 = row.insertCell(0);
            //라벨 검출은 웹 검색과 연동한다.
            var link = document.createElement('a');
            var href = 'https://www.google.com/search?q=' + label;
            link.href = href;
            link.target = '_blank';
            link.innerHTML = label;
            cell1.appendChild(link);
            /*cell1.innerHTML = label;*/
            labelIdx++;
        }

        var results = dabaObj.results;
        generateFaceDetection(results[0]);
        generateTextDetection(results[2])
        generateLogoDetection(results[3]);
        generatePropertiesDetection(results[4]);
        generateSafeSearchDetection(results[5]);
        generateCropHintsDetection(dabaObj.originImgUrl, results[6]);
        generateWebDetection(results[7]);


    }

    function generateFaceDetection(obj)
    {
        var faceTable = document.getElementById('tblFace');
        //result Array
        var faceIdx = 0;
        for(var i in obj.result)
        {
            var faceDetection = obj.result[i].result;
            var row = faceTable.insertRow(faceIdx);
            var h3 = document.createElement('h3');
            h3.innerHTML = obj.result[i].name.replace(':', '') + ' (0(very unlikely) ~ 4 (very likely))';
            var cell1 = row.insertCell(0);
            cell1.appendChild(h3);
//            cell1.innerHTML = obj.result[i].name;
            faceIdx++;
            //
            var anger = 'anger : ' + faceDetection.angerLikelihood + ' point';
            var joy = 'joy : ' + faceDetection.joyLikelihood + ' point';
            var sorrow = 'sorrow : ' + faceDetection.sorrowLikelihood + ' point';
            var surprise = 'surprise : ' + + faceDetection.surpriseLikelihood + ' point';
            var blurred = 'blurred : ' + + faceDetection.blurredLikelihood + ' point';
            var underExposed = 'underExposed : ' + faceDetection.underExposedLikelihood + ' point';
            var headwear = 'headwear : ' + faceDetection.headwearLikelihood + ' point';
            var angle = 'roll deg : ' + faceDetection.angles.roll + ', pan deg : ' + faceDetection.angles.pan + ', tilt deg : ' + faceDetection.angles.tilt;

            insertRowToTable(anger, faceTable, faceIdx++);
            insertRowToTable(joy, faceTable, faceIdx++);
            insertRowToTable(sorrow, faceTable, faceIdx++);
            insertRowToTable(surprise, faceTable, faceIdx++);
            insertRowToTable(blurred, faceTable, faceIdx++);
            insertRowToTable(underExposed, faceTable, faceIdx++);
            insertRowToTable(headwear, faceTable, faceIdx++);
            insertRowToTable(angle, faceTable, faceIdx++);

/*            var row = faceTable.insertRow(faceIdx);
            var cell1 = row.insertCell(0);
            cell1.innerHTML = textDetection;
            faceIdx++;*/
        }
    }

    function insertRowToTable(text, table, idx)
    {
        var row = table.insertRow(idx);
        var cell1 = row.insertCell(0);
        cell1.innerHTML = text;
    }

    //텍스트 검출
    function generateTextDetection(obj)
    {
        var textTable = document.getElementById('tblText');
        //result Array
        var textIdx = 0;
        for(var i in obj.result)
        {
            var textDetection = obj.result[i];
            var row = textTable.insertRow(textIdx);
            var cell1 = row.insertCell(0);
            cell1.innerHTML = textDetection;
            textIdx++;
        }
    }

    function generateLogoDetection(obj)
    {
        var logoTable = document.getElementById('tblLogo');
        //result Array
        var logoIdx = 0;
        for(var i in obj.result)
        {
            var textDetection = obj.result[i];
            var row = logoTable.insertRow(logoIdx);
            var cell1 = row.insertCell(0);
            cell1.innerHTML = textDetection;
            logoIdx++;
        }
    }

    function generatePropertiesDetection(obj)
    {
        var propertiesTable = document.getElementById('tblProperties');
        //result Array
        var idx = 0;
        for(var i in obj.result.colors)
        {
            var textDetection = obj.result.colors[i];
            var row = propertiesTable.insertRow(idx);
            var cell1 = row.insertCell(0);
            /*var link = document.createElement('a');
            var href = 'https://www.google.com/search?q=Rock';
            link.href = href;
            link.innerHTML = textDetection;
            cell1.appendChild(link);*/
            cell1.innerHTML = textDetection;
            //color..
            var cell2 = row.insertCell(1);
            cell2.bgColor = textDetection;
            cell2.width = 100;
            idx++;
        }
    }

    function generateCropHintsDetection(originImgUrl, obj)
    {
        processCropping(originImgUrl, obj.result[0]);
    }

    function generateSafeSearchDetection(obj)
    {
        var tblSafeSearch = document.getElementById('tblSafeSearch');
        //result Array
        var idx = 0;
        for(var key in obj.result)
        {
            var textDetection = key + ' : ' + obj.result[key];
            var row = tblSafeSearch.insertRow(idx);
            var cell1 = row.insertCell(0);
            cell1.innerHTML = textDetection;
            //color..
            idx++;
        }
    }

    function generateWebDetection(obj)
    {
        //full matching images...

        //web entities
        var tblWeb = document.getElementById('tblWeb');
        //result Array
        var idx = 0;
        for(var key in obj.result)
        {
            var row = tblWeb.insertRow(idx++);
            var cell0 = row.insertCell(0);
            var h3 = document.createElement('h3');
            h3.innerHTML = key;
            cell0.appendChild(h3);
            var resultObject = obj.result[key];

            for(var i in resultObject)
            {
                var textDetection = resultObject[i];
                var row = tblWeb.insertRow(idx);
                var cell1 = row.insertCell(0);
                var link = document.createElement('a');

                if(key == 'webEntities')
                {
                    var href = 'https://www.google.com/search?q='+ textDetection.description;
                    link.href = href;
                    link.target= '_blank';
                    link.innerHTML = textDetection.description;
                    cell1.appendChild(link);
                    //cell1.innerHTML = textDetection.description;

                }else if(key == 'partialMatchingImages')
                {
                    var href = textDetection.url;
                    link.href = href;
                    link.target= '_blank';
                    link.innerHTML = textDetection.url;
                    cell1.appendChild(link);

                }else if(key == 'pagesWithMatchingImages')
                {
                    var href = textDetection.url;
                    link.href = href;
                    link.target= '_blank';
                    link.innerHTML = textDetection.url;
                    cell1.appendChild(link);
                }
                idx++;
            }
        }



        /*var cell0 = row.insertCell(0);
        var h3 = document.createElement('h3');
        h3.innerHTML = 'WebEntities';
        cell0.appendChild(h3);

        for(var i in obj.result.webEntities)
        {

            var textDetection = obj.result.webEntities[i];
            var row = webEntities.insertRow(idx);
            var cell1 = row.insertCell(0);
            var link = document.createElement('a');
            var href = 'https://www.google.com/search?q=' + textDetection;
            link.href = href;
            link.target= '_blank';
            link.innerHTML = textDetection.description;
            cell1.appendChild(link);
            //cell1.innerHTML = textDetection.description;
            idx++;
        }*/

    }





    function redraw(img, dabaObj) {
        var canvasResult = document.getElementById('canvasResult');
        var imgResult = document.getElementById('imgResult');
        var context = canvasResult.getContext('2d');
        //canvasResult resize
        canvasResult.width = img.width;
        canvasResult.height = img.height;
        context.drawImage(img, 0, 0);
        //result Array
        var faceObj = dabaObj.face;
        for (var i in faceObj.result) {
            var faceResultList = faceObj.result[i];
                     //face 정보
            var faceInfo = faceResultList.result;

            headDraw(context, faceResultList.name, faceInfo.bounds.head);
            faceDraw(context,faceInfo.bounds.face)
            featuresDraw(context, faceInfo.features);


            /*

            var headBound = faceInfo.bounds.head;
            //head부분 좌표 찾기
            context.moveTo(0, 0);
            var wonjum = {};
            for (var k = 0; k < headBound.length; k++) {
                var head = headBound[k];
                if (k == 0) {
                    wonjum = head;
                    context.moveTo(head.x, head.y);
                } else {
                    context.lineTo(head.x, head.y);
                }
            }
            //마지막 점에 연결
            context.lineTo(wonjum.x, wonjum.y);
            // set line color
            context.strokeStyle = '#ff0000';
            context.stroke();

            //텍스트 드로잉
            context.font = "15px Comic Sans MS";
            context.fillStyle = "red";
            context.textAlign = "center";
            context.fillText(faceResultList.name, wonjum.x+20, wonjum.y - 5);*/

        }
        /*canvasResult.width = window.innerWidth;
        canvasResult.height = window.innerHeight;*/
    }

    function faceDraw(context, faceBound)
    {
        drawLine(context, faceBound);
    }

    function headDraw(context, name, headBound)
    {
        drawLine(context, headBound)

        //텍스트 드로잉
        context.font = "15px Comic Sans MS";
        context.fillStyle = "red";
        context.textAlign = "center";
        context.fillText(name, headBound[0].x+20, headBound[0].y - 5);
    }

    function featuresDraw(context, features)
    {
        //chin
        var chin = features.chin;
        drawPoint(context, chin.center);
        drawPoint(context, chin.left);
        drawPoint(context, chin.right);



        //ears
        var ears = features.ears;
        for(var i in ears)
        {
            var object = ears[i];
            drawPoint(context, object);
        }

        //eyebrow
        var eyebrown = features.eyebrows;
        for(var i in eyebrown)
        {
            var eyebrowobj = eyebrown[i];
            for(var k in eyebrowobj)
            {
                drawPoint(context, eyebrowobj[k]);
            }
        }

        //eyes

        var eyes = features.eyes;
        for(var i in eyes)
        {
            var eyesObj = eyes[i];
            for(var k in eyesObj){
                drawPoint(context, eyesObj[k]);
            }
        }
        //forehead
        var forehead = features.forehead;
        drawPoint(context, forehead);

        //lips
        var lips = features.lips;
        for(var i in lips)
        {
            drawPoint(context, lips[i]);
        }

        //mouth
        var mouth = features.mouth;
        for(var i in mouth)
        {
            drawPoint(context, mouth[i]);
        }


    }

    function drawLine(context, obj)
    {
        context.moveTo(0, 0);
        var wonjum = {};
        for (var k = 0; k < obj.length; k++) {
            var point = obj[k];
            if (k == 0) {
                wonjum = point;
                context.moveTo(point.x, point.y);
            } else {
                context.lineTo(point.x, point.y);
            }
        }
        //마지막 점에 연결
        context.lineTo(wonjum.x, wonjum.y);
        // set line color
        context.strokeStyle = '#ff0000';
        context.stroke();
    }

    function drawPoint(context, obj)
    {
        context.strokeStyle = '#00ff00';
        context.strokeRect(obj.x, obj.y, 1, 1);
    }

    function clearInfo()
    {
        //table row 삭제
        var faceTable = document.getElementById('tblFace');
        var rowCount = faceTable.rows.length;
        console.log(">>>faceTable Row Count : " + rowCount);
        for (var x=rowCount-1; x>=0; x--) {
            faceTable.deleteRow(x);
        }
        var labelTable = document.getElementById('tblLabel');
        rowCount = labelTable.rows.length;
        console.log(">>>labelTable Row Count : " + rowCount);
        for (var x=rowCount-1; x>=0; x--) {
            labelTable.deleteRow(x);
        }
    }

    function processCropping(originImgUrl, cropBoundList)
    {

        var img = new Image();
        img.onload = function() {
            var canvasResult = document.getElementById('canvasCropResult');
            var imgResult = document.getElementById('imgCropResult');
            var context = canvasResult.getContext('2d');
            //sorce coordinates
            var sourceX = 0;
            var sourceY = 0;
            var sourceWidth = img.width;
            var sourceHeight = img.height;
/*            canvasResult.width = img.width;
            canvasResult.height = img.height;*/

            var destX = cropBoundList[0].x;
            var destY = cropBoundList[0].y;
            var destWidth = cropBoundList[1].x ;
            var destHeight = cropBoundList[2].y ;

            canvasResult.width = destWidth;
            canvasResult.height = destHeight;


            //canvasResult.width = img.width;
            //canvasResult.height = img.height;
            context.drawImage(img, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight);
        };
        img.src = originImgUrl;

    }

    var myVar;

    function processLoading() {
        myVar = setTimeout(showPage, 3000);
    }

    function showPage() {
        document.getElementById("loader").style.display = "none";
        document.getElementById("myDiv").style.display = "block";
    }

    function checkImageValidation() {
        //파일 또는 이미지 URL에 값이 있는 지 확인한다.

        var localFile = document.getElementById("btnFile");
        var urlFile = document.getElementById("inputUrl");

        console.log(">>localFile Value : " + localFile.value + ", urlFileValue : " + urlFile.value);
        if(localFile.value == "" && urlFile.value == "")
        {
            return false;
        }

        if(localFile.value.length >0 && urlFile.value.length > 0)
        {
            return false;
        }

        return true;

    }

}());