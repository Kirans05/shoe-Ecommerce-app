const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    shoeName:{
        type:String,
        required:true
    },
    shoeCompany:{
        type:String,
        required:true
    },
    shoePrice:{
        type:Number,
        required:true
    },
    shoe_available:{
        type:Number,
        required:true
    },
    shoetitle:{
        type:String,
        required:true
    },
    shoeDescription:{
        type:String,
        required:true
    },
    shoewImage:{
        type:String,
        require:true
    },
    uniqueId:{
        type:String,
        require:true
    },
    rating:{
        type:Number,
        default:(Math.random()*5).toFixed(0)
    }
},{timestamps:true})


const productModal = new mongoose.model("productsTable",productSchema)

module.exports = productModal