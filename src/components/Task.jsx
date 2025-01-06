import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import TaskModel from './modals/TaskModel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';

const Task = ({colIndex, taskIndex}) => {

    const [isTaskModelOpen, setIsTaskModelOpen] = useState(false);
    const boards = useSelector((state) => state.boards);
    const board = boards.find((board) => board.isActive === true);
    const column = board.columns.find((col, index) => index === colIndex);
    const task = column.tasks.find((task, index) => index === taskIndex );
    const deadline = task.deadline;
    const priority = task.priority;
    // console.log("is-task-model-open",isTaskModelOpen)

    // useEffect(() => {
    //     console.log("is-task-model-open",isTaskModelOpen)
    // },[isTaskModelOpen]);

    let completed = 0;
    let subTasks = task?.subTasks;
    subTasks.forEach((subtask) => {
        if(subtask.isCompleted){
            completed++
        }
    });

    function handleOnDrag(event){
        event.dataTransfer.setData("text" , JSON.stringify({taskIndex, prevColIndex:colIndex}));
    }

    function calculateTaskCompletionPercentage(){
        const completedTask = completed;
        const totalTask = subTasks.length;
        const percentage = Math.floor((completedTask/totalTask) * 100);
        return percentage
    }

    function isDeadlineCrossed(){
        const currentData = new Date();
        const lastDay = new Date(task.deadline);
        return currentData > lastDay
    }

    
  return (
    <div
     onClick={() => {setIsTaskModelOpen(true);console.log("culprit")}} 
    >

    <div
    className={`z-0 cursor-pointer w-[280px] py-4 px-3 overflow-hidden first:my-5 bg-white dark:text-white dark:bg-[#2b2c37] shadow-[#364e7e1a]  
        ${priority === "High" ? "border-l-4 border-red-500 hover:text-[#635fc7] dark:hover:text-[#635fc7]" : priority === "Medium" ? "border-l-4 border-blue-500 hover:text-[#635fc7] dark:hover:text-[#635fc7]" : "hover:text-[#635fc7] dark:hover:text-[#635fc7]" }
        ${isDeadlineCrossed() ? "animate-pulse bg-[#f00] hover:text-red-600" : ""}`}
    draggable
    onDragStart={handleOnDrag}
    >

        <p className="font-bold tracking-wide">
            {task.title}
        </p>

        <p className="text-xs font-bold tracking-tighter mt-1 text-gray-500">
            <span className="h-4 w-4 mr-2">
            <FontAwesomeIcon icon={faCircleUser} />
            </span>
            {task.assignee}
        </p>

        {/* <p className="text-xs font-bold tracking-tighter mt-1 text-gray-500">
            {completed} of {subTasks.length} completed tasks
        </p> */}

        <p className="text-xs font-bold tracking-tighter mt-1 text-gray-500">
            Deadline - {task.deadline}
        </p>

        <div className="text-xs font-bold tracking-tighter mt-1 text-gray-500">
            <label htmlFor="task-completion"> Completion: </label>
            <progress id="task-completion" max="100" value={calculateTaskCompletionPercentage()} className="h-[5px]">  {calculateTaskCompletionPercentage()} </progress>
            <span> {calculateTaskCompletionPercentage()}% </span>
        </div>

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