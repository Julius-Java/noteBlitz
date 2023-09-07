import { createContext, useContext, useReducer, useEffect } from "react";
import {useForm} from "react-hook-form"
import { useState } from "react";

const TaskContext = createContext()

const todoReducer = (state, action) => {
    const {tasks, completedTasks} = state

    switch(action.type) {
        // Action for setting update per task object
        case "add-task" :
            return {...state, tasks: [...tasks, action.payload]}

        // Action for setting array of tasks from local storage
        case "set-tasks":
            return {...state, tasks: action.payload}

        // Action for removing completed tasks
        case "remove-task":
            const updatedTasks = tasks.filter(task => task.id !== action.payload)
            return {...state, tasks: updatedTasks}

        // Action for updating edited task
        case "update-task":
            const updatedTask = action.payload
            const updatedTaskIndex = tasks.findIndex((task) => task.id === updatedTask.id)
            if (updatedTaskIndex !== -1) {
                const updatedTasksArray = [...tasks]
                updatedTasksArray[updatedTaskIndex] = {...updatedTasksArray[updatedTaskIndex], title: updatedTask.title}
                return {...state, tasks: updatedTasksArray}
            }
            return state

        default:
            return state
    }
}

const categoryReducer = (state, action) => {
    // Action that adds a new category with an id and name to the state
    switch(action.type) {
        case "add-category":
            return [...state, action.payload]
        // Action that sets the categories from local storage
        case "set-categories":
            return action.payload
        default:
            return state
    }
}

export function TaskProvider({children}) {

    const initialState = {
        tasks: [],
    }

    const initialCategories = []

    const [state, dispatch] = useReducer(todoReducer, initialState)

    const [categoryList, dispatchCategories] = useReducer(categoryReducer, initialCategories)

    const [isEditing, setIsEditing] = useState(null)

    useEffect(() => {
        // Get tasks from local storage
        const savedTodos = JSON.parse(localStorage.getItem("TASK_CONTEXT"));
        if (savedTodos) {
            dispatch({ type: "set-tasks", payload: savedTodos.tasks });
        }

        // Get categories from local storage
        const savedCategories = JSON.parse(localStorage.getItem("CATEGORY_CONTEXT"));
        if (savedCategories) {
            dispatchCategories({type: "set-categories", payload: savedCategories.categories})
        }
    }, []);

    useEffect(() => {
        // Save categories to local storage
        const categoriesToStore = {
            categories: categoryList,
        };
        localStorage.setItem("CATEGORY_CONTEXT", JSON.stringify(categoriesToStore));

        const dataToStore = {
            tasks: state.tasks,
        };
        localStorage.setItem("TASK_CONTEXT", JSON.stringify(dataToStore));
    }, [state, categoryList]);

    return (
        <TaskContext.Provider
            value={
                {
                    state,
                    dispatch,
                    useForm,
                    isEditing,
                    setIsEditing,
                    categoryList,
                    dispatchCategories
                }
            }
        >
            {children}
        </TaskContext.Provider>
    )
}

export function useTaskContext() {
    return useContext(TaskContext)
}