import {BiMessageSquareAdd} from "react-icons/bi"

export default function Button({type}) {
    return (
        <button
            className={`${type === "input-button" && "rounded-full absolute right-3 bottom-3 p-2 md:p-4 text-lg md:text-xl"} bg-purple-400 hover:bg-purple-400/60 text-white font-bold transition-all duration-100`}
            data-testid={type}
            role="button"
        >
            {type === "input-button" && (<BiMessageSquareAdd/>)}
        </button>
    )
}