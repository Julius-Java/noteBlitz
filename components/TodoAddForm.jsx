import Button from "./Button"
// import {useForm} from "react-hook-form"
import { useTaskContext } from "./TaskContext"
import { useEffect, useRef } from "react"
import { useRouter } from "next/router"

export default function TodoAddForm() {
    const {state, dispatch, useForm, isEditing, setIsEditing} = useTaskContext()

    const inputRef = useRef(null)

    const router = useRouter()

    const {category} = router.query

    const categoryName = category || "Default"

    console.log("categoryName", categoryName)

    const {register, handleSubmit, formState: {errors}, reset, setValue, } = useForm({mode: "onSubmit"})

    useEffect(() => {
        // Populate the input field with edited task data when clicked
        function handleEditing({id, item}) {
            setValue("task", item)
            console.log("Edit function called")
        }

        // Enable editing if item clicked
        if (isEditing) {
            handleEditing(isEditing)
        }

    }, [setValue, isEditing])


    const formSubmit = (data) => {

        const todoTask = data.task.trim()

        // Reset input field after entering ToDo
        if (isEditing && isEditing.id) {
            // Update existing task
            dispatch({type: "update-task", payload: {id: isEditing.id, title: todoTask}})
        } else {
            // Create task object to be added to context
            const task = {id: Date.now(), title: todoTask, category: categoryName,  completed: false}
            dispatch({type: "add-task", payload: task})
        }
        // Reset and set editing status to null
        reset()
        setIsEditing(null)
    }

    return (
        <div
            // onClick={() => toggleVisibility()}
            className="w-full mt-4"
        >
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
                        ref={inputRef}
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