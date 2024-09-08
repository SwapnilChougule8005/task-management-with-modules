import http from 'http';
import url from 'url';

const PORT = 3000;

const server = http.createServer((req,res) => {
    const method = req.method;
  
    const parseUrl = url.parse(req.url, true);
    const pathname = parseUrl.pathname;
    console.log(pathname);
    
    res.writeHead(200, {"content-type":"application/json"});

    
        let body ='';
        req.on('data', (chunk) => {
            body += chunk
        })
        if ( method=="POST" && pathname== '/tasks' ){
            req.on('end', () => {
                body = JSON.parse(body);
        
                res.end(JSON.stringify(body))
                return
            })
        }
        if (method=="GET" && pathname== '/tasks'){
            res.end(JSON.stringify(task))
            return
        }
        
        if (  method=="GET" && pathname== '/tasks'){
            req.on('end', () => {
                res.end(JSON.stringify(body))
                return
            })
        }
    // res.end("Task Management Application");
})

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});

const task = [
    {
        "id": 1,
        "title": "Task Title",
        "description":"Task Description",
        "dueDate":"2024-08-20",
        "status":"pending",
        "priority":"medium"
    },
    {
        "id": 2,
        "title": "Task Title",
        "description":"Task Description",
        "dueDate":"2024-08-20",
        "status":"pending",
        "priority":"medium"
    },
    {
        "id": 3,
        "title": "Task Title",
        "description":"Task Description",
        "dueDate":"2024-08-20",
        "status":"pending",
        "priority":"medium"
    },
    {
        "id": 4,
        "title": "Task Title",
        "description":"Task Description",
        "dueDate":"2024-08-20",
        "status":"pending",
        "priority":"medium"
    }
]

const  http = require('http')
// const url =  require('url')

// const PORT = 3000;
// let nextId = 1;
// const tasks = [];
// const historyStore = [];

// const server = http.createServer((req, res) => {
//     const method = req.method;

//     const parseUrl = url.parse(req.url, true);
//     const pathname = parseUrl.pathname;
//     const urlSegment = pathname.split("/").filter((urlseg) => !!urlseg)

//     res.writeHead(200, { "content-type": "application/json" });

//     let body = '';
//     req.on('data', (chunk) => {
//         body += chunk
//     })
//     //create task
//     if (method == "POST" && pathname == '/tasks') {
//         req.on('end', () => {
//             body = JSON.parse(body);

//             body.id = nextId++
//             tasks.push(body)
//             res.end(JSON.stringify(body))
//             historyStore.push({
//                 taskId: body.id,
//                 time: new Date(),
//                 newTask: true,
//                 details: body
//             })

//             return
//         })
//     }
//     //21 bulk task creation
//     if (method == "POST" && pathname == '/tasks/bulk') {
//         req.on('end', () => {
//             body = JSON.parse(body);

//             for (const task of body) {
//                 task.id = nextId++
//                 tasks.push(task)
//             }
            
//             historyStore.push({
//                 time: new Date(),
//                 newTask: true,
//                 details: body
//             })
            
//             res.end(JSON.stringify(body))
//             return
//         })
//     }
//     //18. duplicate task
//     if (method == "POST" && pathname.indexOf('/tasks') !== -1 && pathname.indexOf('/duplicate') !== -1 ) {
//         let newTaskId = nextId++
//         let id = parseInt(urlSegment[1], 10)
//         let taskIndex = tasks.findIndex(task => task.id == id)
//         if(taskIndex == -1) {
//             res.end("task not found")
//             return
//         }
//         let oldTask = tasks[taskIndex]
//         oldTask.id = newTaskId
//         res.end(JSON.stringify(oldTask))
//         tasks.push(oldTask)
//         historyStore.push({
//             taskId: newTaskId,
//             time: new Date(),
//             newTask: true,
//             details: tasks[taskIndex]
//         })
//         return
//     }
//      //16. due date reminder
//     else if (method == "GET" && pathname.indexOf('/tasks') !== -1 && pathname.indexOf('/due-soon') !== -1) {
//         let queryParams = parseUrl.query
//         let days = queryParams.days ? queryParams.days  : 0;
//         const today = new Date();
//         const next7Days = new Date(today);
//         next7Days.setDate(today.getDate() + days); // Add 7 days to current date
//         //incomplete and due date near tasks
//         let allDueTasks = tasks.filter(task => {
//             const taskDueDate = new Date(task.dueDate);
//             return task.status!="completed" && taskDueDate >= today && taskDueDate <= next7Days;
//         });
//         res.end(JSON.parse(allDueTasks))
//     }
//     //17. due date passed
//     else if (method == "GET" && pathname.indexOf('/tasks') !== -1 && pathname.indexOf('/overdue') !== -1) {
//         const today = new Date()
//         //incomplete and due date near tasks
//         let overdueTasks = tasks.filter(task => {
//             const taskDueDate = new Date(task.dueDate)
//             return task.status!="completed" && taskDueDate < today
//         })
//         res.end(JSON.parse(overdueTasks))
//     }
//     //get all comments by task
//     else if (method == "GET" && pathname.indexOf('/tasks') !== -1 && pathname.indexOf('/comments') !== -1) {

//         for (let task of tasks) {
//             if (task.id == urlSegment[1]) {
//                 res.end(JSON.stringify(task.comments))
//                 return
//             }
//         }
//         res.end("task not found")
//         return
//     }
//     //search task
//     else if (method == "GET" && pathname == "/tasks/search") {
//         let queryParams = parseUrl.query
//         const keyword = queryParams.q ? queryParams.q.toLowerCase() : '';

//         if (!keyword) {
//             res.end(JSON.stringify({ error: "Please provide a search keyword." }));
//             return;
//         }
//         // Filter tasks based on the keyword in title or description
//         let matchedTasks = tasks.filter(task =>
//             task.title.toLowerCase().indexOf(keyword) !== -1 ||
//             task.description.toLowerCase().indexOf(keyword) !== -1
//         );
        
//         if (matchedTasks.length > 0) {
//             res.end(JSON.stringify(matchedTasks));
//         } else {
//             res.end(JSON.stringify({ message: "No tasks found matching your search query." }));
//         }

//         return;
//         return
//     }
//     //get task
//     else if (method == "GET" && pathname == '/tasks') {
//         res.end(JSON.stringify(tasks))
//         return
//     }
//     //get task by id
//     else if (method == "GET" && pathname.indexOf('/tasks') !== -1) {

//         for (let task of tasks) {
//             if (task.id == urlSegment[1]) {
//                 res.end(JSON.stringify(task))
//                 return
//             }
//         }
//         res.end("not found")
//         return
//     }
//     //change values of properties sent in body
//     else if (method === "PUT" && pathname.indexOf('/task') !== -1) {
//         req.on('end', () => {
//             body = JSON.parse(body);
//             const id = parseInt(urlSegment[1], 10)
//             const taskIndex = tasks.findIndex(task => task.id == id)
//             if (taskIndex < 0) {
//                 res.end("task not found.")
//                 return
//             }
//             if (taskIndex !== -1) {
//                 let historyObject = {
//                     id: id,
//                     time: new Date()
//                 }
//                 for (const key in body) {
//                     historyObject["old" + key] = tasks[taskIndex][key]
//                     historyObject["new" + key] = body[key]
//                     tasks[taskIndex][key] = body[key]
//                 }
//             }

//             res.end(JSON.stringify(tasks[taskIndex]))
//             return
//         })
//     }
//     //15. delete all completed task 
//     else if (method === "DELETE" && pathname.indexOf('/task') !== -1 && pathname.indexOf('/delete-completed') !== -1) {
//         let completed = tasks.filter(task => task.status && task.status.toLowerCase() == "completed")
//         tasks = tasks.filter(task => task.status != 'completed')
//         res.end(completed.length)
//         return
//     }
//     //delete task by id
//     else if (method === "DELETE" && pathname.indexOf('/task') !== -1) {
//         const id = parseInt(urlSegment[1], 10)
//         const taskIndex = tasks.findIndex(task => task.id == id)
//         if (taskIndex < 0) {
//             res.end("task not found.")
//             return
//         }
//         if (taskIndex !== -1) {
//             let deletedTasks = tasks.splice(taskIndex, 1)
//             historyStore.push({
//                 taskId: id,
//                 time: new Date(),
//                 deleted: true,
//                 deletedTasks: deletedTasks
//             });
//             res.end(JSON.stringify(deletedTasks))
//             return
//         }

//     }
//     //change priority
//     else if (method === "PATCH" && pathname.indexOf('/task') !== -1 && pathname.indexOf('/priority') !== -1) {
//         req.on('end', () => {
//             body = JSON.parse(body);
//             const id = parseInt(urlSegment[1], 10)
//             const taskIndex = tasks.findIndex(task => task.id == id)
//             if (taskIndex < 0 || body.priority == undefined) {
//                 res.end("task priority not found.")
//                 return
//             }
//             historyStore.push({
//                 id: id,
//                 oldPriority: tasks[taskIndex].priority,
//                 newPriority: body.priority
//             })
//             tasks[taskIndex].priority = body.priority
//             res.end(JSON.stringify(tasks[taskIndex]))
//             return
//         })
//     }
//     //change assignee
//     else if (method === "PATCH" && pathname.indexOf('/task') !== -1 && pathname.indexOf('/assign') !== -1) {
//         req.on('end', () => {
//             body = JSON.parse(body);
//             const id = parseInt(urlSegment[1], 10)
//             const taskIndex = tasks.findIndex(task => task.id == id)
//             if (taskIndex < 0 || body.assignedTo == undefined) {
//                 res.end("task assignee not found.")
//                 return
//             }
//             historyStore.push({
//                 id: id,
//                 oldAssignee: tasks[taskIndex].assignedTo,
//                 newAssignee: body.assignedTo
//             })
//             tasks[taskIndex].assignedTo = body.assignedTo
//             res.end(JSON.stringify(tasks[taskIndex]))
//             return
//         })
//     }
//     //unassign task
//     else if (method === "PATCH" && pathname.indexOf('/task') !== -1 && pathname.indexOf('/unassign') !== -1) {
//         const id = parseInt(urlSegment[1], 10)
//         const taskIndex = tasks.findIndex(task => task.id == id)
//         if (taskIndex < 0) {
//             res.end("task id not found.")
//             return
//         }
//         historyStore.push({
//             id: id,
//             oldAssignee: tasks[taskIndex].assignedTo,
//             newAssignee: null
//         })
//         tasks[taskIndex].assignedTo = null
//         res.end(JSON.stringify(tasks[taskIndex]))
//         return
//     }
//     //categorize task
//     else if (method === "PATCH" && pathname.indexOf('/task') !== -1 && pathname.indexOf('/categorize') !== -1) {
//         req.on('end', () => {
//             body = JSON.parse(body);
//             const id = parseInt(urlSegment[1], 10)
//             const taskIndex = tasks.findIndex(task => task.id == id)
//             if (taskIndex < 0 && body.category == undefined) {
//                 res.end("task category not found.")
//                 return
//             }
//             historyStore.push({
//                 id: id,
//                 oldAssignee: tasks[taskIndex].category,
//                 newAssignee: body.category
//             })
//             tasks[taskIndex].category = body.category
//             res.end(JSON.stringify(tasks[taskIndex]))
//         })
//         return
//     }
//     //task completion 13
//     else if (method === "PATCH" && pathname.indexOf('/task') !== -1 && pathname.indexOf('/complete') !== -1) {
//         const id = parseInt(urlSegment[1], 10)
//         const taskIndex = tasks.findIndex(task => task.id == id)
//         if (taskIndex < 0 ) {
//             res.end("task not found.")
//             return
//         }
//         historyStore.push({
//             id: id,
//             oldStatus: tasks[taskIndex].status,
//             newStatus: "completed"
//         })
//         tasks[taskIndex].status = "completed"
//         res.end(JSON.stringify(tasks[taskIndex]))
//         return
//     }
//      //task complete all 14
//     else if (method === "PATCH" && pathname.indexOf('/task') !== -1 && pathname.indexOf('/complete-all') !== -1) {
//         let result = tasks.filter(task => task.status && task.status.toLowerCase() == "pending" )
//         for (const task of tasks) {
//             task.status = "completed"
//         }
//         res.end(JSON.stringify(result))
//         return
//     }
//     //add comment
//     else if (method === "POST" && pathname.indexOf('/task') !== -1 && pathname.indexOf('/comments') !== -1) {
//         req.on('end', () => {
//             body = JSON.parse(body);
//             const id = parseInt(urlSegment[1], 10)
//             const taskIndex = tasks.findIndex(task => task.id == id)
//             if (taskIndex < 0 || body.comment == undefined || body.commentedBy == undefined) {
//                 res.end("task or comment not found.")
//                 return
//             }
//             historyStore.push({
//                 id: id,
//                 newComment: body,
//             })
//             //if comment array is present then push
//             if (Array.isArray(tasks[taskIndex].comments)) {
//                 tasks[taskIndex].comments.push({
//                     comment: body.comment,
//                     commentedBy: body.commentedBy
//                 })
//             }
//             //else create array and push
//             else {
//                 tasks[taskIndex].comments = [{
//                     comment: body.comment,
//                     commentedBy: body.commentedBy
//                 }]
//             }
//             res.end(JSON.stringify(tasks[taskIndex]))
//         })
//         return
//     }

//     // res.end("Task Management Application");
// })

// server.listen(PORT, () => {
//     console.log(`Server running at http://localhost:${PORT}/`);
// });
