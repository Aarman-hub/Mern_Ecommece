import jwt from 'jsonwebtoken';
import User from '../models/user.js';


export const requireSign = async (req, res, next) =>{
    try {
        const decoded = await jwt.verify(req.headers.authorization, process.env.JWTSECRET);
        req.user = decoded;
        next()
    } catch (err) {
        res.json({error: "Unathorized user!"});
    }
}

export const isAdmin = async (req, res, next) =>{
    try {
        const user = await User.findById(req.user._id);
        if(user.role !== 1){
            return res.status(401).send("Unauthorized");
        }else{
            next();
        }
    } catch (err) {
        res.json({error:res.err});
    }
}