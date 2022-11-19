
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const sendMailGmail = require('../mailing/send_mail')
const User = require('../model/user')
router.post('/book-event', (req, res, next) => 
{
    console.log({body: req.body})
    User.findOne({email: req.body.email})
    .exec()
    .then(async user => {
        if (user) {
            return res.status(409).json({
                message: 'EMAIL_EXIST'
            })
        }else {
            const char = mongoose.Types.ObjectId().valueOf()
            console.log(char)
            console.log(typeof(char))
          const user = new User({
            _id: mongoose.Types.ObjectId(),
            town: req.body.town,
            phone: req.body.phone,
            email: req.body.email,
            filiere: req.body.filiere,
            country: req.body.country,
            civility: req.body.civility,
            lastName: req.body.lastName,
            handicap: req.body.handicap,
            firstName: req.body.firstName,
            university: req.body.university,
            seatNumber: char.substring(0,4).toUpperCase(),
            studyProgram: req.body.studyProgram,
            expectations: req.body.expectations,
            actualStudyLevel: req.body.actualStudyLevel,
        });
         
        user.save()
        .then(async user => {
            try {
                console.log({neWuser: user})
                    sendMailGmail( user.email, user.lastName+' '+ user.firstName, (error, info) => {
                        if (error) {
                            return res.status(500).json({
                                "error": error
                            })
                        }
                        console.log('Message sent: %s', info.messageId);
                            return res.status(200).json({
                                message: "EMAIL_SENT",
                            })
                    });
            } catch (error) {
                return res.status(500).json({
                    "error": error
                })
            }
            
        }).catch(err => {
            console.log(err)
            res.status(500).json({ error: err })
        })
        }
    })
})

router.get('/all',async (req,res,next)=>{
   try {
        const users = await User.find({});
        return res.status(200).json({data: users });
   } catch (error) {
        return res.status(500).json({
            error
        })
   }
})


module.exports = router