import { faClipboardCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setBoardStatusActive } from '../redux/slices/boardsSlice'

const BoardsDropdown = ({setIsDropDownOpen, setIsBoardModalOpen}) => {

  const boards = useSelector(state => state.boards);
  const dispatch = useDispatch();
  

  function handleDropdown(event){
    if(event.target !== event.currentTarget){
      return
    }
    setIsDropDownOpen(false);
  }

  // create new board
  function createBoard(){
    setIsBoardModalOpen(true);
    setIsDropDownOpen(false);
  }

  return (
    <div className="absolute left-10 bottom-0  top-[65px] right-0  bg-[#00000080] px-4 py-6" onClick={(event) => handleDropdown(event) }>

      {/* dropdown modal */}
      <div className="bg-white dark:bg-[#2b2c37] shadow-md shadow-[#364e7e1a] w-full p-4 rounded-xl">

        <h3 className="dark:text-gray-300 text-gray-600 font-semibold mx-4 mb-8">
          All Boards - ({boards?.length})
        </h3>

        <div>
          {
            boards.map((board, index) => (
              <div key={index} className={`flex items-baseline space-x-2 px-5 py-4 ${board.isActive && "bg-[#635fc7] text-white rounded-full mr-8"} cursor-pointer ${!board.isActive && "hover:bg-[#7472b6] rounded-full mr-8"}`}
               onClick={ () => dispatch(setBoardStatusActive({index})) } >

                <span>
                <FontAwesomeIcon icon={faClipboardCheck} />
                </span>

                <p className="font-bold"> {board.name} </p>

              </div>

            ))
          }
        </div>

        {/* create new board */}
          <div className="flex items-baseline px-5 py-4 space-x-2 text-[#635fc7] cursor-pointer" onClick={createBoard}>

            <span className="h-4">
             <FontAwesomeIcon icon={faClipboardCheck} />
            </span>

            <p className="font-bold text-lg"> Create New Board </p>

          </div>

        </div>
    </div>
  )
}

export default BoardsDropdown