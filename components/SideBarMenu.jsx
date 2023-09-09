import {MdOutlineClose} from "react-icons/md"
import {AiOutlinePlus} from "react-icons/ai"
import {BsSearchHeart} from "react-icons/bs"
import CategoryList from "./CategoryList"
import {SiCoffeescript} from "react-icons/si"
import { useTaskContext } from "../utils/TaskContext"
// import { data } from "autoprefixer"


export default function SideBarMenu({showSideBar, onClose, childrenLen}) {

    const {useForm, categoryList, dispatchCategories} = useTaskContext()

    const {register, handleSubmit, formState: {errors}, reset} = useForm({mode: "onSubmit"})

    const formSubmit = (data) => {
        const category = data.category.trim()
        const addCategory = {name: category, id: Date.now()}
        dispatchCategories({type: "add-category", payload: addCategory})
        reset()
    }


    return (
        <aside
            className={`${showSideBar ? "right-0" : "-right-[100%]"} min-h-screen fixed top-0 h-full w-full lg:w-[16rem] bg-slate-400 bg-opacity-50 flex justify-end overflow-y-hidden lg:border lg:border-l-purple-400 transition-all duration-300 lg:right-0`}
    >
        <div
            className={`h-full w-[16rem] bg-white lg:bg-gray-100 dark:bg-gray-300 px-2 py-2 transition-all duration-200`}
        >
            {/* Top Section */}
            <section
                className="h-[80vh] overflow-y-auto"
                style={{ overflowY: childrenLen > 0 ? 'scroll' : 'auto' }}
            >
                <div
                    className="mb-3 mt-2 text-purple-400 font-bold text-xl flex items-center justify-between lg:justify-center"
                >
                    <button
                        className="border border-purple-300 rounded p-[2px] lg:hidden"
                        onClick={onClose}
                    >
                        <MdOutlineClose size={25} />
                    </button>
                    <div className="animate-bounce duration-200">
                        <SiCoffeescript className="block" />
                    </div>
                </div>

                {/* Category input form */}
                <form
                    className="w-[13rem] mx-auto"
                    onSubmit={handleSubmit(formSubmit)}
                >
                    <div>
                        <input
                            type="text"
                            {
                                ...register(
                                    "category",
                                    {
                                        required: "Create a category first",
                                    }
                                )
                            }
                            className="border-2 border-purple-300 rounded w-full p-[2px] text-sm mt-8 outline-purple-400 transition-all duration-300 dark:bg-gray-100 dark:text-black"
                        />
                        <span className="text-xs font-semibold text-red-500 block text-right mt-1">
                            {errors.category?.message}
                        </span>
                    </div>
                    <button
                        className="w-full py-1 border border-purple-400 rounded-md text-xs font-semibold flex items-center gap-1 justify-center mt-3 text-gray-500 hover:text-white hover:bg-purple-400 transition-all duration-300 group"
                    >
                        <AiOutlinePlus
                            size={20}
                            className="text-gray-500 group-hover:text-white"
                        />
                        New Category
                    </button>
                </form>

                <hr className="w-full border border-purple-400 mt-5" />

                {/* Category List section */}
                <div className="mt-1">
                    <div className="flex items-center justify-between">
                        <p className="text-xs font-semibold text-gray-500">Categories</p>
                        <button>
                            <BsSearchHeart className="text-purple-400 font-bold" />
                        </button>
                    </div>

                    {/* Categories */}
                    <CategoryList categoryName={"Default"} />
                    {/* Map through categoryList array and render categoryList  */}
                    {
                        categoryList.map((category, id) => {
                            return (
                                <CategoryList
                                    key={id}
                                    categoryName={category.name}
                                />
                            )
                        })
                    }
                </div>
            </section>

            <hr className="w-full border border-purple-400 mt-5" />


            {/* Sidebar Login Section */}
            <section className="relative">
                {/* <p className="text-xs font-bold text-center">Made with ❤️ from Julius</p> */}
            </section>
        </div>
    </aside>
    )
}