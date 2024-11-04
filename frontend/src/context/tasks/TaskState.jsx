import { useState } from "react";
import TaskContext from "./TaskContext";

const TaskState = (props) => {
    const [tasks, setTasks] = useState([])
    const host = "http://localhost:5000"

    const fetchTask = async () => {
        const response = await fetch(`${host}/api/tasks/fetch-tasks`, {
            method: 'GET',
            headers: {
              'auth-token': localStorage.getItem("token"),
            }
          });
        
        const data = await response.json();
        setTasks(data.tasks)
    }
    
    const addTask = async (name, description, status, tag) => {
        const response = await fetch(`${host}/api/tasks/create-task`, {
            method: 'POST',
            headers: {
              'auth-token': localStorage.getItem("token"),
              "Content-Type": "application/json"
            },
            body: JSON.stringify({name, description, status, tag})
          });
        
        const data = await response.json();
        fetchTask();

        return data
    }

    const removeTask = async (id) => {
        const response = await fetch(`${host}/api/tasks/remove-task/${id}`, {
            method: 'DELETE',
            headers: {
              'auth-token': localStorage.getItem("token")
            }
          });
        
        const data = await response.json();
        console.log(data);
        fetchTask();

        return data
    }

    const editTask = async (name, description, status, tag, id) => {
      const response = await fetch(`${host}/api/tasks/update-task/${id}`, {
          method: 'PUT',
          headers: {
            'auth-token': localStorage.getItem("token"),
            "Content-Type": "application/json"
          },
          body: JSON.stringify({name, description, status, tag})
        });
      
      const data = await response.json();
      fetchTask();
      
      return data
    }

    return (
        <TaskContext.Provider value={{tasks, fetchTask, addTask, removeTask, editTask}}>
            { props.children }
        </TaskContext.Provider>
    )
}

export default TaskState