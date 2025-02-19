import { useEffect } from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";
import {useNavigate} from "react-router-dom";

const EllipsisOptions = ({type, openBoardModelForEditing, openBoardModelForDeleting, setIsEllipsisOpen}) => {

  const navigate = useNavigate();
  const boards = useSelector((state) => state.boards);
  const ellipsisDiv = useRef(null);


  function handleEditBoardOnclick(event){
    event.stopPropagation()
    openBoardModelForEditing();
  }

  function gotoSettings(){
    navigate('/settings');
  }

  return (
    <div
    className={type === "Boards" ? "absolute top-16 right-5":"absolute top-6 right-4"}
    ref={ellipsisDiv}
    >

      <div className="flex justify-end items-center">
        <div className="px-4 py-5 text-sm shadow-md shadow-[#364e7e1a] w-40 bg-white dark:bg-[#20212c] space-y-4 pr-12 rounded-lg h-auto z-30" >
          {
            boards?.length > 0 && <>
            <p className="cursor-pointer text-gray-700 dark:text-gray-400" onClick={handleEditBoardOnclick}> Edit {type}  </p>
            <p className="cursor-pointer text-gray-700 dark:text-gray-400" onClick={openBoardModelForDeleting}> Delete {type}  </p>
            </>
          }

          <p className="cursor-pointer text-gray-700 dark:text-gray-400" onClick={gotoSettings}> Settings </p>
        </div>
      </div>

    </div>
  )
}

export default EllipsisOptions