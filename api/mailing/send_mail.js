module.exports = function ( email, name, ticketInBase64, cb) {
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
                <p style="font-family: 'Roboto', Helvetica, sans-serif">Féllicitation!! Vous faites désormais partie de nos invités d'honneur. </p>
                <p style="font-family: 'Roboto', Helvetica, sans-serif">
                    Vous trouverez ci-joint votre passe pour la conférence 👇👇👇
                </p>
            </div>
            <div style="min-height: 2rem">
                <div style="text-align: center">
                <center>
                    <span style="font-family: 'Roboto', Helvetica, sans-serif">Copyright &copy; 2022. All rights reserved.</span>
                </center>
                </div>
            </div>
        </div>
    </div>`;

    let mailOptions = {
        from: '"KITRAVEL" <kitravel620@gmail.com>', // sender address
        to: email, // list of receivers
        subject: "CONFERENCE MARINA HOTEL", // Subject line
        html: data, // html body
        attachments:[
            {   
                filename: 'pass_conférence.pdf',
                path: 'api/assets/pdf/pass_conference.pdf'
            },
        ]
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, cb);
}