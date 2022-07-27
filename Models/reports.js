const {model, Schema} = require ('mongoose')

const reportSchema = new Schema({
    reportContent:{
        type:String,
    },
    sessionId:{
        type:String,
        required: true
    },
    patientId:{
        type:String,
        required: true
    }
})

module.exports = model('report', reportSchema)