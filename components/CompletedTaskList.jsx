import List from "./List"
import { useTaskContext } from "./TaskContext"

export default function CompletedTaskList() {
    const {state} = useTaskContext()

    return (
        <ul data-testid="completed-list">
            {state.tasks.some(task => task.completed) ? (
                state.tasks.map(task => task.completed && (
                    <List completed key={task.id} id={task.id} completedStatus={task.completed} item={task.title} />
                ))
            ) : (
                <p>Complete a task to see it here</p>
            )}
        </ul>
    )
}