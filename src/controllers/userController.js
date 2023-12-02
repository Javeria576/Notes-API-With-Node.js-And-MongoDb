const userModel = require("../model/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const success = require("../model/success-model")

const signup = async (req, res) => {

    const {username ,email, password} = req.body;
    try{
        const isUserExist = await userModel.findOne({email : email});
        if(isUserExist){
            
            return res.status(400).json({message: "User already exist"})
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email))
        {
            return res.status(400).json({ isValid: false, message: 'Email is not valid.' });
        } 
        const hashedPassword = await bcrypt.hash(password, 10);

        const createdUser = await userModel.create({
            username : username,
            password : hashedPassword,
            email : email
        })
        const token = jwt.sign({email: createdUser.email, id : createdUser._id}, process.env.SECRET_KEY);
        res.status(201).json({user: createdUser, token : token});

    }catch(error){
        console.log(error)
        res.status(500).json({message : "Something went wrong"}); 
    }
}

const signin = async(req, res) => {

    const {email, password} = req.body;
    try{

        const existingUser = await userModel.findOne({email : email});
        if(!existingUser){
            return res.status(400).json({message: "User not founnd"})
        }

        const matchPassword = await bcrypt.compare(password, existingUser.password)
        if(!matchPassword){
            return res.status(400).json({message: "Invalid password"})
        }
        const token = jwt.sign({email: existingUser.email, id : existingUser._id}, process.env.SECRET_KEY);

        // const successResponse = {
        //     successResponse: new success('Successful Login', 200),
        //     user: existingUser, 
        //     token : token,
        //   };
        const successResponse = {
            user: existingUser, 
            token : token,
          };

        res.status(200).json(successResponse);

    }catch (error){
        console.log(error)
        res.status(500).json({message : "Something went wrong"}); 
    }

    
}

module.exports = {signup, signin}