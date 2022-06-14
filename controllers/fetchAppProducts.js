const productModal = require("../modal/productModal")





const fetchAllProduct = async (req,res) => {
   
    try{
        let allProducts = await productModal.find({})
        res.status(200).json({message:"Products fetched",result:allProducts}) 
    }catch(error){
        res.json({message:"unable to display all products"})
    }
} 




const signleProduct = async (req,res) => {
    try{    
        let findOneProduct = await productModal.find({_id:req.params.id}) 
        res.status(200).json({message:"product found",result:findOneProduct})
    }catch(error){
        res.json({message:"Unable to display Product"})
    }
}



const updateProduct = async (req,res) => {
    try{
        let updateProduct = await productModal.updateOne({_id:req.body._id},{$set:{shoe_available:req.body.shoe_available}})
        // console.log("updateProduct",updateProduct)
        res.status(200).json({message:"Product Updated",result:updateProduct})
    }catch(error){
        res.json({message:"Unable to Update The Product"})
    }
}


const deleteProduct = async (req,res) => {
    try{
        let deleteProduct = await productModal.deleteOne({_id:req.params.id})
        res.status(200).json({message:"Product deleted",result:deleteProduct})
    }catch(error){
        res.json({message:"Unable to Delet Product"})
    }
}




// update product quantity after payment
const UpdateProdAfterPayment = async (req,res) => {
//     try{
//         let updateproduct = await productModal.upadteOne({_id:req.body._id},{$set:{shoe_available
// :}})
// console.log("updateproduct",updateproduct)
// res.status(200).json({message:"Product Updated",result:updateproduct})
//     }catch(error){
//         res.json({message:"Unable to Update The Product"})
//     }
}


module.exports = {fetchAllProduct, signleProduct, updateProduct, deleteProduct, UpdateProdAfterPayment}