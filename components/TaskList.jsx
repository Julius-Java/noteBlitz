import List from "./List"
import Button from "./Button"
import { useTaskContext } from "./TaskContext"

function TaskList() {
    const {state} = useTaskContext()
    // console.log(state.tasks)
    // state.tasks.map(task => console.log(task.title))
    return (
            <ul>
            {state.tasks.some(task => !task.completed) ? (
                state.tasks.map(task => !task.completed && (
                    <List  key={task.id} id={task.id} completedStatus={task.completed} item={task.title} />
                ))
            ) : (
                <p>Click the + button to add a task</p>
            )}
            </ul>
    )
}



export default TaskList