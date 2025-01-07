import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import EllipsisOptions from '../EllipsisOptions';
import Subtask from '../Subtask';
import { deleteTask, setTaskStatus } from '../../redux/slices/boardsSlice';
import EllipsisDeleteModel from './EllipsisDeleteModel';
import CreateAndEditTask from './CreateAndEditTask';

const TaskModel = ({colIndex, taskIndex, setIsTaskModelOpen}) => {

    const boards = useSelector((state) => state.boards);
    const board = boards.find((board) => board.isActive === true);
    const columns = board.columns;
    const col = columns.find((col, index) => index === colIndex);
    const task = col.tasks.find((task, index) => index === taskIndex );
    const subTasks = task.subTasks;
    const dispatch = useDispatch();
    const [status, setStatus] = useState(task.status);
    const [newColIndex, setNewColIndex] = useState(columns.indexOf(col));
    const [isEllipsisOpen, setIsEllipsisOpen] = useState(false);
    const [isDeleteModelOpen, setIsDeleteModelOpen] = useState(false);
    const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);

    let completed = 0;
    subTasks.forEach((subtask) => {
        if(subtask.isCompleted){
            completed++
        }
    });

    function openBoardModelForEditing(){
        setIsBoardModalOpen(true);
        setIsEllipsisOpen(false);
    }

    function openBoardModelForDeleting(){
        setIsDeleteModelOpen(true);
        setIsEllipsisOpen(false);
    }

    // handle the select
    function handleSelectOnchange(event){
        setStatus(event.target.value);
        setNewColIndex(event.target.selectedIndex)
    }

    // to close the task model + swap the task to different column 
    function closeTaskModel(event){
        event.stopPropagation();
        if(event.target !== event.currentTarget){
           return
        }
        dispatch(setTaskStatus(
            {taskIndex, colIndex, newColIndex, status}
        ));
        setIsTaskModelOpen(false);
        console.log("model should be closed")
    }

    function deleteOnclick(){
        dispatch(deleteTask({taskIndex, colIndex}));
        setIsTaskModelOpen(false);
        setIsDeleteModelOpen(false);
    }

    
  return (
    <div
    className="flex justify-center items-center fixed right-0 left-0 top-0 bottom-0 px-2 py-4 overflow-scroll scrollbar-hidden z-50 bg-[#00000080]  dropdown"
    onClick={closeTaskModel}
    >

    {/* model */}
    <div className="max-h-[95vh] w-full overflow-y-scroll scrollbar-hidden my-auto max-w-md mx-auto px-8 py-8 rounded-xl font-bold shadow-md shadow-[#364e7e1a] text-black bg-white dark:bg-[#2b2c37] dark:text-white">
    <div
    className="flex justify-between items-center w-full relative "
    >

        <h1 className="text-lg">
            {task.title}
        </h1>

        <span className="cursor-pointer h-6" onClick={() => setIsEllipsisOpen(prev => !prev) }>
            <FontAwesomeIcon icon={faEllipsisVertical} />
        </span>

        {
            isEllipsisOpen && <EllipsisOptions 
            openBoardModelForEditing={openBoardModelForEditing}
            openBoardModelForDeleting={openBoardModelForDeleting}
            type="Task"
            />
        }

    </div>

    {/* task description */}
    <p
    className="font-semibold text-gray tracking-wide text-sm pt-6"
    >
        {task.description}
    </p>

    <p
    className="pt-6 text-gray-500 tracking-widest text-sm"
    >
        Subtasks {completed} of {subTasks.length}
    </p>

    {/* Subtasks section */}
    <div
    className="mt-3 space-y-2"
    >
        {
            subTasks.map((sub, index) => {
                return (
                    <Subtask key={index} taskIndex={taskIndex} colIndex={colIndex} index={index} />
                )
            })
        }
    </div>

    {/* Current Status */}
    <div
    className="mt-8 flex flex-col space-y-3 "
    >
        <label className="text-sm text-gray-500 dark:text-white">
            Current Status
        </label>

        <select
        className="flex-grow px-4 py-2 rounded-md text-sm bg-transparent focus:border-0 border-[1px] border-gray-300 focus:outline-[#635fc7] outline-none"
        value={status}
        onChange={handleSelectOnchange}
        >

            {
                columns.map((column, index) => (
                    <option
                    className="text-black"
                    key={index}
                    >
                        {column.name}
                    </option>
                ))
            }

        </select>
    </div>


    </div>
    {/* to open delete model */}
    {
       isDeleteModelOpen && (
        <EllipsisDeleteModel 
        deleteOnclick={deleteOnclick}
        title={task.title}
        setIsDeleteModelOpen={setIsDeleteModelOpen}
        type="task"
        />
       ) 
    }

    {/* {device, type, setIsTaskModelOpen, taskIndex, prevColIndex=0}  */}
    {
        isBoardModalOpen && (
            <CreateAndEditTask 
            type="edit"
            setIsTaskModelOpen={setIsTaskModelOpen}
            taskIndex={taskIndex}
            prevColIndex={colIndex}
            />
        )
    }

        
    </div>
  )
}

export default TaskModel