import Button from "./Button"

export default function TodoAddForm({toggleVisibility}) {
    return (
        <div
            onClick={() => toggleVisibility()}
            className="absolute bg-gray-600 bg-opacity-40 top-0 left-0 h-full w-full transition-all duration-100">
            <form
                className="bg-white max-w-xs w-[95%] mx-auto rounded-md mt-10 p-3"
                role="addTodo-form"
                onClick={(e) => e.stopPropagation()}
            >
                <label className="block font-semibold" htmlFor="todoItem">Add Todo</label>
                <div className="flex gap-3 items-center justify-center w-full py-1  mx-auto">
                    <input
                        className="border p-1 border-purple-400 rounded-md outline-purple-400 w-[75%] sm:w-full"
                        id="todoItem"
                        data-testid={"todo-input"}
                        type="text"
                        onClick={(e) => e.stopPropagation()}
                    />
                    <Button type={"add-button"} />
                </div>
            </form>
        </div>
    )
}