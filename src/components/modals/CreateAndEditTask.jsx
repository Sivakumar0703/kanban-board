import { useEffect, useState } from 'react';
import { v4 as uuid } from "uuid";
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, editTask } from '../../redux/slices/boardsSlice';
import { isArray } from 'lodash';
// import { addTask, editTask } from '../../redux/slices/tasksSlice';

const CreateAndEditTask = ({device, type, setIsTaskModelOpen, taskIndex, prevColIndex=0}) => {

    const [title, setTitle] = useState("");
    const [description , setDescription] = useState("");
    const [subTask, setSubTask] = useState([
        {title:"" , isCompleted:false , id:uuid()},
        {title:"" , isCompleted:false , id:uuid()},
    ]);
    const boards = useSelector(state => state.boards);
    const isBoardActive = boards?.find(brd => brd.isActive);
    const columns = isBoardActive?.columns; // options for select tag
    const col = columns?.find((col, index) => prevColIndex === index);
    const task = col ? col?.tasks?.find((task, index) => index === taskIndex) : [];
    const [status, setStatus] = useState(columns[prevColIndex]?.name);
    const [newColIndex, setNewColIndex] = useState(0); // after changing the task from one column to another - index mentions the status(todo,doing,done)

    const dispatch = useDispatch();

    function closeTaskModel(event){
        if(event.target !== event.currentTarget){
            return
        }
        setIsTaskModelOpen(false);
    }

    // to delete subtask(s)
    function deleteSubtaskOnClick(id){
        setSubTask((prev) => {
            return prev.filter((task) => task.id !== id );
        })
    }

    // to edit the sub task
    function editSubtask(id, editedValue){
        setSubTask((prev) => {
            const updatedSubtask = [...prev];
            const subtask = updatedSubtask.find((sub) => sub.id === id);
            subtask.title = editedValue;
            return updatedSubtask
        })
    }

    // changing the status
    function setTheStatus(event){
        setStatus(event.target.value);
        console.log('selected index - ',event.target.selectedIndex)
        setNewColIndex(event.target.selectedIndex); // get the index of selected option tag(status)
    }

    // add new sub-task
    function addnewSubTask(){
        setSubTask((subtask) => {
            return [...subtask,
                {title:"", isCompleted:false, id:uuid()}
            ];
        })
    }

    // save the task
    function handleTaskValidation(){
        // check the task has its own name
        if(!title){
            alert("Please Enter Your Task Name");
          return 
        }
    
        // check the subtask  
        for(let i=0; i<subTask.length; i++){
          if(!subTask[i].title){
            return 
          }
        }
        
        // if there is no error in validation then perform add/edit operation
        handleAddOrEditTask(true)
    }
    
    function handleAddOrEditTask(hasErrorInValidation = false){
        if(!hasErrorInValidation){
            return
        }

        const task = {
            title:title,
            description:description,
            subTasks:subTask,
            status:status,
            newColIndex:newColIndex
        }

        type === "add" ? dispatch(addTask(task)) : dispatch(editTask({...task,prevColIndex,taskIndex})) ;
        setIsTaskModelOpen(false);

    } 

    // attach id
    useEffect(() => {
        if(type === "edit"){
            setSubTask(
                task.subTasks.map((sub) => {
                    return {...sub, id:uuid()}
                })
            );
            setTitle(task.title);
            setDescription(task.description);
        }
    },[]);

  return (
    <div
    className={ device === "mobile" ? 
        "flex absolute left-0 right-0 top-0 bottom-0 overflow-y-scroll py-6 px-6 pb-40 bg-[#00000080] scrollbar-hidden"
        : "flex absolute left-0 right-0 bottom-0 top-0 overflow-y-scroll py-6 px-6 pb-40 bg-[#00000080] scrollbar-hidden"
    }
    onClick={(event) => closeTaskModel(event)}
    >

        {/* modal */}
        <div
        className="max-h-[95vh] w-full max-w-md mx-auto my-auto px-8 py-8 overflow-y-scroll scrollbar-hidden bg-white dark:bg-[#2b2c37] text-black dark:text-white font-bold shadow-md rounded-xl"
        >
            {/* modal heading  */}
            <h3 className="text-lg">
                { type === "edit" ? "Edit" : "Add New"} Task
            </h3>

            {/* task title */}
            <div
            className="flex flex-col space-y-1 mt-8"
            >

                <label className="text-sm dark:text-white text-gray-500">
                    Task name
                </label>

                <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Write Test Case"
                className="text-black bg-transparent px-4 py-2 online-none border focus:border-0 rounded-md text-sm border-gray-600 focus:outline-[#635fc7] ring-0"  />

                {/* brief about task  */}
                <label className="text-sm dark:text-white text-gray-500">
                    Brief
                </label>

                <textarea value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Write test case for each and every component inside the components folder"
                className="text-black bg-transparent px-4 py-2 online-none border focus:border-0 rounded-md text-sm border-gray-600 focus:outline-[#635fc7] ring-0 min-h-[200px] overflow-y-scroll scrollbar-hidden"  />

                {/* sub-task  */}
                <div className="flex flex-col mt-8 space-y-1">
                    <label className="text-gray-500 dark:"> Subtask </label>

                    {
                        subTask.map((subtask, index) => (
                            
                            <div 
                            key={index}
                            className="flex items-center w-full">
                                <input 
                                placeholder="Finish the header component first"
                                className="bg-transparent rounded-md flex-grow px-4 py-2 focus:border-0 outline-none text-sm border border-gray-600 focus:outline-[#635fc7]"
                                value={subtask.title}
                                onChange={(event) => {editSubtask(subtask.id, event.target.value)}}/>

                                <span onClick={() => deleteSubtaskOnClick(subtask.id)} className="cursor-pointer m-2">
                                    <FontAwesomeIcon icon={faXmark} />
                                </span>
                            </div>
                            )
                        )
                    }
                </div>

                {/* add new task */}
                <button className="items-center w-full py-2 text-white bg-[#635fc7] dark:text-[#635fc7] dark:bg-white rounded-full"
                onClick={addnewSubTask}>
                    + Add New Subtask
                </button>
            </div>
            
            {/* status of the task */}
            <div className="flex flex-col mt-8 space-y-3">
                <label className="text-gray-500 text-sm dark:text-white">
                    Status
                </label>

                <select
                className="flex flex-grow text-sm border border-gray-300 focus:border-0 px-4 py-2 rounded-md focus:outline-[#635fc7] outline-none bg-transparent"
                value={status}
                onChange={(event) => setTheStatus(event)}
                >

                    {
                        columns.map((column, index) => {
                            return <option className="text-white bg-[#635fc7] dark:text-[#635fc7] dark:bg-white" key={column.name + index}>
                                {column.name}
                            </option>
                        })
                    }

                </select>

                {/* saving the task */}
                <button
                onClick={handleTaskValidation}
                 className="items-center py-2 w-full text-white bg-[#635fc7] rounded-full" >
                    {
                        type === "edit" ? "Save Edited" : "Create Task"
                    }
                </button>
                 
            </div>
        </div>

    </div>
  )
}

export default CreateAndEditTask
