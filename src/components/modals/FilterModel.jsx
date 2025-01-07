import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { sortTask } from '../../redux/slices/boardsSlice';

const FilterModel = ({setIsFilterModelOpen, colIndex, tasks, isFilterModelOpen}) => {

    const sortOptions = ["deadline", "priority"];
    const filterOptions = useRef(null);
    const dispatch = useDispatch();

    function handleClick(option){
        setIsFilterModelOpen(false);
        sortTasks(tasks, option);
    }

    function sortTasks(tasks, option){
        const priorityLevels = { High: 1, Medium: 2, Low: 3};
        let sortedTasks = [...tasks];
        if (option === 'priority') { 
            sortedTasks?.sort((a, b) => { 
                // First sort by priority 
                if (priorityLevels[a.priority] !== priorityLevels[b.priority]) {
                    return priorityLevels[a.priority] - priorityLevels[b.priority]; 
                } // If priorities are the same, sort by deadline 
                return new Date(a.deadline) - new Date(b.deadline); 
            }); 
        } else if (option === 'deadline') { 
         sortedTasks?.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
        } else {
            return
        }
        dispatch(sortTask({colIndex,tasks:sortedTasks}))
        return 
    };


    useEffect(() => {
        function handleMouseDown(event){
            if(!filterOptions.current.contains(event.target)){
                setIsFilterModelOpen(false);
            }
        }
        document.addEventListener("mousedown",handleMouseDown);
        return () =>  document.removeEventListener("mousedown",handleMouseDown);
    },[]);



  return (
        <div className="absolute left-[50%] w-1/2 p-2 rounded-md text-white dark:text-purple-300 bg-purple-300 dark:bg-white" ref={filterOptions} >
        {
            sortOptions.map((option, index) => {
                return (
                    <p key={index} className="p-1 text-xs font-semibold  hover:bg-white text-black dark:hover:bg-purple-300 dark:hover:text-white rounded-full cursor-pointer"
                    onClick={() => handleClick(option)}
                    >
                       by {option}
                    </p>
                )
            })
        }
    </div>

  )
}

export default FilterModel