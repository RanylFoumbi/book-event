
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const sendMailGmail = require('../mailing/send_mail')
const User = require('../model/user')
const generator = require('../utilities/generate-pdf')

router.post('/book-event', (req, res, next) => {
    console.log({enterENDEPOINT: "ENENENENETETETETET"})
    User.findOne({email: req.body.email})
    .exec()
    .then(async user => {
        if (user) {
            return res.status(409).json({
                message: 'Email Exist'
            })
        }else {
          const user = new User({
            _id: mongoose.Types.ObjectId(),
            bookId: mongoose.Types.ObjectId(),
            civility: req.body.civility,
            lastName: req.body.lastName,
            firstName: req.body.firstName,
            filiere: req.body.filiere,
            town: req.body.town,
            phone: req.body.phone,
            email: req.body.email,
            university: req.body.university,
            handicap: req.body.handicap,
            studyProgram: req.body.studyProgram,
        });
        console.log({beforePdf: "ARRARARARARRARA"})
        const base64File = await generator.generatPDF({ data: req.body})
        console.log({afterPDF: base64File})
        console.log({data: req.body})

        user.tiket = base64File
         
        user.save()
        .then(async user => {
            sendMailGmail("CONFERENCE DJEUGA PALACE", user.email, user.lastName+' '+ user.firstName, base64File, (error, info) => {
                if (error) {
                    return res.status(500).json({
                        "error": error
                    })
                }
                console.log('Message sent: %s', info.messageId);
                    return res.status(200).json({
                        mail: "Email sent",
                    })
            });
        }).catch(err => {
            console.log(err)
            res.status(500).json({ error: err })
        })
        }
    })
})


module.exports = router