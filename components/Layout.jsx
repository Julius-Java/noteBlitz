import Image from "next/image"
import { useRouter } from "next/router"
import Link from "next/link"
import {SiCoffeescript} from "react-icons/si"
import {Pacifico, Roboto} from "@next/font/google"

const pacifico = Pacifico({
    subsets: ['latin'],
    weight: "400"
})

const roboto = Roboto({
    subsets: ['latin'],
    weight: ['400', '700', '900']
})

export default function Layout({children}) {
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

    return (
        <div className="max-w-md w-[90%] mx-auto min-h-[90vh]">
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
                                <Link key={id} href={href} className={`${router.pathname === href ? "bg-purple-400 text-white" : "text-purple-500 hover:text-white hover:bg-purple-300"} text-sm  border border-purple-500 rounded-md p-2 w-[25%] text-center font-semibold transition-all duration-300 hover:border-none`}>
                                    {name}
                                </Link>
                        )
                    })}
                </nav>
            </header>
            <main
                className={`border-2 border-purple-300 rounded-md mt-7 ${roboto.className} h-[70vh] overflow-hidden overflow-y-scroll scrollbar-thin scrollbar-thumb-purple-400 scrollbar-thumb-rounded-md scrollbar-track-slate-100 p-2`}>
                {children}
            </main>
        </div>
    )
}