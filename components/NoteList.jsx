import {FaStickyNote} from "react-icons/fa"


export default function NoteList() {
    return (
        <div className="text-center mt-10">
            <div
                className="text-6xl animate-bounce text-purple-400 text-opacity-30 font-bold flex justify-center mb-3"
            >
                <FaStickyNote/>
            </div>
            <p
                className="text-xs font-semibold text-purple-300"
            >
                📝 Scribble Your Thoughts! 🚀
            </p>
        </div>
    )
}