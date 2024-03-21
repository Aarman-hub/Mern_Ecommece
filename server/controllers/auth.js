import User from '../models/user.js';
import { hashPassword } from '../helpers/auth.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const auth = async (req, res) =>{
    res.json("Hello Arman, How are You.");
}

export const register = async (req, res) =>{

    try {
        const {name, email, password} = req.body;

        if(!name.trim()){
            return res.json({error:"Name is required!"})
        }
        if(!email){
            return res.json({error:"Email is required!"})
        }
        if(!password || password.length < 6){
            return res.json({error:"Password must be at least 6 charecters long"})
        }

        const userExists = await User.findOne({email});
        
        if(userExists){
            return res.json({error:"User already taken.!"});
        }
        const salt = await bcrypt.genSalt(12);
        const hashPassword = await bcrypt.hash(password, salt);

        const user = new User({name, email, password: hashPassword});
        await user.save();

        const token = await jwt.sign({_id: user._id}, process.env.JWTSECRET, {expiresIn:'7d'});

        res.json({
            user:{
                name:user.name,
                email:user.email,
                role:user.role,
                address:user.address,
            },
            token
        });

    } catch (err) {
        res.json({error:"Error!!"});
    }
}

export const login = async (req, res) =>{
    const {email, password} = req.body;
    try {
        if(!email || !password){
            res.json({errro:"All fields required!"})
        }

        const user = await User.findOne({email});

        if(!user){
            res.json({error:"User not available."})
        }

        const passwordVerify = await bcrypt.compare(password, user.password);

        
        if(!passwordVerify){
            res.status(401).json({error:"Password not match."});
        }


        const token = jwt.sign({_id:user._id},process.env.JWTSECRET,{expiresIn:"1d"});


        res.json({token, user:{
            name:user.name,
            email:user.email,
            role:user.role,
            address:user.address,
        }});

    } catch (err) {
        
    }
}

export const updateProfile = async (req, res) =>{
    try {
        const {name, email, address} = req.body;

        const updated = await User.findById(req.user._id,{name, email, address}, {new:true});
    
        res.json(updated);
    } catch (err) {
        console.log(err);
    }
}

export const secret = async (req, res)=>{
    res.json({user: req.user});
}