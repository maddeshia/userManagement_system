const express = require("express")
const router = express.Router();
const userController = require("../controller/userController");


// register user
router.post("/registerUser", userController.userRegister);

// user login 
router.post("/loginUser", userController.userLogin);

// change Password
router.post("/changePassword", userController.changePassword);


module.exports = router;     