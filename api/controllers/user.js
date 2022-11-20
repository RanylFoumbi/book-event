
const mongoose = require('mongoose')
const sendMailGmail = require('../mailing/send_mail')
const User = require('../model/user')

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const bookSeat = async(req, res)=>{
     const { town, phone, email, filiere, country, civility, lastName, handicap, firstName, university, studyProgram, expectations,
          actualStudyLevel} = req.body;
          
     console.log({body: req.body})
     User.findOne({email: email})
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
               town: town,
               phone: phone,
               email: email,
               filiere: filiere,
               country: country,
               civility: civility,
               lastName: lastName,
               handicap: handicap,
               firstName: firstName,
               university: university,
               seatNumber: char.substring(0,4).toUpperCase(),
               studyProgram: studyProgram,
               expectations: expectations,
               actualStudyLevel: actualStudyLevel,
           });
          
         user.save()
         .then(async user => {
             try {
                 console.log({neWuser: user})
                     sendMailGmail( email, lastName+' '+ firstName, (error, info) => {
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
}

const getllAllUsers = async(req, res)=>{
     try {
          const users = await User.find({});
          return res.status(200).json({ users });
     } catch (error) {
          return res.status(500).json({
              error
          })
     }
}
const deleteAllUsers = async(req, res)=>{
     try {
          const users = await User.deleteMany({});
          return res.status(200).json({message: "Users has been deleted",users});
     } catch (error) {
          return res.status(500).json({
              error
          })
     }
}



module.exports = { bookSeat, getllAllUsers, deleteAllUsers }