import { faChevronDown, faChevronUp, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react';
import BoardsDropdown from './BoardsDropdown';
import CreareAndEditBoard from './modals/CreareAndEditBoard';
import { useDispatch, useSelector } from 'react-redux';
import CreateAndEditTask from './modals/CreateAndEditTask';
import EllipsisOptions from './EllipsisOptions';
import EllipsisDeleteModel from './modals/EllipsisDeleteModel';
import { deleteBoard, setBoardStatusActive } from '../redux/slices/boardsSlice';
import EmptyBoard from './EmptyBoard';
import BoardArea from './BoardArea';

const BoardTitle = ({isBoardModalOpen, setIsBoardModalOpen}) => {

    const [isDropDownOpen , setIsDropDownOpen] = useState(false);
    const [isTaskModelOpen, setIsTaskModelOpen] = useState(false); // to open and close task model
    const [isEllipsisOpen, setIsEllipsisOpen] = useState(false);
    const [mode, setMode] = useState('add'); // board mode - add | edit
    const [isDeleteModelOpen , setIsDeleteModelOpen] = useState(false);
    const boards = useSelector((state) => state.boards);
    const board = boards?.find((board) => board.isActive);  
    const dispatch = useDispatch();
    const activeBoard = boards?.find((board) => board.isActive); // for displaying boards
  
    

    // handle the ellipsis menu on click
    function handleEllipsis(){
        setMode('edit');
        setIsDropDownOpen(false);
        setIsEllipsisOpen(prev => !prev);
    }

    // to add new board
    function handleDropdown(){
        setIsDropDownOpen(prev => !prev);
        setIsEllipsisOpen(false);
        setMode("add");
    }

    // open board model for editing
    function openBoardModelForEditing(){
        setIsBoardModalOpen(true);
        setIsEllipsisOpen(false);
    }

    // open board model for deleting
    function openBoardModelForDeleting(){
        setIsDeleteModelOpen(true);
        setIsEllipsisOpen(false);
    }

    // to delete the board/task
    function deleteOnclick(){
        dispatch(deleteBoard());
        dispatch(setBoardStatusActive({index:0}));
        setIsDeleteModelOpen(false);
    }


    useEffect(() => {
        if(!activeBoard && boards.length > 0){
          dispatch(setBoardStatusActive({index:0}));
        }
    });

  return (
    <div className="flex flex-col h-[100vh] w-screen">

    <div className="flex justify-between items-center h-[65px] bg-purple-300">
        {/* board name */}
        <div className="flex items-baseline">
            <h1 className="ml-5 text-lg md:text-2xl font-extrabold"> {board?.name?.toUpperCase()} </h1>

            {/* dropdown */}
            {
                boards.length > 0 &&
                <span className="cursor-pointer ml-2" onClick={handleDropdown}>
                <FontAwesomeIcon icon={isDropDownOpen ? faChevronUp : faChevronDown} />
                </span>
            }
        </div>

        {/* add task */}
        <div className="flex items-center">
            <button className="hidden md:block p-2 m-2 bg-slate-50 text-black rounded-lg"
            onClick={() => {
                if(boards?.length <= 0){
                    alert("Please Create a Board First");
                    return
                }
                setIsTaskModelOpen(prev => !prev)
            }}> 
            Add New Task + 
            </button>

            <button className="px-3 py-1 m-2 h-8 bg-slate-50 text-black md:hidden rounded-full text-center"
            onClick={() => {
                if(boards?.length <= 0){
                    alert("Please Create a Board First");
                    return
                }
                setIsTaskModelOpen(prev => !prev)
            }}>
                + 
            </button>

            {/* ellipsis option */}
            { 
                <span className="cursor-pointer m-3" onClick={handleEllipsis} >
                 <FontAwesomeIcon icon={faEllipsisVertical} />
                </span>
            }
            
            
            {
                isEllipsisOpen  && <EllipsisOptions type="Boards"
                openBoardModelForEditing={openBoardModelForEditing}
                openBoardModelForDeleting={openBoardModelForDeleting}
                setIsEllipsisOpen={setIsEllipsisOpen}
                setMode={setMode} 
                /> 
            }
        </div>

        {/* dropdown that lists all boards */}
        {
            isDropDownOpen && <BoardsDropdown setIsDropDownOpen={setIsDropDownOpen} setIsBoardModalOpen={setIsBoardModalOpen} />
        }

        </div>

        {/* modal to create new board */}
        {
            isBoardModalOpen && <CreareAndEditBoard setIsBoardModalOpen={setIsBoardModalOpen} type={mode} /> // type = board mode
        }

        {/* modal to create new or edit the existing task */}
        {
            isTaskModelOpen && <CreateAndEditTask device="mobile" type="add" setIsTaskModelOpen={setIsTaskModelOpen}  />
        }

        {/* ellipsis delete model */}
        {
            isDeleteModelOpen && <EllipsisDeleteModel type="board" title={board.name} setIsDeleteModelOpen={setIsDeleteModelOpen} deleteOnclick={deleteOnclick} />
        }

        {/* board area style={{maxHeight:`calc(100vh - 65px)`}} */}
        {
            boards.length > 0 ? 
            <div id="below-header" className='flex-grow' >
                <BoardArea isBoardModalOpen={isBoardModalOpen} setIsBoardModalOpen={setIsBoardModalOpen} mode={mode} setMode={setMode} />
            </div>
            :
            <div className="flex-grow">
                <EmptyBoard type="add" />
            </div>
        }
        
    </div>

  )
}

export default BoardTitle