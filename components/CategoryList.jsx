import {AiOutlineMinusSquare} from "react-icons/ai"
import { useRouter } from "next/router"


export default function CategoryList({category}) {
    const router = useRouter()

    return (
        <div
            className={`${router.pathname === "/" ? "bg-purple-400 text-white" : "text-purple-400 border border-purple-400 hover:bg-purple-300 hover:text-white"} my-3 py-1 ps-1 rounded flex items-center gap-4 text-sm  font-bold cursor-pointer`}
        >
        <AiOutlineMinusSquare />
        <p>{category}</p>
    </div>
    )
}