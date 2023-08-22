import { render, screen } from "@testing-library/react"
import List from "../List"


describe("List Component Render", () => {
    it("Renders without crashing", () => {
        render(<List/>)
    })

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
        render(<List />)
        const undoButton = screen.getByRole("delete-button")
        expect(undoButton).toBeInTheDocument()
    })
})