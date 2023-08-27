import CompletedTaskList from "../CompletedTaskList"
import { render, screen } from "@testing-library/react"

import { useTaskContext } from '../TaskContext'; // Adjust the import path as needed
jest.mock('../TaskContext'); // Mock the TaskContext module


describe("Renders correctly", () => {
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
        render(<CompletedTaskList />); // Render the component
    });

    it("Renders a completed list component", () => {
        render(<CompletedTaskList/>)
        const completedListComponent = screen.getByTestId("completed-list")
        expect(completedListComponent).toBeInTheDocument()
    })
})