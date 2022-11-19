const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    seatNumber:{ 
      type: String,
      required : true
    },
    civility:{ 
      type: String,
      required : true
    },
    lastName:{ 
      type: String,
      required : true
    },
    firstName:{ 
      type: String,
      required : true
    },
    filiere: {
        type: String,
        required : true
    },
    country: {
        type: String,
        required : true
    },
    town: {
        type: String,
        required : true
    },
    phone: {
        type: String,
        required : true
    },
    email: {
        type: String,
        required : true
    },
    university: {
        type: String,
        required : true
    },
    handicap: {
        type: String,
        required : true
    },
    studyProgram: {
        type: String,
        required : true
    },
    actualStudyLevel: {
        type: String
    },
    tiket: {
        type: String
    },
    expectations: {
        type: String
    },
    updatedAt: { 
      type: Date,
      default: Date.now()
    },
    createdAt: { 
      type: Date,
      default: Date.now()
    },
});


module.exports = mongoose.model("User",userSchema);