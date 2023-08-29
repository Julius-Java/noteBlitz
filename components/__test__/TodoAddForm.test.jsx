import {render, screen} from "@testing-library/react"
import TodoAddForm from "../TodoAddForm"
import { useTaskContext } from '../TaskContext';
jest.mock('../TaskContext'); // Mock the TaskContext module

const mockUseForm = jest.fn(() => ({
    register: jest.fn(),
    handleSubmit: jest.fn(),
    formState: { errors: {} },
    reset: jest.fn(),
    setValue: jest.fn(),
}));


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

        // Mock the useTaskContext hook to return mockState, mockDispatch, and mockUseForm
        useTaskContext.mockReturnValue({
            state: mockState,
            dispatch: mockDispatch,
            useForm: mockUseForm,
        });

        render(<TodoAddForm />); // Render the component
    });

    it("Should contain a form", () => {
        render(<TodoAddForm/>)
        const form = screen.getByRole("addTodo-form")
        expect(form).toBeInTheDocument()
    })

    it("Should have a button of type 'add-button'", () => {
        render(<TodoAddForm/>)
        const addButton = screen.getByTestId("add-button")
        expect(addButton).toBeInTheDocument()
    })

    it("Should have an input field", () => {
        render(<TodoAddForm/>)
        const input = screen.getByTestId("todo-input")
        expect(input).toBeInTheDocument()
    })
})