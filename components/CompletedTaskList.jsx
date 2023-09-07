import List from "./List"
import { useTaskContext } from "./TaskContext"
import { useRouter } from "next/router"

import {AiFillCheckCircle} from "react-icons/ai"

export default function CompletedTaskList() {
    const {state} = useTaskContext()

    const router = useRouter()

    const {category} = router.query

    const activeCategory = category || "Default"

    const filteredTasks = state.tasks.filter(task => {
        if (activeCategory === "Default") {
            return task.completed && task.category === "Default"
        } else {
            return task.completed && task.category === activeCategory
        }
    })

    return (
        <ul data-testid="completed-list">
            {/* Check for completed tasks if there is any  */}
            {
                filteredTasks.length > 0
                ?
                (
                    filteredTasks.map(task => (
                        <List
                            completed
                            key={task.id}
                            id={task.id}
                            completedStatus={task.completed}
                            item={task.title}
                        />
                    ))
                )
                :
                (
                    <div className="text-center mt-10">
                        <div
                            className="text-6xl animate-bounce text-purple-400 text-opacity-30 font-bold flex justify-center mb-3"
                        >
                            <AiFillCheckCircle/>
                        </div>
                        <p className="text-xs font-semibold text-purple-300">Complete a task to see it here ✅</p>
                    </div>
                )
            }
        </ul>
    )
}


        // {/* state.tasks.some(task => task.completed)
        // ?
        // (
        //     state.tasks.map(task => task.completed && (
        //         <List
        //             completed
        //             key={task.id}
        //             id={task.id}
        //             completedStatus={task.completed}
        //             item={task.title}
        //         />
        //     ))
        // ) */}