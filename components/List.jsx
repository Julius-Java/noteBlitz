import {MdDeleteOutline} from "react-icons/md"
import {BiUndo} from "react-icons/bi"

function List({completed, item}) {
    return (
        <form onSubmit={(e) => console.log(e.target)}>
            <li
                className={`${completed ? "border-2 text-purple-300 border-purple-400" : "border-none bg-purple-300 text-white"} list-none flex place-items-center cursor-pointer mb-3 group  rounded-lg font-semibold px-3 py-2`}
                data-testid={completed ? "completedList-component" : "list-component"}
                role="list-item"
            >
                <div className="flex gap-4 items-center lg:group">
                    {
                        !completed
                        &&
                            <input className="cursor-pointer" id="list-item" data-testid="list-checkBox" type="checkbox" />
                    }
                    <label
                        className={`${completed && "line-through decoration-purple-400 decoration-2"}`} htmlFor="list-item"
                    >
                        {item}
                    </label>
                </div>
                <button className="block text-[#DC143C] ms-auto lg:hidden lg:group-hover:block" role="delete-button">
                    {completed ? (<BiUndo/>) : (<MdDeleteOutline />)}
                </button>
            </li>
        </form>
    )
}

// Li prop: role, item, completed?

export default List;