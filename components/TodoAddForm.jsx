import Button from "./Button"
import {useForm} from "react-hook-form"
import { useTaskContext } from "./TaskContext"
import { useState } from "react"

export default function TodoAddForm({toggleVisibility}) {
    const {register, handleSubmit, formState: {errors} } = useForm({mode: "all"})

    const {dispatch} = useTaskContext()

    // const [newTask, setNewTask] = useState('')

    const formSubmit = (data) => {
        const todoTask = data.task.trim()
        // setNewTask(todoTask)
        // Create task object to be added to context
        const task = {id: Date.now(), title: todoTask, completed: false}
        dispatch({type: "add-task", payload: task})
        console.log(task.title)
        // Reset input filed
        // setNewTask("")

        // Hide todo add form
        toggleVisibility()
    }

    return (
        <div
            onClick={() => toggleVisibility()}
            className="absolute z-40 bg-gray-600 bg-opacity-40 top-0 left-0 h-full w-full transition-all duration-200">
            <form
                className="bg-white max-w-xs w-[95%] mx-auto rounded-md mt-10 p-3"
                role="addTodo-form"
                onClick={(e) => e.stopPropagation()}
                onSubmit={handleSubmit(formSubmit)}
            >
                <label className="block font-semibold" htmlFor="todoItem">Add Todo</label>
                <div className="flex gap-3 items-center justify-center w-full py-1  mx-auto">
                    <input
                        className="border py-1 px-2 text-sm border-purple-400 rounded-md outline-purple-400 w-[75%] sm:w-full"
                        id="todoItem"
                        data-testid={"todo-input"}
                        type="text"
                        onClick={(e) => e.stopPropagation()}
                        {
                            ...register(
                                "task",
                                {
                                    required: "Add a task 🙄"
                                }
                            )
                        }
                    />
                    <Button type={"add-button"} />
                </div>
                <span className="block text-left text-xs text-red-500 font-bold">{errors.task?.message}</span>
            </form>
        </div>
    )
}