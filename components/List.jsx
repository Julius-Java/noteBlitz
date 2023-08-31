import {MdDeleteOutline} from "react-icons/md"
import {BiUndo} from "react-icons/bi"
import { useTaskContext } from "./TaskContext";

function List({completed, item, id, completedStatus}) {
    const {state, dispatch, setIsEditing} = useTaskContext()

    // console.log(item)
    // console.log(completedStatus)

    const handleComplete = (id) => {
        const updatedTasks = state.tasks.map(task => {
            if (task.id === id) {
                return { ...task, completed: true };
            }
            return task;
        });

        dispatch({ type: "set-tasks", payload: updatedTasks });
    }

    const handleUndoAndDelete = (id, completedStatus, toBeDeleted) => {
        // Undos a task
        if (completedStatus && !toBeDeleted) {
            const updatedTasks = state.tasks.map(task => {
                if (task.id === id) {
                    return { ...task, completed: false };
                }
                return task;
            });

            dispatch({ type: "set-tasks", payload: updatedTasks });
        } else {
            dispatch({type: "remove-task", payload: id}) // Deletes a task
            setIsEditing(null)
        }
    }

    const handleEditingState = (id, completedStatus, item) => {
        if (!completedStatus) {
            setIsEditing({id, item})
            console.log("Set Editing data")
        } else {
            setIsEditing(null)
        }
    }

    return (
        <li
            className={`${completed ? "border-2 text-purple-300 border-purple-400" : "border-none bg-purple-300 text-white"} list-none flex place-items-center cursor-pointer mb-3 group  rounded-lg font-semibold px-3 py-2`}
            data-testid={"list-component"}
            role="list-item"
            onClick={() => handleEditingState(id, completedStatus, item)}
        >
            <div className="flex gap-4 items-center lg:group">
                {
                    !completed
                    &&
                        <input className="cursor-pointer"
                        id="list-item"
                        data-testid="list-checkBox"
                        type="checkbox"
                        onChange={(e) => {
                            e.stopPropagation()
                            handleComplete(id, completedStatus, item)
                        }}
                        onClick={(e) => {e.stopPropagation()}}
                        value={item}
                    />
                }
                <label
                    className={`${completed && "line-through decoration-purple-400 decoration-2"}`}
                    // htmlFor="list-item"
                >
                    {item}
                </label>
            </div>

            {
                !completed
                ?
                (
                    <div
                        className="block text-[#DC143C] ms-auto lg:hidden lg:group-hover:block"
                        role="delete-button"
                        onClick={(e) => {
                                e.stopPropagation()
                                handleUndoAndDelete(id, completedStatus, true)
                            }
                        }
                    >
                        <MdDeleteOutline/>
                    </div>
                )
                :
                (
                    <div className="flex justify-center items-center gap-2 ms-auto">
                        <div
                            className="block text-[#DC143C] ms-auto lg:hidden lg:group-hover:block"
                            role="undo-button"
                            onClick={(e) => {
                                e.stopPropagation()
                                handleUndoAndDelete(id, completedStatus, false)
                            }
                        }
                        >
                            <BiUndo/>
                        </div>

                        <div
                            className="block text-[#DC143C] ms-auto lg:hidden lg:group-hover:block"
                            role="delete-button"
                            onClick={(e) => {
                                e.stopPropagation()
                                handleUndoAndDelete(id, completedStatus, true)
                            }
                        }
                        >
                            <MdDeleteOutline/>
                        </div>
                    </div>
                )
            }
        </li>
    )
}

// Li prop: role, item, completed?

export default List;