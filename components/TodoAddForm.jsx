import Button from "./Button"
import {useForm} from "react-hook-form"
import { useTaskContext } from "./TaskContext"
import { useState } from "react"

export default function TodoAddForm({toggleVisibility}) {
    const {register, handleSubmit, formState: {errors}, reset } = useForm({mode: "onSubmit"})

    const {dispatch} = useTaskContext()

    const formSubmit = (data) => {

        const todoTask = data.task.trim()

        // Create task object to be added to context
        const task = {id: Date.now(), title: todoTask, completed: false}
        dispatch({type: "add-task", payload: task})

        // Hide todo add form
        // toggleVisibility()

        reset()
    }

    return (
        <div
            // onClick={() => toggleVisibility()}
            className="w-full mt-4">
            <form
                className="w-full mx-auto rounded-md p-3 border border-dotted border-purple-500"
                role="addTodo-form"
                onClick={(e) => e.stopPropagation()}
                onSubmit={handleSubmit(formSubmit)}
            >
                {/* <label className="block font-semibold" htmlFor="todoItem">Add Todo</label> */}
                <div className="flex gap-3 items-center justify-center w-full py-1 mx-auto">
                    <input
                        className="border py-1 px-2 text-sm border-purple-400 rounded-md outline-purple-400 w-[80%] sm:w-full"
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