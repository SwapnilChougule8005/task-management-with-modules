import { TaskRepository } from "../repository/task-repository.js";
let taskRepo = new TaskRepository()
// let nextId = 1;
import {nextId} from '../mock-data/task-mock-data.js' 
export class TaskServices {
    constructor() {
        this.TaskRepository = new TaskRepository();
    }
    addTask(task) {
        task.id = nextId++
        taskRepo.addTask(task)
        taskRepo.addHistory({
            taskId: task.id,
            time: new Date(),
            newTask: true,
            details: task
        })
        return task;
    }
    bulkAddTask(tasks) {
        for (const task of tasks) {
            task.id = nextId++
            taskRepo.addTask(task)
        }
        taskRepo.addHistory({
            time: new Date(),
            newTask: true,
            details: tasks
        })
    }
    duplicateTask(urlSegment) {
        let newTaskId = nextId++
        let id = parseInt(urlSegment[1], 10)
        let taskIndex = taskRepo.findIndex(id)
        if (taskIndex == -1) {
            return "task not found"
        }
        let oldTask = taskRepo.getTaskByIndex(taskIndex)
        oldTask.id = newTaskId
        taskRepo.addTask(oldTask)
        taskRepo.addHistory({
            taskId: newTaskId,
            time: new Date(),
            newTask: true,
            details: taskRepo.getTaskByIndex(taskIndex)
        })
        return oldTask
    }
    dueDateReminder(parseUrl) {
        let queryParams = parseUrl.query
        let days = queryParams.days ? queryParams.days : 0;
        const today = new Date();
        const next7Days = new Date(today);
        next7Days.setDate(today.getDate() + days); // Add 7 days to current date
        //incomplete and due date near tasks
        let allDueTasks = taskRepo(today, next7Days)
        return allDueTasks
    }
    dueDatePassed() {
        const today = new Date()
        return taskRepo.overDueTasks(today)
    }
    archievedTasks() {
        let archivedTasks = taskRepo.filterTasks("status", "archived")
        return archivedTasks
    }
    getAllCommentsByTask(urlSegment) {
        let task = taskRepo.getTaskById(urlSegment[1])
        return task.comments || "task not found"
    }
    searchTasks(parseUrl) {
        let queryParams = parseUrl.query
        const keyword = queryParams.q ? queryParams.q.toLowerCase() : '';

        if (!keyword) {
            return { error: "Please provide a search keyword." }
        }
        // Filter tasks based on the keyword in title or description
        let matchedTasks = taskRepo.searchTaskUsingKeyWord(keyword)
        if (matchedTasks.length > 0) {
            return matchedTasks
        } else {
            return { message: "No tasks found matching your search query." }
        }
    }
    getAllTasks() {
        return taskRepo.getAllTasks()
    }
    getTaskById(urlSegment) {
        let task = taskRepo.getTaskById(urlSegment[1])
        return JSON.stringify(task) || "task not Found"
    }
    changeValuesOfPropertiesSentInBody(urlSegment, body) {
        const id = parseInt(urlSegment[1], 10)
        const taskIndex = taskRepo.findIndex(id)
        if (taskIndex < 0) {
            res.end("task not found.")
            return
        }
        if (taskIndex !== -1) {
            let historyObject = {
                id: id,
                time: new Date()
            }
            for (const key in body) {
                historyObject["old" + key] = taskRepo.getTaskByIndex(taskIndex)[key]
                historyObject["new" + key] = body[key]
                taskRepo.setValueOfSpecificProperty(taskIndex, key, body[key])
            }
        }
        taskRepo.getTaskByIndex(taskIndex)
    }
    deleteAllCompletedTask() {
        let completed = taskRepo.filterTasks("status", "completed")
        taskRepo.deleteTasksCompleted()
        return completed.length.toString()
    }
    async deleteTaskById(urlSegment) {
        const id = parseInt(urlSegment[1], 10)
        const taskIndex = taskRepo.findIndex(id)
        if (taskIndex < 0) {
            res.end("task not found.")
            return
        }
        if (taskIndex !== -1) {
            let deletedTasks = taskRepo.deleteTaskAtIndex(taskIndex)
            taskRepo.addHistory({
                taskId: id,
                time: new Date(),
                deleted: true,
                deletedTasks: deletedTasks
            });
            return JSON.stringify(deletedTasks)
        }
        return { status: false, reason: "task not found" }
    }
    async updateTask(task) {

    }
    completeAllTask() {
        let result = taskRepo.getTaskWithStatus("pending")
        taskRepo.completeAllTasks()
        return JSON.stringify(result)
    }
    changePriority(urlSegment, body) {
        const id = parseInt(urlSegment[1], 10)
        const taskIndex = taskRepo.findIndex(id)
        if (taskIndex < 0 || body.priority == undefined) {
            res.end("task priority not found.")
            return
        }
        taskRepo.addHistory({
            id: id,
            oldPriority: taskRepo.getTaskByIndex(taskIndex).priority,
            newPriority: body.priority
        })
        taskRepo.setValueOfSpecificProperty(taskIndex, "priority", body.priority)
        return JSON.stringify(taskRepo.getTaskByIndex(taskIndex))
    }
    changeAssignee(urlSegment, body) {
        const id = parseInt(urlSegment[1], 10)
        const taskIndex = taskRepo.findIndex(id)
        if (taskIndex < 0 || body.assignedTo == undefined) {
            return "task assignee not found."
        }
        taskRepo.addHistory({
            id: id,
            oldAssignee: taskRepo.getTaskByIndex(taskIndex).assignedTo,
            newAssignee: body.assignedTo
        })
        taskRepo.setValueOfSpecificProperty(taskIndex, 'assignedTo', body.assignedTo)
        return JSON.stringify(taskRepo.getTaskByIndex(taskIndex))
    }

    unassignTask(urlSegment) {
        const id = parseInt(urlSegment[1], 10)
        const taskIndex = taskRepo.findIndex(id)
        if (taskIndex < 0) {
            res.end("task id not found.")
            return
        }
        taskRepo.addHistory({
            id: id,
            oldAssignee: taskRepo.getTaskByIndex(taskIndex),
            newAssignee: null
        })
        taskRepo.setValueOfSpecificProperty(taskIndex, 'assignedTo', null)
        return JSON.stringify(taskRepo.getTaskByIndex(taskIndex))
    }
    categorizeTask(urlSegment, body) {
        const id = parseInt(urlSegment[1], 10)
        const taskIndex = taskRepo.findIndex(id)
        if (taskIndex < 0 && body.category == undefined) {
            return "task category not found."
        }
        taskRepo.addHistory({
            id: id,
            oldAssignee: taskRepo.getTaskByIndex(taskIndex).category,
            newAssignee: body.category
        })
        taskRepo.setValueOfSpecificProperty(taskIndex, 'category', body.category)
        return JSON.stringify(taskRepo.getTaskByIndex(index))
    }
    taskCompletion(urlSegment) {
        const id = parseInt(urlSegment[1], 10)
        const taskIndex = taskRepo.findIndex(id)
        if (taskIndex < 0) {
            return "task not found."
        }
        taskRepo.addHistory({
            id: id,
            oldStatus: taskRepo.getTaskByIndex(taskIndex).status,
            newStatus: "completed"
        })
        taskRepo.setValueOfSpecificProperty(taskIndex, 'status', 'completed')
        return JSON.stringify(taskRepo.getTaskByIndex(taskIndex))
    }
    addComment(urlSegment,body) {
        const id = parseInt(urlSegment[1], 10)
        const taskIndex = taskRepo.findIndex(id)
        if (taskIndex < 0 || body.comment == undefined || body.commentedBy == undefined) {
            return "task or comment not found."
        }
        taskRepo.addHistory({
            id: id,
            newComment: body,
        })
        //if comment array is present then push
        taskRepo.addComment(taskIndex,comment,commentedBy)
        return JSON.stringify(taskRepo.getTaskByIndex(taskIndex))
    }
    archieveTasks(urlSegment){
        const id = parseInt(urlSegment[1], 10)
        const taskIndex = taskRepo.findIndex(id)
        if (taskIndex < 0) {
            return "task not found."
        }
        taskRepo.addHistory({
            id: id,
            archived: true
        })
        taskRepo.setValueOfSpecificProperty(taskIndex,'status','archived')
        return JSON.stringify(taskRepo.getTaskByIndex(taskIndex))
    }
}