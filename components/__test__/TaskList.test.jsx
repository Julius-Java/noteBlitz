import { render, screen } from "@testing-library/react"
import TaskList from "../TaskList"
import { useTaskContext } from '../../utils/TaskContext';
jest.mock('../TaskContext'); // Mock the TaskContext module


describe("Task List Render", () => {
    it("Renders without crashing", () => {
        // Mock the context values you want to use for testing
        const mockState = {
            tasks: [
                { id: 1, item: "Task 1", completed: true },
                { id: 2, item: "Task 2", completed: false },
                // ... more tasks
            ]
        };
        const mockDispatch = jest.fn(); // Mock the dispatch function
        useTaskContext.mockReturnValue({ state: mockState, dispatch: mockDispatch });
        render(<TaskList />); // Render the component
    });

    it("Renders a List component", () => {
        render(<TaskList />)
        const ListComponent = screen.getByTestId("list-component")
        expect(ListComponent).toBeInTheDocument()
    })
})