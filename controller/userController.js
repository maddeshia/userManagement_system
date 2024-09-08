const config = require("../config/config.json")
const User = require("../models/userModels");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validate = require("validator");


const userController = {

    // register
    userRegister:async (req,res) =>{
        try {
            console.log(req.body);
            const {username, email, password, dob} = req.body;

            const user = await User.findOne({email});
            if (user) {
                return res.status(400).json({
                    message:"User already exists "
                });
            }
            if (user == 0) {
                return res.status(400).json({
                    message:"user is not active"
                })
            }

            const passwotdHash = await bcrypt.hash(password,10);
            const newUser = new User( {
                username:username,
                email:email,
                password:passwotdHash,
                dob:dob
            });

            await newUser.save();
            return res.status(201).json({
                message:"User registered successfully",
                data:newUser
            });

        } catch (error) {
            return res.status(500).json({message:error.message});
        }
    },




    // Login
    userLogin:async(req,res)=>{
        try {
            console.log(req.body);
            const {email,password} = req.body;
            const validates = validate.isEmail(email);

            if (!validates) {
                return res.status(400).json({
                    message:"Invalid eamil formate"
                });
            }

            const user = await User.findOne({email})
            if (!user) {
                return res.status(400).json({
                    error:{message:"user is not registered"}
                });
            }

            const isMatch = await bcrypt.compare(password,user.password);
            if (!isMatch) {
                return res.status(400).json({error:{password:"user password is not Matched"}});
            }

            const accessToken = jwt.sign({
                id:user._id,
            },config.SECRET_KEY,{expiresIn:"5d"});

            return res.status(200).json({
                message:"user login successfully",
                data:user,
                token:accessToken
            });

        } catch (error) {
            return res.status(500).json({message:error.message})
        }
    },


    // changee password
    changePassword:async(req,res)=>{
        try {
            console.log(req.body);
            const {password,email} = req.body;
            const user = await User.findOne({email:email})
            const isMatch = bcrypt.compare(req.body.password, user.password);
            if (!isMatch) {
                return res.status(400).json({error:{
                    message:"Incorrect Password"
                }});
            }
            
            const passwordHash = await bcrypt.hash(password,10);
            const changePassword = await User.findOneAndUpdate({
                email:email
            },{                                
                password:passwordHash
            });
            return res.status(200).json({
                message:"password change successfully",
                data:changePassword
            });
        } catch (error) {
            return res.status(500).json({message:error.message})
        }
    }, 

}

module.exports = userController;