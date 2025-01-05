import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Column from './Column';
import EmptyBoard from './EmptyBoard';
import CreareAndEditBoard from './modals/CreareAndEditBoard';

const BoardArea = ({isBoardModalOpen, setIsBoardModalOpen, mode, setMode}) => {

    // const [windowSize, setWindowSize] = useState({
    //     innerWidth: window.innerWidth,
    //     innerHeight: window.innerHeight
    // });
    // const [isNavbarOpen, setIsNavbarOpen] = useState(true);
    const boards = useSelector((state) => state.boards); // get all boards from store
    const board = boards.find((board) => board.isActive === true); // pick the active board
    const columns = board.columns; // get the columns of the active board


    // tracking window resizing
    /*
    useEffect(() => {
        window.addEventListener("resize", handleWindowResize);

        return() => {
            window.removeEventListener("resize", handleWindowResize);
        }
    });
    */

    // updating the setWindowSize on resizing
    /*function handleWindowResize(){
        const window_size = {
            innerWidth: window.innerWidth,
            innerHeight: window.innerHeight
        }
        setWindowSize(window_size)
        return 
    }
        */

  return (
    <div
    id="board-area"
    // className={windowSize.innerWidth >= 768 && isNavbarOpen ?
    //     "flex justify-evenly bg-[#f4f7fd] overflow-x-scroll scrollbar-hidden h-screen gap-6  dark:bg-[#20212c] mb-5" 
    //     :
    //     "flex h-screen overflow-x-scroll scrollbar-hidden bg-[#f4f7fd] dark:bg-[#20212c] gap-6"
    // }
    className="h-[calc(100vh-65px)] flex justify-evenly bg-[#f4f7fd]  overflow-scroll scrollbar-hidden  gap-6  dark:bg-[#20212c] pb-3"
    >

        {/* {
            windowSize.innerWidth >= 768 && 
        } */}

        {/* columns */}
        {
            columns?.length > 0 ? 
            <>
                {
                 columns?.map((col, index) => (
                  <Column key={index} colIndex={index} />
                 ))
                }

                <div // h-screen
                className="flex justify-center items-center  mb-2 mx-5 pt-[40px] min-w-[280px] mt-[45px] rounded-lg text-2xl font-bold text-[#828fa3] bg-[#e9effa] dark:bg-[#2b2c3740] hover:text-[#635fc7] transition duration-300 scrollbar-hidden cursor-pointer"
                onClick={() => {setIsBoardModalOpen(true);setMode("edit")}}
                >
                    + New Column
                </div>
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
            // type="edit"
            setIsBoardModalOpen={setIsBoardModalOpen}
            />
            
        }

        {/* {
            columns.map((col, index) => (
                <Column key={index} colIndex={index} />
            ))
        } */}

    </div>
  )
}

export default BoardArea