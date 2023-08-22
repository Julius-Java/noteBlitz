import List from "./List"

export default function CompletedTaskList() {
    return (
        <ul data-testid="completed-list">
            <List completed />
        </ul>
    )
}