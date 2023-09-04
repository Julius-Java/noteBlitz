import { animated, useTransition } from "@react-spring/web"
import {onDragStart, onDragEnter, onDragEnd} from "@/lib/useDnD";
import { useRef, useState } from "react";
import {
    DndContext,
    closestCenter
} from "@dnd-kit/core"

import {
    arrayMove,
    SortableContext,
    verticalListSortingStrategy
} from "@dnd-kit/sortable"

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";


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

    // {
    //     id: 4,
    //     task: "Book flight"
    // },

    // {
    //     id: 5,
    //     task: "Take home"
    // },
]

export default function DnDKit() {

    // const [onDragEnd, onDragStart, onDragEnter] = useDnD()

    const [todos, setTodos] = useState(tasks)

    const transitions = useTransition(todos, {
        from: { opacity: 0, transform: 'translateY(20px)' },
        enter: { opacity: 1, transform: 'translateY(0)' },
        leave: { opacity: 0, transform: 'translateX(-100%)' },
        keys: task => task.id, // Assuming each todo has a unique 'id'
    });

    const handleDragEnd = (event) => {
        // console.log("Drag event ended")
        const {active, over} = event;
        if (active.id !== over.id) {
            setTodos((prevTodos) => {
                const activeIndex = prevTodos.findIndex(obj => obj.id === active.id)
                const overIndex = prevTodos.findIndex(obj => obj.id === over.id)
                const updatedTodos = arrayMove(prevTodos, activeIndex, overIndex)
                return updatedTodos
            })
        }
    }

    return (
        <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <ul>
                <SortableContext
                    items={todos}
                    strategy={verticalListSortingStrategy}
                >
                    {
                        transitions((props, todo, _, index) => {
                        return (
                                    <animated.div
                                        key={todo.id}
                                        style={props}
                                        // data-index={index}
                                        className={`transition-all duration-100`}
                                    >
                                        <SortableItems id={todo.id} task={todo.task} />
                                    </animated.div>
                            )
                        })
                    }
                </SortableContext>
            </ul>
        </DndContext>
    )
}

function SortableItems(props) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({id: props.id})

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    }

    return (
        <li
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={`mb-3 bg-purple-400 rounded-md p-2 text-white font-semibold`}
        >
            {props.task}
        </li>
    )
}