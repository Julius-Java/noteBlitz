import { screen, render, fireEvent } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Button from "../Button"

describe("Renders correctly", () => {
    it("Renders", () => {
        render(<Button/>)
    })

    it("Contains a button element", () => {
        render(<Button />)
        const button = screen.getByRole("button")
        expect(button).toBeInTheDocument()
    })
})

describe("Renders correct button type", () => {
    it("Renders button type 'input-button'", () => {
        render(<Button type={"input-button"} />)
        const inputButton = screen.getByTestId("input-button")
        expect(inputButton).toBeInTheDocument()
    })

    it("Renders button type 'add-button'", () => {
        render(<Button type={"add-button"} />)
        const addButton = screen.getByTestId("add-button")
        expect(addButton).toBeInTheDocument()
    })
})

describe("Behaviours", () => {
    it("Calls a function when clicked", async () => {
        render(<Button />)
        const button = screen.getByRole("button")

        function triggerEvent() {
            return userEvent.click(button)
        }

        await triggerEvent();
    })
})