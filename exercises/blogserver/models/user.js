const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        minLength: 3,
        required: true
    },
    name: String,
    hashpassword: {
        type: String,
        required: true
    }
})  

userSchema.set('toJSON', {
transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
}
})

module.exports = mongoose.model('User', userSchema)