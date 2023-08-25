import { createContext, useContext, useReducer, useEffect } from "react";

const TaskContext = createContext()

const todoReducer = (state, action) => {
    const {tasks, completedTasks} = state
    switch(action.type) {
        // Action for setting update per task object
        case "add-task" :
            return {...state, tasks: [...tasks, action.payload]}
        case "complete-task":
            return {...state, completedTasks: [...completedTasks, action.payload]}

        // Action for setting array of tasks from local storage
        case "set-tasks":
            return {...state, tasks: action.payload}
        case "set-completed":
            return {...state, completedTasks: action.payload}

        // Action for removing completed tasks
        case "remove-task":
            const updatedTasks = tasks.filter(task => task.id !== action.payload)
            return {...state, tasks: updatedTasks}
        default:
            return state
    }
}

export function TaskProvider({children}) {

    const initialState = {
        tasks: [],
        // completedTasks: [],
    }

    const [state, dispatch] = useReducer(todoReducer, initialState)

    useEffect(() => {
        const savedData = JSON.parse(localStorage.getItem("TASK_CONTEXT"));
        if (savedData) {
            dispatch({ type: "set-tasks", payload: savedData.tasks });
            // dispatch({ type: "set-completed", payload: savedData.completedTasks });
        }
    }, []);

    useEffect(() => {
    const dataToStore = {
        tasks: state.tasks,
        completedTasks: state.completedTasks,
    };
        localStorage.setItem("TASK_CONTEXT", JSON.stringify(dataToStore));
    }, [state]);

    return (
        <TaskContext.Provider value={{state, dispatch}}>
            {children}
        </TaskContext.Provider>
    )
}

export function useTaskContext() {
    return useContext(TaskContext)
}