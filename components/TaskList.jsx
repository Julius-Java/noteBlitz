import List from "./List"
import Button from "./Button"
import { useTaskContext } from "./TaskContext"

function TaskList() {
    const {state} = useTaskContext()
    // console.log(state.tasks)
    state.tasks.map(task => console.log(task.title))
    return (
            <ul>
                {state.tasks.length > 0
                    ?
                state.tasks.map(task => (
                    <List key={task.id} item={task.title} />
                ))
                    :
                <p>Click the + button below to add a task</p>
                }
            </ul>
    )
}



export default TaskList