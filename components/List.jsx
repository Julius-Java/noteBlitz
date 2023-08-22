import {MdDeleteOutline} from "react-icons/md"
import {FaUndo} from "react-icons/fa"

function List({completed}) {
    return (
        <li
            className="list-none flex place-items-center cursor-pointer mb-3 group border-none bg-purple-300 rounded-lg text-white font-semibold px-3 py-2"
            data-testid={completed ? "completedList-component" : "list-component"}
            role="list-item"
        >
            <div className="flex gap-4 items-center lg:group">
                <input className="cursor-pointer" id="list-item" data-testid="list-checkBox" type="checkbox" />
                <label htmlFor="list-item">Buy groceries</label>
            </div>
            <button className="block text-[#DC143C] ms-auto lg:hidden lg:group-hover:block" role="delete-button">
                {completed ? (<FaUndo/>) : (<MdDeleteOutline />)}
            </button>
        </li>
    )
}

// Li prop: role, item, completed?

export default List;