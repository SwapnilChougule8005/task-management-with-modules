import { userData } from "../mock-data/user-mock-data.js";

export class UserRepository {

    addUser(user) {
        userData.push(user)
    }
    getUserById(userId) {
       return userData.find(user=> user.userId == userId)
    }
    deleteUserById(id) {
        let index = userData.findIndex(user=>user.userId==id)
        userData.splice(index,1)
    }
    getAllUsers(){
        return userData
    }
    updateUserById(userId,userDetails) {
        let user = userData.find(u=>u.userId==userId)
        console.log("updated");
        
        if(user){
            Object.assign(user,userDetails)
        }
    }

}
