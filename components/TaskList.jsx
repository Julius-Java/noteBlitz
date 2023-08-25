import List from "./List"
import Button from "./Button"
import { useTaskContext } from "./TaskContext"
import {TbClipboardList} from "react-icons/tb"

function TaskList() {
    const {state} = useTaskContext()
    return (
            <ul>
            {/* Check for yet to be completed tasks if there is any*/}
            {state.tasks.some(task => !task.completed) ? (
                state.tasks.map(task => !task.completed && (
                    <List  key={task.id} id={task.id} completedStatus={task.completed} item={task.title} />
                ))
            ) : (
                <div className="text-center mt-10">
                    <div className="text-6xl animate-bounce text-purple-400 text-opacity-30 font-bold flex justify-center mb-3">
                        <TbClipboardList/>
                    </div>
                    <p className="text-xs font-semibold text-purple-300">Enter a task let&apos;s smash those goals 🎯</p>
                </div>
            )}
            </ul>
    )
}



export default TaskList