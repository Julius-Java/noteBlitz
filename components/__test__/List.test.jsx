import { render, screen } from "@testing-library/react"
import List from "../List"

import { useTaskContext } from '../../utils/TaskContext'; // Adjust the import path as needed

jest.mock('../TaskContext'); // Mock the TaskContext module


describe("List Component Render", () => {
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
        render(<List />); // Render the component
    });

    it("Renders an li element", () => {
        render(<List/>)
        const liElem = screen.getByTestId("list-component")
        expect(liElem).toBeInTheDocument()
    })

    it("Renders an input checkbox", () => {
        render(<List />)
        const checkboxInput = screen.getByTestId("list-checkBox")
        expect(checkboxInput).toBeInTheDocument()
    })

    it("Renders an undo button", () => {
        render(<List completed />)
        const undoButton = screen.getByRole("undo-button")
        expect(undoButton).toBeInTheDocument()
    })
})