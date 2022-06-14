const express = require("express")
const {UserProtect, protect} = require("../Authorization/Auhorization")
const router = express.Router()
const { userSignUp, loginUser, userPurchased, userOrdersList, AddToCart, displayCartItems, removeCartItem } = require("../controllers/Usercontrollers")


router.route("/").post(userSignUp)
router.route("/login").post(loginUser)
router.route("/purchase").post(protect,userPurchased)
router.route("/userOrdres").get(protect,userOrdersList)
router.route("/addToCart").put(protect,AddToCart)
router.route("/usercartItems").get(protect,displayCartItems)
router.route("/removeCartItem/:id").put(protect,removeCartItem)


module.exports = router