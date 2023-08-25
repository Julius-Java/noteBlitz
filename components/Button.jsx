import { BiMessageSquareAdd } from 'react-icons/bi';
import { AiOutlineSend } from 'react-icons/ai';

export default function Button({ type, inputFormFunc }) {
    const handleClick = () => {
        if (inputFormFunc) {
            inputFormFunc()
        }
    }


    return (
        <button
            className={`${
                type === "input-button"
                    ? "rounded-full sticky z-20 right-[35rem] bottom-20 p-2 md:p-4 text-lg md:text-xl"
                    : "py-1 px-2 rounded-md"
            } block bg-purple-400 hover:bg-purple-400/60 text-white font-bold transition-all duration-100`}
            data-testid={type}
            role="button"
            onClick={handleClick}
        >
            {type === "input-button" ? <BiMessageSquareAdd /> : <AiOutlineSend />}
        </button>
    );
}
