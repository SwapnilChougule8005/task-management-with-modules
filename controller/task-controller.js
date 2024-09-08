
import { decodeUrl } from '../utilities/UtilityFunc.js';
import { verifyToken } from '../utilities/authUtility.js';
import { TaskServices } from '../services/task-service.js';

const taskService = new TaskServices();
 class taskController {
    controller(req, res) {
        try {
            const method = req.method;
            const { parseUrl, pathname, urlSegment } = decodeUrl(req,res);
            let body = '';
            req.on('data', (chunk) => {
                body += chunk
            })

            //auth middleware executes for every route
            if (pathname.indexOf('/login') === -1) {
                let tokenVerified = verifyToken(req, res)
                if (!tokenVerified) {
                    res.end(JSON.stringify({ message: "invalid token" }))
                    return
                }
            }
            //create task
            if (method === "POST" && pathname === '/tasks') {
                req.on('end', () => {
                    body = JSON.parse(body);
                    let result = taskService.addTask(body)
                    console.log("responser",JSON.stringify(result));
                    
                    res.end(JSON.stringify(result))
                    return
                })
            }
            //21 bulk task creation
            if (method === "POST" && pathname === '/tasks/bulk') {
                req.on('end', () => {
                    body = JSON.parse(body);
                    let result = taskService.bulkAddTask(body)
                    res.end(JSON.stringify(result))
                    return
                })
            }
            //18. duplicate task
            if (method === "POST" && pathname.indexOf('/tasks') !== -1 && pathname.indexOf('/duplicate') !== -1) {
                let result = taskService.duplicateTask(urlSegment)
                res.end(JSON.stringify(result))
                return
            }
            //16. due date reminder
            else if (method === "GET" && pathname.indexOf('/tasks') !== -1 && pathname.indexOf('/due-soon') !== -1) {
                let result = taskService.dueDateReminder(parseUrl)
                res.end(JSON.stringify(result))
                return
            }
            //17. due date passed
            else if (method === "GET" && pathname.indexOf('/tasks') !== -1 && pathname.indexOf('/overdue') !== -1) {
                let overDueTasks = taskService.dueDatePassed()
                res.end(JSON.stringify(overDueTasks))
                return
            }
            //19. get archived tasks
            else if (method === "GET" && pathname.indexOf('/tasks') !== -1 && pathname.indexOf('/archived') !== -1) {
                let archivedTasks = taskService.archievedTasks()
                res.end(JSON.parse(archivedTasks))
                return
            }
            //get all comments by task
            else if (method === "GET" && pathname.indexOf('/tasks') !== -1 && pathname.indexOf('/comments') !== -1) {
                let allComments = taskService.getAllCommentsByTask(urlSegment)
                res.end(JSON.parse(allComments))
                return
            }
            //search task
            else if (method === "GET" && pathname === "/tasks/search") {
                let result = taskService.searchTasks(parseUrl)
                res.end(JSON.parse(result))
                return;
            }
            //get task
            else if (method === "GET" && pathname === '/tasks') {
                let allTasks = taskService.getAllTasks()
                res.end(JSON.stringify(allTasks))
                return
            }
            //get task by id
            else if (method == "GET" && pathname.indexOf('/tasks') !== -1) {
                let result = taskService.getTaskById(urlSegment)
                res.end(result)
                return
            }
            //change values of properties sent in body
            else if (method === "PUT" && pathname.indexOf('/tasks') !== -1) {
                req.on('end', () => {
                    body = JSON.parse(body);
                    let result = taskService.changeValuesOfPropertiesSentInBody(urlSegment,body)
                    res.end(JSON.stringify(result))
                    return
                })
            }
            //15. delete all completed task 
            else if (method === "DELETE" && pathname.indexOf('/tasks') !== -1 && pathname.indexOf('/delete-completed') !== -1) {
               let result = taskService.deleteAllCompletedTask()
               res.end(result)
                return
            }
            //delete task by id
            else if (method === "DELETE" && pathname.indexOf('/tasks') !== -1) {
                let result = taskService.deleteTaskById(urlSegment)
                res.end(result)
                return
            }
            //task complete all 14
            else if (method === "PATCH" && pathname === "/tasks/complete-all") {
                let result = taskService.completeAllTask()
                res.end(result)
                return
            }
            //change priority
            else if (method === "PATCH" && pathname.indexOf('/tasks') !== -1 && pathname.indexOf('/priority') !== -1) {
                req.on('end', () => {
                    body = JSON.parse(body);
                    let result =  taskService.changePriority(urlSegment,body)
                    res.end(result)
                    return
                })
            }
            //change assignee
            else if (method === "PATCH" && pathname.indexOf('/tasks') !== -1 && pathname.indexOf('/assign') !== -1) {
                req.on('end', () => {
                    body = JSON.parse(body);
                    let result = taskService.changeAssignee(urlSegment,body)
                    res.end(result)
                    return
                })
            }
            //unassign task
            else if (method === "PATCH" && pathname.indexOf('/tasks') !== -1 && pathname.indexOf('/unassign') !== -1) {
                let result = taskService.unassignTask(urlSegment)
                res.end(result)
                return
            }
            //categorize task
            else if (method === "PATCH" && pathname.indexOf('/tasks') !== -1 && pathname.indexOf('/categorize') !== -1) {
                req.on('end', () => {
                    body = JSON.parse(body);
                    let result = taskService.categorizeTask(urlSegment,body)
                    res.end(result)
                    return
                })
            }
            //task completion 13
            else if (method === "PATCH" && pathname.indexOf('/tasks') !== -1 && pathname.indexOf('/complete') !== -1) {
                let result = taskService.taskCompletion(urlSegment) 
                res.end(result)
                return
            }
            //add comment
            else if (method === "POST" && pathname.indexOf('/tasks') !== -1 && pathname.indexOf('/comments') !== -1) {
                req.on('end', () => {
                    body = JSON.parse(body);
                     let result = taskService.addComment(urlSegment,body)
                    res.end(result)
                    return
                })
                return
            }
            //19. archive tasks
            else if (method === "PATCH" && pathname.indexOf('/tasks') !== -1 && pathname.indexOf('/archive') !== -1) {
                let result = taskService.archieveTasks(urlSegment)
                res.send(result)
                return
            }
        }
        catch (e) {
            console.log(e)
        }
    }

}

export default new taskController()