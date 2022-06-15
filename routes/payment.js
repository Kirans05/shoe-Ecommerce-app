// const router = require("express").Router();
// const Razorpay = require("razorpay");
// const crypto = require("crypto");

// router.post("/orders", async (req, res) => {
// 	console.log(req.body)
// 	try {
// 		const instance = new Razorpay({
// 			key_id: process.env.KEY_ID,
// 			key_secret: process.env.KEY_SECRET,
// 		});

// 		const options = {
// 			amount: req.body.amount,
// 			currency: "INR",
// 			receipt: crypto.randomBytes(10).toString("hex"),
// 		};

// 		instance.orders.create(options, (error, order) => {
// 			if (error) {
// 				console.log(error);
// 				return res.status(500).json({ message: "Something Went Wrong!" });
// 			}
// 			res.status(200).json({ data: order });
// 		});
// 	} catch (error) {
// 		res.status(500).json({ message: "Internal Server Error!" });
// 		console.log(error);
// 	}
// });

// router.post("/verify", async (req, res) => {
// 	console.log(req.body)
// 	try {
// 		console.log("verify",req.body)
// 		const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
// 			req.body;
// 		const sign = razorpay_order_id + "|" + razorpay_payment_id;
// 		const expectedSign = crypto
// 			.createHmac("sha256", process.env.KEY_SECRET)
// 			.update(sign.toString())
// 			.digest("hex");

// 		if (razorpay_signature === expectedSign) {
// 			return res.status(200).json({ message: "Payment verified successfully" ,expectedSign});
// 		} else {
// 			return res.status(400).json({ message: "Invalid signature sent!" });
// 		}
// 	} catch (error) {
// 		res.status(500).json({ message: "Internal Server Error!" });
// 		console.log(error);
// 	}
// });

// module.exports = router;
const router = require("express").Router();
const Razorpay = require("razorpay");
const crypto = require("crypto");
const productModal = require("../modal/productModal");
const User = require("../modal/usermodel");

router.post("/orders", async (req, res) => {
  try {
    const instance = new Razorpay({
      key_id: process.env.KEY_ID,
      key_secret: process.env.KEY_SECRET,
    });

    const options = {
      amount: req.body.amount * 100,
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"),
    };

    instance.orders.create(options, (error, order) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: "Something Went Wrong!" });
      }
      res.status(200).json({ data: order });
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
    console.log(error);
  }
});

router.post("/verify", async (req, res) => {
  try {
    // console.log(req.body,"==============>")
    // console.log("verify",req.body)
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body.response;
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      const { userProduct, updateProduct, user_id } = req.body;

      // updating product quantity in the product database
      let updateProductQuantity = await productModal.updateOne(
        { _id: updateProduct._id },
        { $set: { shoe_available: updateProduct.shoe_available } }
      );

      // adding product purchased in the user database
      let purchasedProduct = await User.updateOne(
        { _id: user_id },
        { $push: { orders: userProduct } }
      );

      // removing the purchased product from the user cart items
    //   let data = await User.findOne({ _id: user._id });
    //   let filteredValue = data.cartItems.filter(
    //     (item) => item._id !== userProduct._id
    //   );
    //   let finalUpdatedData = await User.findOneAndUpdate(
    //     { _id: user._id },
    //     { $set: { cartItems: filteredValue } },
    //     { new: true }
    //   );
      return res
        .status(200)
        .json({
          message: "Payment verified successfully",
          expectedSign,
          updateProductQuantity,
          purchasedProduct
        //   finalUpdatedData,
        });
    } else {
      return res.status(400).json({ message: "Invalid signature sent!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
    console.log(error);
  }
});

module.exports = router;
