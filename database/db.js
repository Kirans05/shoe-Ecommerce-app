const color = require("colors")
require("dotenv").config()
const mongoose = require("mongoose")


const conncetToDb = () => {
    mongoose.connect(process.env.URL).then(() => console.log("mongoose connected ".bgBlue.red)).catch(()=>console.log("error connecteing to mongodb"))
}


module.exports = conncetToDb


