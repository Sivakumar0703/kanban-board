import { useState } from 'react';
import CreareAndEditBoard from './modals/CreareAndEditBoard';

const EmptyBoard = ({type}) => {

    const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);

  return (
    <div
    className="flex flex-col justify-center items-center h-full w-full bg-white dark:bg-[#2b2c37]"
    style={{height:`calc(100vh-65px)`}}
    >

        <h3
        className="font-bold text-gray-500 flex flex-col items-center"
        >
            {
                type === "edit" ? "This board is empty. Create a new column to get started" 
                : "There are no boards available. Create a new board to get started"
            }

            <button
            className="relative w-full max-w-xs mt-8 py-2 font-bold text-white bg-[#635fc7] dark:text-white dark:bg-[#635fc7] hover:opacity-70 rounded-full items-center"
            onClick={() => setIsBoardModalOpen(true)}> 
                {
                    type === "edit" ? "+ Add New Column" : "+ Add New Board"
                }
            </button>

            {
                isBoardModalOpen && <CreareAndEditBoard type={type} setIsBoardModalOpen={setIsBoardModalOpen}  />
            }
        </h3>

    </div>
  )
}

export default EmptyBoard