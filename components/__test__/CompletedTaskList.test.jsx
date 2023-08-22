import CompletedTaskList from "../CompletedTaskList"
import { render, screen } from "@testing-library/react"


describe("Renders correctly", () => {
    it("Renders", () => {
        render(<CompletedTaskList />)
    })

    it("Renders a completed list component", () => {
        render(<CompletedTaskList/>)
        const completedListComponent = screen.getByTestId("completedList-component")
        expect(completedListComponent).toBeInTheDocument()
    })
})