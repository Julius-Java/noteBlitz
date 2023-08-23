import { createContext, useContext, useReducer } from "react";

const TaskContext = createContext()

const initialState = {
    tasks: [],
    completedTasks: [],
}

const todoReducer = (state, action) => {
    const {tasks, completedTasks} = state
    switch(action.type) {
        case "add-task" :
            return {...state, tasks: [...tasks, action.payload]}
        case "complete-task":
            return {...state, completedTasks: [...completedTasks, action.payload]}
        default:
            return state
    }
}

export function TaskProvider({children}) {
    const [state, dispatch] = useReducer(todoReducer, initialState)

    return (
        <TaskContext.Provider value={{state, dispatch}}>
            {children}
        </TaskContext.Provider>
    )
}

export function useTaskContext() {
    return useContext(TaskContext)
}