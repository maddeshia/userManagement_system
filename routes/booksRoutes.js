
const express = require("express");
const router = express.Router();
const bookController = require("../controller/bookController");
const {verifyToken } = require("./verifyToken");

// add favoirate book 
router.post("/addFavoriate_book", verifyToken, bookController.createbook);
 
// get favoriate book 
router.get("/getFavoriateBook", verifyToken,bookController.getFavoriateBook);
 
// get individual book by query
router.get("getIndividualBook", verifyToken, bookController.getIndividualBook)
 
module.exports = router;


     

   

 