import { BiMessageSquareAdd } from 'react-icons/bi';
import { IoIosAddCircleOutline } from 'react-icons/io';

export default function Button({ type, inputFormFunc }) {
    const handleClick = (e) => {
        e.stopPropagation()
        if (inputFormFunc) {
            inputFormFunc()
        }
    }


    return (
        <button
            className={`${
                type === "input-button"
                    ? " rounded-full sticky bottom-3 right-3 z-20 p-2 md:p-4 text-lg md:text-xl"
                    : " py-1 px-2 rounded-md"
            } block bg-purple-400 hover:bg-purple-400/60 text-white text-xl font-bold transition-all duration-100`}
            data-testid={type}
            role="button"
            onClick={handleClick}
            type='submit'
        >
            {/* {type === "input-button" ? <GrAddCircle/> : } */}
            <IoIosAddCircleOutline/>
        </button>
    );
}
