import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Column from './Column';

const BoardArea = ({isBoardModalOpen, setIsBoardModalOpen}) => {

    const [windowSize, setWindowSize] = useState({
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight
    });
    const [isNavbarOpen, setIsNavbarOpen] = useState(true);
    const boards = useSelector((state) => state.boards); // get all boards from store
    const board = boards.find((board) => board.isActive === true); // pick the active board
    const columns = board.columns; // get the columns of the active board


    // tracking window resizing
    useEffect(() => {
        window.addEventListener("resize", handleWindowResize);

        return() => {
            window.removeEventListener("resize", handleWindowResize);
        }
    });

    // updating the setWindowSize on resizing
    function handleWindowResize(){
        const window_size = {
            innerWidth: window.innerWidth,
            innerHeight: window.innerHeight
        }
        setWindowSize(window_size)
        return 
    }

  return (
    <div
    className={windowSize.innerWidth >= 768 && isNavbarOpen ?
        "flex justify-evenly bg-[#f4f7fd] overflow-x-scroll scrollbar-hidden h-screen gap-6  dark:bg-[#20212c]" 
        :
        "flex h-screen overflow-x-scroll scrollbar-hidden bg-[#f4f7fd] dark:bg-[#20212c] gap-6"
    }
    >

        {/* {
            windowSize.innerWidth >= 768 && 
        } */}

        {/* columns */}
        {
            columns.map((col, index) => (
                <Column key={index} colIndex={index} />
            ))
        }

    </div>
  )
}

export default BoardArea