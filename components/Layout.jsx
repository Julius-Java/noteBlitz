import { useRouter } from "next/router"
import Link from "next/link"
import {SiCoffeescript} from "react-icons/si"
import {Pacifico, Roboto} from "@next/font/google"
import { useState } from "react"

import SideBarMenu from "./SideBarMenu"
import { useTaskContext } from "../utils/TaskContext"
import {RxHamburgerMenu} from "react-icons/rx"
import ThemeSwitcher from "./ThemeSwitcher"

const pacifico = Pacifico({
    subsets: ['latin'],
    weight: "400"
})

const roboto = Roboto({
    subsets: ['latin'],
    weight: ['400', '700', '900']
})

export default function Layout({children, category, fullPath}) {
    const [showSideBar, setShowSideBar] = useState(false)

    const {state} = useTaskContext()

    const todoCount = state.tasks.reduce((count, task) => {
        // If category is Default, count all uncompleted todos with category property of Default
        // Else, count all uncompleted todos with category property of the current category
        if (category === "Default") {
            if (!task.completed && task.category === category) return count + 1
            return count
        } else {
            if (!task.completed && task.category === category) return count + 1
            return count
        }
    }, 0)

    const router = useRouter()


    const handleMenuClick = () => {
        setShowSideBar((prevStatus) => !prevStatus)
    }

    const navLinks = [
        {
            href: category === 'Default' ? "/" : `/${category}`,
            name: "ToDo"
        },

        {
            href: category === "Default" ? "/completed" : `/${category}/completed`,
            name: "Completed"
        },

        {
            href: category === "Default" ? "/notes" : `/${category}/notes`,
            name: "Notes"
        }
    ]

    const activeNavLink = (href, category) => {
            if (category === "Default") {
                // Check if the current route exactly matches the NavLink's href
                return router.pathname === href;
            } else {
                // Since pathname does capture dynamic route name, use asPath instead
                return decodeURIComponent(fullPath) === href
            }
    };

    return (
        <div className="max-w-lg w-[90%] mx-auto min-h-[90vh] mt-5">
            <header className="relative">
                <div
                    className={`flex items-center justify-center gap-4 text-2xl font-semibold ${pacifico.className}`}
                >
                    <ThemeSwitcher />
                    <h1 className="dark:text-gray-200">NoteBlitz</h1>
                    <div className="text-purple-400">
                        <SiCoffeescript className="block" />
                    </div>
                    <div
                        className="text-xl text-purple-400 font-bold absolute right-0 cursor-pointer lg:hidden"
                        onClick={handleMenuClick}
                    >
                        <RxHamburgerMenu size={25} />
                    </div>
                </div>
                <nav className={`flex items-center justify-between mt-6 ${roboto.className}`}>
                    {navLinks.map(({href, name}, id) => {
                    return  (
                                <Link
                                    key={id}
                                    href={href}
                                    className={`${activeNavLink(href, category) ? "bg-purple-400 text-white" : "text-purple-500 hover:text-white hover:bg-purple-300 "} text-xs sm:text-sm  border border-purple-500 rounded-md p-2 w-[30%] sm:w-[25%] text-center font-semibold transition-all duration-300 relative`}
                                >
                                    {/* Display Number of todos only on todo tab */}
                                    <div>
                                        {
                                            `${name}` + ((todoCount > 0 && name === "ToDo")  ? ` ${todoCount}` : "")
                                        }
                                    </div>

                                    {/* Notification Animation */}
                                    {
                                        name === "ToDo" && todoCount > 0
                                        &&
                                        (
                                            <div className="absolute -top-1 -right-1">
                                                <span className="relative flex h-3 w-3">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                                </span>
                                            </div>
                                        )
                                    }
                                </Link>
                        )
                    })}
                </nav>
            </header>
            <main
                className={`border-2 border-purple-300 rounded-md mt-7 ${roboto.className} h-[50vh] sm:h-[60vh] md:h-[70vh] overflow-hidden overflow-y-scroll scrollbar-thin scrollbar-thumb-purple-400 scrollbar-thumb-rounded-md scrollbar-track-slate-100 p-2 relative `}
                style={{ overflowY: children.length > 0 ? 'scroll' : 'auto' }}
            >
                {children}
            </main>

            {/* SideBar */}
            <SideBarMenu
                showSideBar={showSideBar}
                onClose={handleMenuClick}
                childrenLen={children.length}
            />
        </div>
    )
}