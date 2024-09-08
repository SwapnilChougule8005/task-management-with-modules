import { UserRepository } from "../repository/user-repository.js"
const userRepo = new UserRepository()
let nextUserId = 1

export class UserServices {
    addUser(body){
        if (body.email==undefined || body.password==undefined){
            return "userId or email or password not found."
        }
        let user = {
            userId: nextUserId,
            email: body.email,
            password : body.password
        }
        userRepo.addUser(user)
        let userFromDB = userRepo.getUserById(nextUserId)
        nextUserId++
        return JSON.stringify({status:true,userFromDB})
    }
    deleteUserById(urlSegment){
        let userID = urlSegment[1]
        return "deleted"
    }
    updateUser(userDetails,urlSegment){
        let userId = urlSegment[1]
        if (userId==undefined){
            return "user not found"
        }
        userRepo.updateUserById(userId,userDetails)
        console.log("service retuened");
        
        return "user updated"
    }
    getAllUsers(){
        let result = userRepo.getAllUsers()
        return JSON.stringify(result)
    }
}
 
