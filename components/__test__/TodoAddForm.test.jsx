import {render, screen} from "@testing-library/react"
import TodoAddForm from "../TodoAddForm"

describe("Renders correctly", () => {
    it("renders", () => {
        render(<TodoAddForm/>)
    })

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