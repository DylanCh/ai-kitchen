var app = require('loopback')();
var  AWS = require('aws-sdk');
var fs = require('fs');

const PORT = 8000;

AWS.config.loadFromPath('./aws-config.json');

app.get('/rec', (req,res)=>{
    var imgUrl = req.query.img;

    console.log(imgUrl);

    var rek = new AWS.Rekognition();
    var s3 = new AWS.S3({
        region : 'us-east-1'
    });

   var filename = Math.floor((Math.random() * 1000) + 1).toString();
   var s3params = {
        Key : filename,
        Body : fs.createreadStream(req.query.img),
        Bucket : 'aws-lightsail',
       ACL : 'public-read-write'
   };

   s3.upload(s3params, (err,data)=>{
       if (err) {
          console.warn('upload failed');
       }
       else {
          console.log('successful uploaded image');
          res.json({message:'success'});
       }
   });
});

app.listen(PORT,()=>{
    console.log(`Connected to ${PORT}`);
});
