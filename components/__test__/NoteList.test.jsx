import { render, screen } from "@testing-library/react"
import NoteList from "../NoteList"

describe("Renders correctly", () => {
    it("Renders without crashing", () => {
        render(<NoteList/>)
    })
})