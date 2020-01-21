const express = require('express');
const path = require('path');
const os = require("os");
const multer = require('multer');
const upload = require('./fileupload');
var bodyParser =require('body-parser')
const router = express.Router();
const app = express();
const PORT = process.env.PORT || 4000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extend: true}));
// if you need api routes add them here
app.get("/api/getUsername", function(req, res, next){
    res.send({ username: os.userInfo().username });
});

app.use(express.static(path.join(__dirname, '..', 'build/')));

app.listen(PORT, () => {
console.log(`Check out the app at http://localhost:${PORT}`);
});

app.post("/api/sendFile", function(req, res, next){
    console.log("post완료");
    upload(req, res, function(err) {
        if (err instanceof multer.MulterError) {
            return next(err);
        } else if (err) {
            return next(err);
        }
        // var files = req.file;
        var fs = require('fs');
        var text = fs.readFileSync('uploads/'+req.file.filename,"utf8");
        var textString = Buffer.from(text).toString();

        console.log('원본파일명 : ' + req.file.originalname)
        console.log('저장파일명 : ' + req.file.filename)
        console.log("파일 내용 : "+textString);
        console.log('크기 : ' + req.file.size)
        // console.log('경로 : ' + req.file.location) s3 업로드시 업로드 url을 가져옴
        return res.json({success:textString});

    });
});

app.post("/api/sendText", function(req, res, next){
    console.log("post완료");
    console.log(req.body.text);
     // console.log(data)
return res.json({text:"짜증"});
});