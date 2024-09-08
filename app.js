import http from'http';
import { decodeUrl } from './utilities/UtilityFunc.js';
import  'dotenv/config'
import taskController  from './controller/task-controller.js';
import userController  from './controller/user-controller.js';


const server = http.createServer((req, res) => {

const  {urlSegment,pathname}   = decodeUrl(req,res);
   
    res.writeHead(200, { "content-type": "application/json" });
    console.log("segments",urlSegment);
    

    if(urlSegment[0] === "tasks"){
       taskController.controller(req,res)
    }
    else if(pathname === '/login' || urlSegment[0] === "user" ){
        userController.controller(req,res)
    }
    else {
        res.end(JSON.stringify({status:false,reason:"api not found"}))
    }
    return
})


server.listen( process.env.PORT, () => {
    console.log(`Server running at http://localhost:${ process.env.PORT}/`);
});
