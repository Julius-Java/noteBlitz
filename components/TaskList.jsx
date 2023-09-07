import List from "./List"
import Button from "./Button"
import { useTaskContext } from "./TaskContext"
import {TbClipboardList} from "react-icons/tb"
import { animated, useTransition } from "@react-spring/web"
import TodoAddForm from "./TodoAddForm"

function TaskList() {
    const {state} = useTaskContext()

    const incompleteTasks = state.tasks.filter((task) => !task.completed)

    const transitions = useTransition(incompleteTasks, {
        from: { opacity: 0, transform: 'translateY(20px)' },
        enter: { opacity: 1, transform: 'translateY(0)' },
        leave: { opacity: 0, transform: 'translateX(-100%)' },
        keys: incompleteTask => incompleteTask.id, // Assuming each todo has a unique 'id'
    });

    
    if (incompleteTasks.length === 0) {
        return (
            <div className="text-center mt-10 relative">
                <div className="text-6xl animate-bounce text-purple-400 text-opacity-30 font-bold flex justify-center mb-3">
                    <TbClipboardList/>
                </div>
                <p className="text-xs font-semibold text-purple-300">
                    Add a task let&apos;s smash those goals 🎯
                </p>
                <div
                    className="fixed bottom-10 right-1/2 max-w-lg w-[90%] [transform:translateX(50%)]"
                >
                    <TodoAddForm />
                </div>
            </div>
        )
    }


    return (
            <div className="relative">
                <ul>
                    {
                        transitions((props, inCompleteTask) => (
                            <animated.div key={inCompleteTask.id} style={props}>
                                <List
                                    id={inCompleteTask.id}
                                    completedStatus={inCompleteTask.completed}
                                    item={inCompleteTask.title}
                                />
                            </animated.div>
                        ))
                    }
                </ul>
                <div
                    className="fixed bottom-10 right-1/2 max-w-lg w-[90%] [transform:translateX(50%)]"
                >
                    <TodoAddForm />
                </div>
            </div>
    )
}



export default TaskList