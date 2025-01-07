import { faChartPie, faGear, faHouse, faListCheck, faCircleChevronLeft, faK, faCircleUser, faRightFromBracket, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState } from 'react';
import ToggleTheme from './ToggleTheme';
import useDarkMode from '../Hooks/useDarkMode';
import { Link, useNavigate } from 'react-router-dom';
import { taskContext } from '../context/KanbanTaskContext';


const menus = [
    {option:"Home", icon:faHouse, route:"/board"},
    {option:"Settings", icon:faGear, route:"/settings"},
];


const SideNav = () => {
    const [isMenuOpen , setIsMenuOpen] = useState(false);
    const [colorTheme, setTheme] = useDarkMode();
    const[isDark, setIsDark] = useState(colorTheme === "light" ? true : false);
    const {setIsBoardModalOpen} = useContext(taskContext);
    const navigate = useNavigate();

    function toggleDarkMode(){
        setTheme(colorTheme);
        setIsDark(prev => !prev);
    }

    function createNewBoard(){
        const url = window.location.href;
        const page = url.substring(url.lastIndexOf('/'));
        if(page !== "/board"){
            navigate('/board');
        }
        setIsBoardModalOpen(true);
    }


  return (
    <div className={`${isMenuOpen ? "lg:w-1/5 w-1/3" : "w-10"} relative  duration-300 h-screen  bg-slate-950 text-white flex flex-col items-center`}>

        <div className={`cursor-pointer ${!isMenuOpen && "rotate-180"} absolute -right-3 top-9 w-6 text-purple-700 text-xl`}>
         <FontAwesomeIcon  icon={faCircleChevronLeft} onClick={() => setIsMenuOpen(prev => !prev)} />
        </div>
        
        {/* logo */}
        <div className='flex items-center gap-x-3 p-3 pt-5 min-h-[100px]'>
            <div>
                <span className={`cursor-pointer text-3xl `}>
                    <FontAwesomeIcon icon={faK} />  
                </span>
            </div>
            { isMenuOpen &&
            <h1 className={`origin-left text-xl duration-300 ${!isMenuOpen && "scale-0"}`}>
                Kanban  {/* brand name */}
            </h1>
            }
        </div>


        {/* menu-list */}
        <ul className={`${!isMenuOpen && "flex flex-col items-center"} mt-5`}>
        {
            menus.map((menuItem) => (
                <li  key={menuItem.option}>
                    <Link to={menuItem.route} className='flex items-center text-gray-300 gap-x-4 cursor-pointer p-2 rounded-lg hover:bg-purple-300'>
                    <span>
                        <FontAwesomeIcon icon={menuItem.icon} /> 
                    </span>

                    <span className={`${!isMenuOpen && "hidden"} origin-left duration-200`}>
                        {menuItem.option}
                    </span>
                    </Link>
                </li>
            ))
        }
            {/* add board */}
            <li className='flex items-center text-gray-300 gap-x-4 cursor-pointer p-2 rounded-lg hover:bg-purple-300' onClick={createNewBoard}>
                <span>
                    <FontAwesomeIcon icon={faPlus} /> 
                </span>

                <span className={`${!isMenuOpen && "hidden"} origin-left duration-200`}>
                    Add Board
                </span>
            </li>
        </ul>

        

        <div className='absolute bottom-0 p-2 flex flex-col items-center cursor-pointer mb-5'>

            {/* theme switch */}
            <div className='mb-5 flex items-center gap-x-4 mr-1  p-2 rounded-lg' onClick={toggleDarkMode}>
              <ToggleTheme isDark={isDark} />
              <span className={`${!isMenuOpen && "hidden"} origin-left duration-200`}>Mode</span>
            </div>

            {/* profile */}
            {/* <div className='flex items-center gap-x-4 hover:bg-yellow-100 p-2 rounded-lg'>
             <span className={`${!isMenuOpen && "hidden"} origin-left duration-200`}>
                Profile
             </span> 
            
             <span>
              <FontAwesomeIcon icon={faCircleUser} />
             </span>
            </div> */}


            {/* logout */}
            {/* <button className={`mt-5 flex items-center gap-x-2 hover:bg-yellow-100 p-2 rounded-lg`}>
                <span>
                <FontAwesomeIcon icon={faRightFromBracket} />
                </span>

                <span className={`${!isMenuOpen && "hidden"}`}>Logout</span>
            </button> */}

        </div>
    </div>
  )
}

export default SideNav