import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Task from "./Task";
import { dragTask } from "../redux/slices/boardsSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import FilterModel from "./modals/FilterModel";

const Column = ({colIndex}) => {

    const boards = useSelector((state) => state.boards);
    const board = boards.find((board) => board.isActive === true);
    const column = board?.columns?.find((col, index) => index === colIndex);
    const tasks = column?.tasks;
    const dispatch = useDispatch();
    const [isFilterModelOpen, setIsFilterModelOpen] = useState(false);
    

    function handleOnDragover(event){
        event.preventDefault();
    }

    function handleOnDrop(event){
        const {prevColIndex, taskIndex} = JSON.parse(event.dataTransfer.getData("text"));
        if(colIndex !== prevColIndex){
            dispatch(dragTask({taskIndex, colIndex, prevColIndex}))
        }
    }

  return (
    <div
    id="column"
    className="min-w-[280px] mx-5 pt-[40px] scrollbar-hidden"
    onDrop={handleOnDrop}
    onDragOver={handleOnDragover}
    >

        <p
        className="flex justify-center items-baseline gap-2 text-[#828fa3]  md:tracking-[5px]"
        >
            <span className={`block w-4 h-4 rounded-full ${(column.name === "Todo" && "bg-yellow-500") || (column.name === "Processing" && "bg-green-500") || (column.name === "Completed" && "bg-red-500") }`}></span>
            <span className="flex-grow font-semibold">{column.name} {column.tasks?.length}</span>
            {
                column?.tasks?.length > 0 && 
                <span className="w-3 h-2 text-[#505153] text-sm cursor-pointer hover:text-black dark:hover:text-slate-100" onClick={() => setIsFilterModelOpen(prev => !prev)}>
                 <FontAwesomeIcon icon={faFilter} />
                </span>
            }
        </p>

        {
            isFilterModelOpen && <div className="z-50 relative">
            <FilterModel setIsFilterModelOpen={setIsFilterModelOpen}  tasks={tasks}  colIndex={colIndex} isFilterModelOpen={isFilterModelOpen} />
            </div>
        }

        {
            tasks?.map((task, index) => (
                <Task key={index} taskIndex={index} colIndex={colIndex} />
            ))
        }

    </div>
  )
}

export default Column