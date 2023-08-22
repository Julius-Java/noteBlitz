import { render, screen } from "@testing-library/react"
import TaskList from "../TaskList"


describe("Task List Render", () => {
    it("Renders", () => {
        render(<TaskList />)
    })

    it("Renders a List component", () => {
        render(<TaskList />)
        const ListComponent = screen.getByTestId("list-component")
        expect(ListComponent).toBeInTheDocument()
    })
})