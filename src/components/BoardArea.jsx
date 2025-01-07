import { useSelector } from 'react-redux';
import Column from './Column';
import EmptyBoard from './EmptyBoard';
import CreareAndEditBoard from './modals/CreareAndEditBoard';
import { useContext } from 'react';
import { taskContext } from '../context/KanbanTaskContext';

const BoardArea = ({isBoardModalOpen, setIsBoardModalOpen, mode, setMode}) => {

    const boards = useSelector((state) => state.boards); // get all boards from store
    const board = boards.find((board) => board.isActive === true); // pick the active board
    const columns = board.columns; // get the columns of the active board
    const {showAddColumn} = useContext(taskContext);



  return (
    <div
    id="board-area"
    className="h-[calc(100vh-65px)] flex justify-evenly bg-[#f4f7fd]  overflow-scroll scrollbar-hidden  gap-6  dark:bg-[#20212c] pb-3"
    >

        {/* columns */}
        {
            columns?.length > 0 ? 
            <>
                {
                 columns?.map((col, index) => (
                  <Column key={index} colIndex={index} />
                 ))
                }

                {
                    showAddColumn &&
                    <div
                    className="flex justify-center items-center  mb-2 mx-5 pt-[40px] min-w-[280px] mt-[45px] rounded-lg text-2xl font-bold text-[#828fa3] bg-[#e9effa] dark:bg-[#2b2c3740] hover:text-[#635fc7] transition duration-300 scrollbar-hidden cursor-pointer"
                    onClick={() => {setIsBoardModalOpen(true);setMode("edit")}}
                    >
                        + New Column
                    </div>
                }

                
            </> 
            : 
            <>
                <EmptyBoard type="edit" />
            </>
        }

        {
            isBoardModalOpen && 
            <CreareAndEditBoard 
            type={mode}
            setIsBoardModalOpen={setIsBoardModalOpen}
            />
            
        }

    </div>
  )
}

export default BoardArea