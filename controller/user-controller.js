import { userData } from '../mock-data/user-mock-data.js';
import { decodeUrl } from '../utilities/UtilityFunc.js';
import { UserServices } from '../services/user-service.js';
import { verifyToken } from '../utilities/authUtility.js';
import jwt  from 'jsonwebtoken';
import  'dotenv/config'


const userService = new UserServices();
class UserController {
    controller(req, res) {
        const method = req.method;
        const  {pathname,urlSegment}   = decodeUrl(req,res);

        let body = '';
        req.on('data', (chunk) => {
            body += chunk
        })
        if (pathname.indexOf('/login') === -1) {
            let tokenVerified = verifyToken(req, res)
            if (!tokenVerified) {
                res.end(JSON.stringify({ message: "invalid token" }))
                return
            }
        }
        //login and generate token
        if (method === "POST" && pathname === '/login') {
            req.on('end', () => {
                body = JSON.parse(body);
                const isUserPresent = userData.find((item) => {
                    if (item.email === body.email && item.password === body.password) {
                        return true;
                    }
                    else {
                        return false
                    }
                });

                if (isUserPresent) {
                    // generate jwt token here and return
                    const token = jwt.sign({ email: body.email }, process.env.PRIVATE_KEY, { expiresIn: '24h' })
                    res.end(`token : ${token}`);
                } else {
                    // res.writeHead
                    // (400, { "Content-type": "application-json" });
                    res.end(JSON.stringify({
                        message: "user credentials are not match"
                    }))
                }
            })
            return

        }
        else if (method === "POST" && pathname.indexOf('/user/add')!= -1){
            req.on('end', () => {
                body = JSON.parse(body);
                let result = userService.addUser(body)
                res.end(result)
            })
        }
        else if (method === "DELETE" && pathname.indexOf('/user')!= -1 && pathname.indexOf('/delete')!= -1 ){
            let result = userService.deleteUserById(urlSegment)
            res.end(result)
        }
        else if (method === "PUT" && pathname.indexOf('/user')!= -1 && pathname.indexOf('/update')!= -1){
            req.on('end', () => {
                body = JSON.parse(body);
                let result = userService.updateUser(body,urlSegment)
                res.end(result)
            })
        }
        else if (method === "GET" && pathname=='/user'){
            let result = userService.getAllUsers()
            res.end(result)
        }
        else {
            res.end(JSON.stringify({
                message: "api not found"
            }))
        }
    }
}
export default new UserController()
