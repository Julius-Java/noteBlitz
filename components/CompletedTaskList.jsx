import List from "./List"
import { useTaskContext } from "./TaskContext"

import {AiFillCheckCircle} from "react-icons/ai"

export default function CompletedTaskList() {
    const {state} = useTaskContext()

    return (
        <ul data-testid="completed-list">
            {state.tasks.some(task => task.completed) ? (
                state.tasks.map(task => task.completed && (
                    <List completed key={task.id} id={task.id} completedStatus={task.completed} item={task.title} />
                ))
            ) : (
                <div className="text-center mt-10">
                    <div className="text-6xl animate-bounce text-purple-400 text-opacity-30 font-bold flex justify-center mb-3">
                        <AiFillCheckCircle/>
                    </div>
                    <p className="text-xs font-semibold text-purple-300">Complete a task to see it here ✅</p>
                </div>
            )}
        </ul>
    )
}