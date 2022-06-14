const express = require("express")
const {protect} = require("../Authorization/Auhorization")
const { AdminSignUp, AdminLogin, AddProduct, signleProduct, fetchAllUsersList } = require("../controllers/AdminController")
const router = express.Router()



router.route("/adminsignup").post(AdminSignUp)
router.route("/adminlogin").post(AdminLogin)
router.route("/adminproduct").post(protect,AddProduct)
router.route("/getUsersList").get(protect,fetchAllUsersList)




module.exports = router