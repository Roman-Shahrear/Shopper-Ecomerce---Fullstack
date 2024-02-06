const ErrorHandler = require("../utils/errorHandler")
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

//For Register or Sign Up User
exports.registerUser = catchAsyncErrors(async(req, res, next)=>{

    let check = await User.findOne({email: req.body.email});
    if(check){
        return res.status(400).json({
            success: false,
            errors: "existing user found with this same email adress"
        })
    }
    let cart = {};
    for(let index = 0; index < 300; index++){
        cart[index] =  0;
    }
    const user = new User({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        cartData: cart
    })

    await user.save();

    //For JWT Object data model
    const data = {
        user:{
            id: user.id
        }
    }

    //For Create Token
    const token = jwt.sign(data,"secret_ecom");
    res.json({success:true, token})
})


// For Login User
exports.loginUser = catchAsyncErrors(async(req, res, next)=>{
    let user = await User.findOne({email: req.body.email});

    if(user){
        const passCompare = req.body.password === user.password;
        if(passCompare){
            const data = {
                user:{
                    id:user.id
                }
            }
            //create jwt token
            const token = jwt.sign(data,"secret_ecom");
            res.json({
                success: true,
                token
            });
        }
        else{
            res.json({
                success: false,
                errors: "Wrong password"
            })
        }
    }
    else{
        res.json({success:false, errors: "Wrong Email Id"})
    }
})
