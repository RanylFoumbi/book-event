module.exports = function (subject, email, name, ticketInBase64, cb) {
    const nodemailer = require('nodemailer');

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: process.env.AUTH_EMAIL,
            pass: process.env.AUTH_PWD
        },
        tls: {
            rejectUnauthorised: false
        }
    });

    const data = `
        <div style="width: 100%;background-color: #f6f6f6;">
        <link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet">
        <div style="width: 70%;display: block;margin-left: auto;margin-right: auto;padding:
            4rem;background-color: white;height: 100%;position: relative;">
            <div style="min-height: 5rem">
                <h2 style="font-family: 'Roboto', Helvetica, sans-serif;">Hello Mr., Mme. ${name}</h2>
                <p style="font-family: 'Roboto', Helvetica, sans-serif">Félicitation!! Vous faites désormais notre partie de nos invités d'honneurs. </p>
                <p style="font-family: 'Roboto', Helvetica, sans-serif">
                    Vous trouverew ci-joint votre passe pour la conference 👇👇👇
                </p>
            </div>
            <div style="min-height: 2rem">
                <div style="text-align: center">
                <center>
                    <p><a style="font-family: 'Roboto', Helvetica, sans-serif;text-decoration: none;color: #33475B" href="">Visitez le site</a></p>
                    <span style="font-family: 'Roboto', Helvetica, sans-serif">Copyright &copy; 2022. All rights reserved.</span>
                </center>
                </div>
            </div>
        </div>
    </div>`;

    let mailOptions = {
        from: '"EDUCIA COORPORATION " <ranylfoumbi@gmail.com>', // sender address
        to: email, // list of receivers
        subject: subject, // Subject line
        html: data, // html body
        attachments:[
            {   
                filename: 'billet.pdf',
                path: `data:text/plain;base64,${ticketInBase64}`
            },
        ]
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, cb);
}