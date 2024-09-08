import jwt from 'jsonwebtoken';
import 'dotenv/config';

export function verifyToken(req,res) {
    let token = req.headers["authorization"] 
    if(token === undefined || token === null || token === " "){
        return false
    }
    token = token.split(" ")
    // console.log("toke",token)
    if(token.length == 2){
        token = token[1]
    }
    if(!token){
        return false
    }
    try{
        const decode = jwt.verify(token, process.env.PRIVATE_KEY);
        req.headers.loggedInUserEmail = decode.email
        return true
    }catch(err){
        return false
    }
}
