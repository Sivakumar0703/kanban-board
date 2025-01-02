import { faChevronDown, faChevronUp, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useState } from 'react'
import BoardsDropdown from './BoardsDropdown'
import CreareAndEditBoard from './modals/CreareAndEditBoard'
import { useSelector } from 'react-redux'
import CreateAndEditTask from './modals/CreateAndEditTask'

const BoardTitle = ({isBoardModalOpen, setIsBoardModalOpen}) => {

    const [isDropDownOpen , setIsDropDownOpen] = useState(false);
    const [isTaskModelOpen, setIsTaskModelOpen] = useState(false);
    const boards = useSelector((state) => state.boards);
    const board = boards?.find((board) => board.isActive);  

  return (
    <div className="flex flex-col w-screen">

    <div className="flex justify-between items-baseline h-[60px] bg-blue-700">
        {/* board name */}
        <div className="flex items-baseline">
            <h1 className="ml-5 text-2xl font-extrabold"> {board?.name?.toUpperCase()} </h1>

            {/* dropdown */}
            <span className="cursor-pointer ml-2" onClick={() => setIsDropDownOpen(prev => !prev)}>
            <FontAwesomeIcon icon={isDropDownOpen ? faChevronUp : faChevronDown} />
            </span>
        </div>

        {/* add task */}
        <div>
            <button className="hidden md:block p-2 m-2 bg-slate-50 text-black rounded-lg"
            onClick={() => setIsTaskModelOpen(prev => !prev)}> 
            Add New Task + 
            </button>

            <button className="px-3 py-1 m-2 h-8 bg-slate-50 text-black md:hidden rounded-full text-center"
            onClick={() => setIsTaskModelOpen(prev => !prev)}>
                + 
            </button>

            <span className="cursor-pointer">
            <FontAwesomeIcon icon={faEllipsisVertical} />
            </span>
        </div>

        {/* dropdown that lists all boards */}
        {
            isDropDownOpen && <BoardsDropdown setIsDropDownOpen={setIsDropDownOpen} setIsBoardModalOpen={setIsBoardModalOpen} />
        }

        </div>

        {/* modal to create new board */}
        {
            isBoardModalOpen && <CreareAndEditBoard setIsBoardModalOpen={setIsBoardModalOpen} type="add" /> // type: add
        }

        {/* modal to create new or edit the existing task */}
        {
            isTaskModelOpen && <CreateAndEditTask device="mobile" type="add" setIsTaskModelOpen={setIsTaskModelOpen}  />
        }
    </div>

  )
}

export default BoardTitle