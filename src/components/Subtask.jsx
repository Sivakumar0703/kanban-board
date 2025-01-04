import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateSubTaskWhenCompleted } from '../redux/slices/boardsSlice';

const Subtask = ({taskIndex, colIndex, index}) => {

    const boards = useSelector((state) => state.boards);
    const board = boards.find((board) => board.isActive === true);
    const columns = board.columns;
    const col = columns.find((col, index) => index === colIndex);
    const task = col.tasks.find((task, index) => index === taskIndex );
    const subTask = task.subTasks.find((sub, i) => i === index );
    const checked = subTask.isCompleted;
    const dispatch = useDispatch();

    // for changing the subtask status to completed
    function handleChange(){
        dispatch(updateSubTaskWhenCompleted({index, taskIndex, colIndex}))
    }

  return (
    <div
    className="flex justify-start items-center w-full hover:bg-[#635fc740] dark:hover:bg-[#635fc740] rounded-md p-3 gap-4 bg-[#f4f7fd] text-black relative"
    >
        <input 
        type='checkbox' 
        className="cursor-pointer h-4 w-4 accent-[#635fc7]" 
        checked={checked} 
        onChange={(event) => handleChange(event)}
        />

        <p
        className={checked ? "line-through opacity-30" : ""}
        >
            {subTask.title}
        </p>
    </div>
  )
}

export default Subtask