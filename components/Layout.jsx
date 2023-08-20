import Image from "next/image"
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
    return (
        <div className="max-w-md w-[90%] mx-auto min-h-[90vh]">
            <header>
                <div className={`flex items-center justify-center gap-4 text-xl font-semibold ${pacifico.className}`}>
                    <h1>NoteBlitz</h1>
                    <div className="text-purple-400">
                        <SiCoffeescript className="block" />
                    </div>
                </div>
                <nav className={`flex items-center justify-between mt-4 ${roboto.className}`}>
                    <Link href={"/"}>
                        <button className="bg-purple-500 text-white rounded-md px-5 py-1 font-semibold">
                            Tasks
                        </button>
                    </Link>

                    <Link href={"/completed"}>
                        <button>
                            Completed
                        </button>
                    </Link>

                    <Link href={"/notes"}>
                        <button>
                            Notes
                        </button>
                    </Link>
                </nav>
            </header>
            <main
                className={`border-2 border-purple-300 rounded-md mt-7 ${roboto.className} h-[70vh] overflow-hidden overflow-y-scroll scrollbar-thin scrollbar-thumb-purple-400 scrollbar-thumb-rounded-md scrollbar-track-slate-100 p-2`}>
                {children}
            </main>
        </div>
    )
}