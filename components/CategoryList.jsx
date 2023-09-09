import {AiOutlineMinusSquare} from "react-icons/ai"
import { useRouter } from "next/router"
import {BiDotsHorizontalRounded} from "react-icons/bi"
import { useState } from "react"

import { useTaskContext } from "../utils/TaskContext"


export default function CategoryList({categoryName}) {
    const router = useRouter()

    const {state, categoryList, dispatchCategories, dispatch} = useTaskContext()

    const [showOptions, setShowOptions] = useState(false)

    const {category} = router.query

    const activeCategory = category || "Default"

    const handleOptionsClick = (e) => {
        e.stopPropagation();
        setShowOptions(!showOptions)
    }

    // Function to handle edit and delete actions
    const handleEdit = (e) => {
        // Add logic to handle edit action here
        e.stopPropagation();
        console.log("Edit clicked for category:", categoryName);
    };

    const handleDelete = (e) => {
        // Add logic to handle delete action here
        // If a category is active, alert cannot delete active category navigate to another category to delete
        e.stopPropagation();
        if (activeCategory === categoryName) {
            alert("Cannot delete active category. Navigate to another category to delete")
            return
        }
        // Delete all todos in the state.tasks context with the category name as well
        const newTasks = state.tasks.filter((task) => task.category !== categoryName)
        dispatch({type: "delete-categoryTasks", payload: newTasks})
        dispatchCategories({type: "delete-category", payload: categoryName})
    };


    return (
            <div
                onClick={() => {
                    router.push(
                    categoryName === "Default" ? "/" : `/${categoryName}`
                    );
                }}
                className={`${
                    activeCategory === categoryName
                    ? "bg-purple-400 text-white"
                    : "text-purple-400 border border-purple-400 hover:bg-purple-300 hover:text-white"
                } my-3 py-1 px-1 rounded flex items-center gap-4 text-sm font-bold cursor-pointer relative`}
            >
            <AiOutlineMinusSquare />
            <p>{categoryName}</p>
            {/* Add the Dot icon only to categories other than "Default" */}
            {categoryName !== "Default" && (
                <BiDotsHorizontalRounded
                className="absolute right-2 text-xl"
                onClick={handleOptionsClick}
                />
            )}
            {/* Options menu */}
            {showOptions && categoryName !== "Default" && (
                <div className="bg-white z-40" >
                <ul className="absolute right-2 top-8 bg-white border border-purple-400 rounded-md shadow-md">
                    <li
                    className="py-1 px-2 text-purple-400 hover:bg-purple-400 hover:text-white cursor-pointer"
                    onClick={handleEdit}
                    >
                    Edit
                    </li>
                    <li
                    className="py-1 px-2 text-purple-400 hover:bg-purple-400 hover:text-white cursor-pointer"
                    onClick={handleDelete}
                    >
                    Delete
                    </li>
                </ul>
                </div>
            )}
            </div>
        );
}