import {AiOutlineMinusSquare} from "react-icons/ai"
import { useRouter } from "next/router"
import Link from "next/link"


export default function CategoryList({categoryName}) {
    const router = useRouter()

    const {category} = router.query

    const activeCategory = category || "Default"


    return (
        <Link
            // If category is "Default", href should be "/"
            href={categoryName === "Default" ? "/" : `/${categoryName}`}
            className={`${activeCategory === categoryName ? "bg-purple-400 text-white" : "text-purple-400 border border-purple-400 hover:bg-purple-300 hover:text-white"} my-3 py-1 ps-1 rounded flex items-center gap-4 text-sm  font-bold cursor-pointer`}
        >
            <AiOutlineMinusSquare />
            <p>{categoryName}</p>
        </Link>
    )
}