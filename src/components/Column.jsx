import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Task from "./Task";
import {shuffle} from "lodash";
import { dragTask } from "../redux/slices/boardsSlice";

const Column = ({colIndex}) => {

    // const colors = [
    //     'bg-blue-500',
    //     'bg-green-500',
    //     'bg-red-500',
    // ];

    // const [color, setColor] = useState(colors);
    const boards = useSelector((state) => state.boards);
    const board = boards.find((board) => board.isActive === true);
    const column = board.columns.find((col, index) => index === colIndex);
    const dispatch = useDispatch();
    // const dispatch = useDispatch();

    // useEffect(() => {
    //     setColor(shuffle(colors).pop());
    // },[dispatch]);

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
        className="flex items-center gap-2 text-[#828fa3] font-semibold md:tracking-[5px]"
        >
            <span className={`block w-4 h-4 rounded-full ${(column.name === "Todo" && "bg-yellow-500") || (column.name === "Processing" && "bg-green-500") || (column.name === "Completed" && "bg-red-500") }`}></span>
            {column.name} {column.tasks?.length}
        </p>

        {
            column?.tasks?.map((task, index) => (
                <Task key={index} taskIndex={index} colIndex={colIndex} />
            ))
        }

    </div>
  )
}

export default Column