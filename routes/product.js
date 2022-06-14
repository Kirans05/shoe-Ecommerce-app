const express = require("express")
const {protect} = require("../Authorization/Auhorization")
const { fetchAllProduct, signleProduct, updateProduct, deleteProduct, UpdateProdAfterPayment } = require("../controllers/fetchAppProducts")
const router = express.Router()


router.route("/").get(protect,fetchAllProduct)
router.route("/singleProduct/:id").get(protect,signleProduct)
router.route("/updateProduct").post(protect, updateProduct)
router.route("/deleteProduct/:id").delete(protect,deleteProduct)
router.route("/updateAfterPayment").post(protect,UpdateProdAfterPayment)



module.exports = router