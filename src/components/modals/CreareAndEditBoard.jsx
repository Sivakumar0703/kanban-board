import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {v4 as uuid} from "uuid";
import { addBoard, editBoard, setBoardStatusActive } from '../../redux/slices/boardsSlice';

const CreareAndEditBoard = ({setIsBoardModalOpen, type}) => {

  const [name, setName] = useState('');
  const [columns, setColumns] = useState([
    { name:'Todo', tasks: [], id: uuid() },
    { name:'Processing', tasks: [], id: uuid() }, 
    { name:'Completed', tasks: [], id: uuid() }, 
  ]);
  const board = useSelector((state) => state.boards).find((board) => board.isActive);
  const dispatch = useDispatch();
  const taskSectionRef = useRef(null);
  const allBoards = useSelector((state) => state.boards);

  function handleModel(event){
    if(event.target !== event.currentTarget){
      return
    }
    setIsBoardModalOpen(false);
  }

  // to change the name of the column
  function handleColumnNameChange(id, newName){
    setColumns((prevCol) => {
      const newState = [...prevCol];
      const column = newState.find((col) => col.id === id );
      column.name = newName;
      return newState
    })
  }

  // to delete a column from the board
  function handleDeleteColumn(id){
    setColumns((prevCol) => prevCol.filter((col) => id !== col.id));
  }

  // add a new column
  function handleAddColumn(){
    setColumns((prevCol) => {
      if(prevCol === undefined){
        return [{name:"", tasks:[], id:uuid()}]
      }
      return [...prevCol , { name:'', tasks: [], id: uuid() }]
    })
  }

  // scroll to the bottom of the task section whenever a new task is added 
  useEffect(() => { 
    if (taskSectionRef.current) {
        taskSectionRef.current.scrollTo({
        top: taskSectionRef.current.scrollHeight,
        behavior: 'smooth', 
      }); 
    } 
  }),[columns];

  // perform the adding/editing board operation
  function handleBoardValidation(){
    // check the board has its own name
    if(!name){
      return 
    }

    // check the board has columns 
    for(let i=0; i<columns.length; i++){
      if(!columns[i].name){
        return 
      }
    }

    // if there is no error in validation then perform add/edit operation
    handleAddOrEditBoard(true)
  }

  function handleAddOrEditBoard(hasErrorInValidation = false){
    setIsBoardModalOpen(false);
    if(hasErrorInValidation){
      type === "add" ? dispatch(addBoard({name, columns})) : dispatch(editBoard({name, columns}))   
    }
    if(type === "add"){
      allBoards?.length > 0 ? dispatch(setBoardStatusActive({index:allBoards.length})) : ""  
    }
  } 

  // make sure it runs on first render only - assigning id to all the columns
  useEffect(() => {
    if(type === "edit" && board){
      const setId = board.columns?.map((col) => ({...col, id:uuid()}));
      setColumns(setId);
      setName(board?.name);
    }
   
  },[])

  return (
    <div className="fixed right-0 left-0 top-0 bottom-0 px-2 overflow-scroll z-50 flex justify-center items-center bg-[#00000080] scrollbar-hidden"
    onClick={handleModel}
    >
      
      <div className="max-h-[85vh] bg-white dark:bg-[#2b2c37] text-black dark:text-white 
      max-w-md mx-auto w-full px-8 py-8 rounded-xl ">
        {/* title */}
        <h3 className="text-lg">
          { type === "edit" ? "Edit" : "Add New" } Board
        </h3>

        {/* task */}
        <div className="mt-8 flex flex-col space-y-3">
          <span className="dark:text-white text-gray-500"> Board Columns </span>

          <input className="px-4 py-2 border border-gray-600 bg-transparent focus:outline-[#365fc7] outline-1 ring-0 roundex-md outline-none" 
          placeholder="Eg: Web Design" value={name} onChange={(event) => setName(event.target.value)} />
        </div>


        {/* board columns */}
        <div className="flex flex-col mt-8 space-y-3  " >
          <span className="text-gray-500 dark:text-white text-sm"> Board Columns </span>
          <div className="max-h-[150px] overflow-y-scroll" ref={taskSectionRef}>
          {
            columns?.map((column, index) => (
              <div key={index} className="flex items-center w-full">
                  <input
                  className="flex-grow px-4 py-2 rounded-md bg-transparent border border-gray-600 outline-none focus:outline-[#735fc7]"
                  value={column.name} 
                  onChange={(event) => {handleColumnNameChange(column.id, event.target.value)} }
                  />

                  {/* delete column icon */}
                  <span className="m-4 cursor-pointer" onClick={() => handleDeleteColumn(column.id)}>
                   <FontAwesomeIcon icon={faXmark} />
                  </span>
              </div>
            ))
          } </div>
        </div>
        {/* add new column button */}
        <div>
          <button 
          className="py-2 mt-2 rounded-full hover:opacity-75 dark:text-[#635fc7] dark:bg-white text-white w-full text-center"
          onClick={handleAddColumn}>
            + Add New Column
          </button>

          {/* add/edit board button */}
          <button
          className="mt-8 py-2 hover:opacity-75 dark:text-white dark:bg-[#635fc7] text-white relative w-full"
          onClick={handleBoardValidation}>
            {
              type === "add" ? "Create New Board" : "Save Changes"
            }
          </button>
        </div>
      </div>


    </div>
  )
}

export default CreareAndEditBoard