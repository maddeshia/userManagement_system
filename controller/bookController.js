const Book = require("../models/bookModels")

const bookController = {
    
    // create book
    createbook:async(req,res)=>{
        try {
            const createBook = new Book(req.body);
            const saveBook = new createBook.save();
            return res.status(201).json(
                {
                    message:"Book added successull",
                    data:saveBook
                }
            );
        } catch (error) {
            return res.status(500).json({
                message:error.message
            });
        }
    },


    // get all favoriate book
    getFavoriateBook:async()=>{
        try {
            const getBook = new Book.find({});
            return res.status(200).json(
                {
                    message:"success",
                    data:getBook
                }
            )
        } catch (error) {
            return res.status(500).json({
                message:error.message
            });
        }
    },



    // get book by query by individually with all details 
    getIndividualBook:async(req,res)=>{
        const qnew = req.query.new;
        const qfavorite = req.query.favoriate;
        try {
            let favoirateBooks;
            if (!qnew) {
                favoirateBooks = await Book.find().sort({createdAt: -1}).limit(4);
            }else if (qfavorite) {
                favoirateBooks = await Book.find({
                    favoirateBooks:{
                        $in:[qfavorite],
                    },
                });
            }else{
                favoirateBooks = await Book.find()
            }
            res.status(200).json(favoirateBooks);

        } catch (error) {
            return res.status(500).json({
                message:err.message
            })
        }
    }

}


module.exports = bookController