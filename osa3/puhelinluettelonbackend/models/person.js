const mongoose = require("mongoose")

mongoose.set('strictQuery',false)

const url = process.env.MONGODB_URI

console.log("connecting to", url)
mongoose.connect(url, { family: 4 })
    .then(result => {
        console.log("connected to MongoDB")
    })
    .catch((error) => {
        console.log("error connecting to MongoDB:", error.message)
    })

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        required: true
    },
    number: String,
})

personSchema.set("toJSON", {
    transform: (document, returneOBject) => {
        returneOBject.id = returneOBject._id.toString()
        delete returneOBject._id
        delete returneOBject.__v
    }
})

module.exports = mongoose.model("person", personSchema)