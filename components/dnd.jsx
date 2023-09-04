import { animated, useTransition } from "@react-spring/web"
import {onDragStart, onDragEnter, onDragEnd} from "@/lib/useDnD";
import { useRef, useState } from "react";


const tasks = [
    {
        id: 1,
        task: "Pay bill"
    },

    {
        id: 2,
        task: "Go home"
    },

    {
        id: 3,
        task: "Pick up groceries"
    },

    {
        id: 4,
        task: "Book flight"
    },

    {
        id: 5,
        task: "Take home"
    },
]

export default function DndTest() {

    // const [onDragEnd, onDragStart, onDragEnter] = useDnD()

    const [todos, setTodos] = useState(tasks)

    const [adjustOnEnter, setAdjustOnEnter] = useState("")

    const transitions = useTransition(todos, {
        from: { opacity: 0, transform: 'translateY(20px)' },
        enter: { opacity: 1, transform: 'translateY(0)' },
        leave: { opacity: 0, transform: 'translateX(-100%)' },
        keys: task => task.id, // Assuming each todo has a unique 'id'
    });

    const draggedItem = useRef(null)
    const dragEnterItem = useRef(null)

    const handleDrag = () => {
        // Duplicate items for redordering
        let _tasks = [...todos]

        // Remove and save the dragged item
        const draggedItemContent = _tasks.splice(draggedItem.current, 1)[0]


        // Reoder items
        _tasks.splice(dragEnterItem.current, 0, draggedItemContent)

        // Reset ref
        dragEnterItem.current = null
        draggedItem.current = null

        // Update array
        setTodos(_tasks)
    }

    return (
        <ul>
            {
                transitions((props, todo, _, index) => {
                    {/* console.log(index) */}
                return (
                            <animated.div
                                key={todo.id}
                                style={props}
                                // data-index={index}
                                draggable
                                onDragStart={(e) => {draggedItem.current = index}}
                                onDragEnter={(e) => {dragEnterItem.current = index}}
                                onDragEnd={handleDrag}
                                onDragOver={(e) => e.preventDefault()}
                                className={`transition-all duration-100`}
                            >
                                <li
                                    className={`mb-3 bg-purple-400 rounded-md p-1 text-white font-semibold`}
                                >
                                    {todo.task}
                            </li>
                    </animated.div>)
                })
            }

        </ul>
    )
}