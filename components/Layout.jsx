import Image from "next/image"
import { useRouter } from "next/router"
import Link from "next/link"
import {SiCoffeescript} from "react-icons/si"
import {Pacifico, Roboto} from "@next/font/google"

import Button from "./Button"
import TodoAddForm from "./TodoAddForm"
import { useState } from "react"

const pacifico = Pacifico({
    subsets: ['latin'],
    weight: "400"
})

const roboto = Roboto({
    subsets: ['latin'],
    weight: ['400', '700', '900']
})

export default function Layout({children}) {
    const [showInput, setShowInput] = useState(false)

    const router = useRouter()
    const navLinks = [
        {
            href: "/",
            name: "ToDo"
        },

        {
            href: "/completed",
            name: "Completed"
        },

        {
            href: "/notes",
            name: "Notes"
        }
    ]

    const showInputForm = () => {
        setShowInput(prevValue => !prevValue)
    }

    return (
        <div className="max-w-lg w-[90%] mx-auto min-h-[90vh]">
            <header>
                <div className={`flex items-center justify-center gap-4 text-2xl font-semibold ${pacifico.className}`}>
                    <h1>NoteBlitz</h1>
                    <div className="text-purple-400">
                        <SiCoffeescript className="block" />
                    </div>
                </div>
                <nav className={`flex items-center justify-between mt-6 ${roboto.className}`}>
                    {navLinks.map(({href, name}, id) => {
                    return  (
                                <Link key={id} href={href} className={`${router.pathname === href ? "bg-purple-400 text-white" : "text-purple-500 hover:text-white hover:bg-purple-300"} text-xs sm:text-sm  border border-purple-500 rounded-md p-2 w-[30%] sm:w-[30%] text-center font-semibold transition-all duration-300 hover:border-none`}>
                                    {name}
                                </Link>
                        )
                    })}
                </nav>
            </header>
            <main
                className={`border-2 border-purple-300 rounded-md mt-7 ${roboto.className} h-[50vh] sm:h-[60vh] md:h-[70vh] overflow-hidden overflow-y-scroll scrollbar-thin scrollbar-thumb-purple-400 scrollbar-thumb-rounded-md scrollbar-track-slate-100 p-2 relative`}
                style={{ overflowY: children.length > 0 ? 'scroll' : 'auto' }}
            >
                {children}
                {router.pathname === "/" && <Button inputFormFunc={showInputForm} type="input-button" />}
                {router.pathname === "/" && showInput && <TodoAddForm toggleVisibility={setShowInput} />}
            </main>
        </div>
    )
}