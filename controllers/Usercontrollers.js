const User = require("../modal/usermodel")
const {generateTocken} = require("../tocken/generateTocken")

const userSignUp = async (req,res) => {

    const user = await User(req.body)
    if(user.length){
        res.status(400).json({message:"User Already Exists "})
    }else{
        try{
            let insertData = await User(req.body)
            const result = await insertData.save()
            const tocken = await generateTocken(result._id)
            res.status(200).json({message:"SignUp SuccessFull",result,tocken})
        }catch(error){
            console.log("error",error)
        }
    }
}



const loginUser = async (req,res) => {
    let user = await User.findOne({email:req.body.email})
    if(user){
        let comparedResult = await user.matchPassword(req.body.password)
        if(comparedResult){
            let tocken = await generateTocken(user._id)
            res.status(200).json({message:"Login SuccessFull",result:user,tocken})
        }else{
            res.status(400).json({message:"Password does Not MAtch"})
        }
    }else{
        res.status(400).json({message:"User Not Found "})
    }
}



const userPurchased = async (req,res) => {
    try{
        let purchasedProduct = await User.updateOne({_id:req.user._id},{$push:{orders:req.body}}) 
        res.status(200).json({message:"SuccessFully Updated",result:purchasedProduct})
        
    }catch(error){
        res.json({message:"unable to buy the Product"})
    }
}


const userOrdersList = async (req,res) => {
    try{
        let data = await User.findById({_id:req.user._id})
        res.status(200).json({message:"SuccessFully Retrived The Data",result:data})
    }catch(error){
        res.json({message:"Unable  to Retrive The Data"})
    }
}


const AddToCart= async (req,res) => {
    try{
        let data = await User.findOne({_id:req.user._id})
        let filteredValue = data.cartItems.filter(item => item._id == req.body._id)
        if(filteredValue.length > 0){
            res.status(200).json({message:"Product Already In Cart"})
        }else{
            let data = await User.findOneAndUpdate({_id:req.user._id},{$push:{cartItems:req.body}},{new:true})
            res.status(200).json({message:"Item Added SuccessFully",result:data})
        }
    }catch(error){
        res.json({message:"Error while Adding to Cart"})
    }
}



const displayCartItems = async (req,res) => {
    try{
        let data = await User.findOne({_id:req.user._id})
        res.status(200).json({message:"SuccessFully Retrived The Data",result:data})
    }catch(error){
        res.json({message:"Unable To Display Cart Items"})
    }
}



const removeCartItem = async (req,res) => {
    try{
        let data = await User.findOne({_id:req.user._id})
        let filteredValue = data.cartItems.filter(item => item._id !== req.params.id)
        let finalUpdatedData = await User.findOneAndUpdate({_id:req.user._id},{$set:{cartItems:filteredValue}},{new:true})
        res.status(200).json({message:"Product Removed Successfully",result:finalUpdatedData})
        // console.log(req.params.id)
        // res.send("hi")
    } catch(error){
        res.json({message:"Unable To remove From Cart"})
    }
}


module.exports = {userSignUp, loginUser, userPurchased, userOrdersList, AddToCart, displayCartItems, removeCartItem}