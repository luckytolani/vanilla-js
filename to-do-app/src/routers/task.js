import * as taskController from '../controllers/task.controller.js';

const taskRouter = (urlArray, body, method) => {
    try {
        switch(method){
            case "POST" :{
                return taskController.createTask(body);
            }
            case "GET" :{
                return taskController.getTask(body?.email);
            }
            case "PATCH" :{
                return taskController.updateTask(body);
            }
            case "DELETE" :{
                return taskController.deleteTask(body?.taskId);
            } 
        }
    } catch (error) {
        return {status:false , message:"something went wrong" , error}
    }
    
}
export default taskRouter