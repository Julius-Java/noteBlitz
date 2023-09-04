import { animated, useTransition } from "@react-spring/web"
import {onDragStart, onDragEnter, onDragEnd} from "@/lib/useDnD";
import { useRef, useState, useEffect } from "react";
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd"


const tasks = [
    {
        id: 1,
        task: "Pay fees"
    },

    {
        id: 2,
        task: "Order food"
    },

    {
        id: 3,
        task: "Take uber home"
    },

    {
        id: 4,
        task: "Book flight"
    },
]

export default function DndTest2() {

    const [isBrowser, setIsBrowser] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            setIsBrowser(true);
        }
        }, []);

    // const [onDragEnd, onDragStart, onDragEnter] = useDnD()

    const [todos, setTodos] = useState(tasks)

    const transitions = useTransition(todos, {
        from: { opacity: 0, transform: 'translateY(20px)' },
        enter: { opacity: 1, transform: 'translateY(0)' },
        leave: { opacity: 0, transform: 'translateX(-100%)' },
        keys: task => task.id, // Assuming each todo has a unique 'id'
    });

    const droppableId = Date.now()

    // console.log(droppableId)

    return (
        <DragDropContext onDragEnd={() => {console.log("Drag Drop event occurred")}}>
            <ul>
            {isBrowser && (
                <Droppable droppableId={droppableId} type="group">
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef}>
                            {
                                todos.map((todo, index) => (
                                    <Draggable draggableId={todo.id} key={todo.id} index={index}>
                                        {(provided) => (
                                            <div
                                                {...provided.dragHandleProps}
                                                {...provided.draggableProps}
                                                ref={provided.innerRef}
                                                className={`mb-3 bg-purple-400 rounded-md p-1 text-white font-semibold`}
                                            >
                                                {todo.task}
                                            </div>
                                        )}
                                    </Draggable>
                                ))
                            }
                        </div>
                    )}
                </Droppable>

            )}
            </ul>
        </DragDropContext>
    )
}


{/* transitions((props, todo, _, index) => {
return (
        <Draggable draggableId={todo.id} key={todo.id} index={index}>
            {(provided) => (
                <div
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                >
                    <animated.div
                        style={props}
                    >
                        <li
                                className={`mb-3 bg-purple-400 rounded-md p-1 text-white font-semibold`}
                            >
                                {todo.task}
                        </li>
                    </animated.div>
                </div>
            )}
        </Draggable>
    )
}) */}