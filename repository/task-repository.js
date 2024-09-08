// import {tasks} from '../mock-data/Task-mock-data.js'
let tasks = [];
let historyStore = [];

export class TaskRepository { 
    async addTask(task){
      console.log("pushed",task);
      
      tasks.push(task)
    }
    async deleteTaskAtIndex(taskIndex){
      return tasks.splice(taskIndex, 1)
   }
   async updateTask(task){

   }
   async addHistory(historyObject){
      historyStore.push(historyObject)
   }
   findIndex(id){
      return tasks.findIndex(task => task.id == id)
   }
   getTaskByIndex(taskIndex){
      return tasks[taskIndex]
   }
   getTaskById(id){
      return tasks.find(task => task.id == id)
   }
   addComment(taskIndex,comment,commentedBy){
      if(Array.isArray(tasks[taskIndex].comments)){
         tasks[taskIndex].comments.push({
            comment: comment,
            commentedBy: commentedBy
         })
      } else {
         tasks[taskIndex].comments = [{
            comment: comment,
            commentedBy: commentedBy
         }]
      }
   }
   searchTaskUsingKeyWord(keyword){
      let matchedTasks = tasks.filter(task =>
         task.title.toLowerCase().indexOf(keyword) !== -1 ||
         task.description.toLowerCase().indexOf(keyword) !== -1
     );
     return matchedTasks
   }
   tasksDueInNextSevenDays(today,next7Days){
      tasks.filter(task => {
         const taskDueDate = new Date(task.dueDate);
         return task.status != "completed" && taskDueDate >= today && taskDueDate <= next7Days;
     });
   }
   overDueTasks(today){
      let overdueTasks = tasks.filter(task => {
         const taskDueDate = new Date(task.dueDate)
         return task.status != "completed" && taskDueDate < today
     })
     return overdueTasks
   }

   filterTasks(property,value){
     return tasks.filter(task => task[property] == value)
   }
   deleteTasksCompleted(){
      tasks = tasks.filter(task => task.status == 'completed')
   }
   getAllTasks(){
      return tasks
   }
   setValueOfSpecificProperty(taskIndex,key,value){
      tasks[taskIndex][key] = value
   }
   getTaskWithStatus(value){
     return tasks.filter(task => task.status && task.status.toLowerCase() == value)
   }
   completeAllTasks(){
      for (const task of tasks) {
         task.status = "completed"
      }
   }
}
