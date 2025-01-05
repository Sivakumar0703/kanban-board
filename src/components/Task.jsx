import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import TaskModel from './modals/TaskModel';

const Task = ({colIndex, taskIndex}) => {

    const [isTaskModelOpen, setIsTaskModelOpen] = useState(false);
    const boards = useSelector((state) => state.boards);
    const board = boards.find((board) => board.isActive === true);
    const column = board.columns.find((col, index) => index === colIndex);
    const task = column.tasks.find((task, index) => index === taskIndex );
    // console.log("is-task-model-open",isTaskModelOpen)

    // useEffect(() => {
    //     console.log("is-task-model-open",isTaskModelOpen)
    // },[isTaskModelOpen]);

    let completed = 0;
    let subTasks = task.subTasks;
    subTasks.forEach((subtask) => {
        if(subtask.isCompleted){
            completed++
        }
    });

    function handleOnDrag(event){
        event.dataTransfer.setData("text" , JSON.stringify({taskIndex, prevColIndex:colIndex}));
    }

    

    
  return (
    <div
     onClick={() => {setIsTaskModelOpen(true);console.log("culprit")}} 
    >

    <div
    className="cursor-pointer w-[280px] py-6 px-3 first:my-5 bg-white dark:text-white dark:bg-[#2b2c37] shadow-[#364e7e1a] hover:text-[#635fc7] dark:hover:text-[#635fc7]"
    draggable
    onDragStart={handleOnDrag}
    >

        <p className="font-bold tracking-wide">
            {task.title}
        </p>

        <p className="text-xs font-bold tracking-tighter mt-1 text-gray-500">
            {completed} of {subTasks.length} completed tasks
        </p>

    </div>

    {
        isTaskModelOpen && (
            <TaskModel 
            colIndex={colIndex}
            taskIndex={taskIndex}
            setIsTaskModelOpen={setIsTaskModelOpen}
            />
        )
    }
        
    </div>
  )
}

export default Task