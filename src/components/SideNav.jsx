import { faChartPie, faGear, faHouse, faListCheck, faCircleChevronLeft, faK, faCircleUser, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import ToggleTheme from './ToggleTheme';
import { toggleTheme } from '../redux/slices/themeSlice';
import { useDispatch } from 'react-redux';


const menus = [
    {option:"Home", icon:faHouse},
    {option:"Dashboard", icon:faChartPie},
    {option:"Settings", icon:faGear},
    {option:"Boards", icon:faListCheck}
];


const SideNav = () => {
    const [isMenuOpen , setIsMenuOpen] = useState(false);
    const dispatch = useDispatch();

    // function to handle toggle
    function handleToggle(){
        dispatch(toggleTheme());
    }

  return (
    <div className={`${isMenuOpen ? "lg:w-1/5 w-1/3" : "w-10"} relative  duration-300 h-screen  bg-slate-950 text-white flex flex-col items-center`}>

        <div className={`cursor-pointer ${!isMenuOpen && "rotate-180"} absolute -right-3 top-9 w-6 text-purple-700 text-xl`}>
         <FontAwesomeIcon  icon={faCircleChevronLeft} onClick={() => setIsMenuOpen(prev => !prev)} />
        </div>
        
        {/* logo */}
        <div className='flex items-center gap-x-3 p-3 pt-5 min-h-[100px]'>
            <div>
                <span className={`cursor-pointer text-3xl ${!isMenuOpen && "pl-12"}`}>
                    <FontAwesomeIcon icon={faK} />  
                </span>
            </div>
            <h1 className={`origin-left text-xl duration-300 ${!isMenuOpen && "scale-0"}`}>
                side-nav  {/* brand name */}
            </h1>
        </div>


        {/* menu-list */}
        <ul className={`${!isMenuOpen && "flex flex-col items-center"} mt-5`}>
        {
            menus.map((menuItem) => (
                <li className='flex items-center text-gray-300 gap-x-4 cursor-pointer p-2 rounded-lg hover:bg-yellow-100' key={menuItem.option}>
                    <span>
                        <FontAwesomeIcon icon={menuItem.icon} /> 
                    </span>

                    <span className={`${!isMenuOpen && "hidden"} origin-left duration-200`}>
                        {menuItem.option}
                    </span>

                </li>
            ))
        }
        </ul>

        

        <div className='absolute bottom-0 p-2 flex flex-col items-center cursor-pointer mb-5'>

            {/* theme switch */}
            <div className='mb-5 flex items-center gap-x-4 mr-1 hover:bg-yellow-100 p-2 rounded-lg' onClick={handleToggle}>
              <ToggleTheme isMenuOpen={isMenuOpen} />
              <span className={`${!isMenuOpen && "hidden"} origin-left duration-200`}>Mode</span>
            </div>

            {/* profile */}
            <div className='flex items-center gap-x-4 hover:bg-yellow-100 p-2 rounded-lg'>
             <span className={`${!isMenuOpen && "hidden"} origin-left duration-200`}>
                Profile
             </span> 
            
             <span>
              <FontAwesomeIcon icon={faCircleUser} />
             </span>
            </div>


            {/* logout */}
            <button className={`mt-5 flex items-center gap-x-2 hover:bg-yellow-100 p-2 rounded-lg`}>
                <span>
                <FontAwesomeIcon icon={faRightFromBracket} />
                </span>

                <span className={`${!isMenuOpen && "hidden"}`}>Logout</span>
            </button>

        </div>
    </div>
  )
}

export default SideNav