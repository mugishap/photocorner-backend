exports.emailValidation = email,req => {

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
    to: email,
    subject: 'Trying to send email using nodemailer',
    // text:'Nodemailer helps to send emails from one account to another through an easy way this keeps people updated about thir accounts everywhere they are.',
    html: "<h1>Welcome to PHOTOCORNER.</h1><h2>Click on the link below to verify your account</h2><br><a target='_blank' href='youtube.com'>photocorner.com</a><br><p>If you didn't request this email verification, we are really sorry someone might have conused your account eith his or hers</p>"
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) return ;
    else console.log('Email sent: ' + info.response);
  });
}




























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