
  require('dotenv').config()
  const nodemailer = require('nodemailer')

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  });

  let mailOptions = {
    from: 'precieuxmugisha@gmail.com',
    to: 'precieuxmugisha@gmail.com',
    subject: 'Trying to send email using nodemailer',
    // text:'Nodemailer helps to send emails from one account to another through an easy way this keeps people updated about thir accounts everywhere they are.',
    html: "<head><style>#main{background-color: rgba(109, 99, 109, 0.89); color: white; margin: auto; display: flex; flex-flow: column; justify-content: center; align-items: center; width: 40%; border-radius: 10px; padding: 20px;}.top{display: flex; flex-direction: column; align-items: center; background-color: purple; border-top-right-radius: 10px; border-top-left-radius: 10px; padding: 20px; width: 80%;}.bottom{width: 80%; display: flex; flex-direction: column; background-color: white; color: black; font-weight: bold; text-align: center; border-bottom-right-radius: 10px; border-bottom-left-radius: 10px; padding: 10px 20px;}img{width: 50px; height: 50px;}body{font-family: Ubuntu;}#h3{text-align: left;}</style> <link rel='preconnect' href='https://fonts.googleapis.com'> <link rel='preconnect' href='https://fonts.gstatic.com' crossorigin> <link href='https://fonts.googleapis.com/css2?family=Smooch&family=Ubuntu:wght@300&display=swap' rel='stylesheet'></head><body onload='playText()'> <div id='main'> <div class='top'> <img src='/images/logo.png' alt='Photo corner logo'> <h1>Welcome to PHOTOCORNER</h2> </div><div class='bottom'> <h3 id='h3'></h3> <p>Your verification code is written below.This code will expire in two hours time.</p><p id='number'></p><p>If you didn't request this email validation please ignore this message.</p></div></div><script>function randomNumber(max, min){let randomNumber=Math.floor(Math.random() * (max - min) + min); document.getElementById('number').innerHTML=randomNumber;}; randomNumber(999999, 100000); var i=0; function playText(){let text='Share your images the fastest way by using PHOTOCORNER.'; if (i < text.length){document.getElementById('h3').innerHTML +=text.charAt(i); i++; setTimeout(playText, 100);};}; </script></body>"
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) console.log('Email not sent: ' + error);
    else console.log({message:'Email sent'})
  });





























// var http = require('http');
// var formidable = require('formidable');
// var fs = require('fs');

// http.createServer(function (req, res) {
//   if (req.url == '/fileupload') {
//     var form = new formidable.IncomingForm();
//     form.parse(req, function (err, fields, files) {
//       var oldpath = files.filetoupload.path;
//       var newpath = 'C:/Users/Your Name/' + files.filetoupload.name;
//       fs.rename(oldpath, newpath, function (err) {
//         if (err) throw err;
//         res.write('File uploaded and moved!');
//         res.end();
//       });
//  });
//   } else {
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
//     res.write('<input type="file" name="filetoupload"><br>');
//     res.write('<input type="submit">');
//     res.write('</form>');
//     return res.end();
//   }
// }).listen(8080);