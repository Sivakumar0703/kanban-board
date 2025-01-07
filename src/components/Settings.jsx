import { useNavigate } from 'react-router-dom';
import { taskContext } from '../context/KanbanTaskContext';
import SideNav from './SideNav';
import { useContext } from 'react';

const Settings = () => {

    const {showAssignee, showProgressBar, showAddColumn, showFilter, showNav, setShowAssignee, setShowProgressBar, setShowAddColumn, setShowFilter, setShowNav} = useContext(taskContext);
    const inputStyle = "h-[18px] w-[18px] m-2";
    const labelStyle = "text-xl cursor-pointer m-2";
    const navigate = useNavigate();
    
    
    function saveChanges(){
        let options = {
            assignee:showAssignee,
            progressbar:showProgressBar,
            addcolumn:showAddColumn,
            filter:showFilter,
            nav:showNav
        };
        localStorage.setItem("settings", JSON.stringify(options));
        navigate('/board');
    }

  return (
    <div 
    className="flex bg-white dark:bg-[#2b2c37] text-black dark:text-white w-full h-full"
    >
        {/* sidenav */}
        {showNav && <SideNav />}

        {/* main area */}
        <div className='flex flex-col justify-center items-center h-[100vh] w-full border-2 border-purple-600 space-y-10'>

            <div>
            <div className='m-3'>
                <h3 className='font-semibold text-2xl p-2'>Task Setting</h3>

                {/* assignee */}
                <div className='flex items-center space-x-2'>
                <input className={inputStyle} type='checkbox' id='assignee' value={showAssignee} onChange={(event) => setShowAssignee(event.target.checked)} checked={showAssignee} />
                <label htmlFor='assignee' className={labelStyle}> Show Assignee </label> <br/>
                </div>

                {/* progression bar */}
                <input className={inputStyle} type='checkbox' id='progressbar' value={showProgressBar} onChange={(event) => setShowProgressBar(event.target.checked)} checked={showProgressBar} />
                <label htmlFor='progressbar' className={labelStyle}> Show Progress Bar </label>

            </div>


            <div className='m-3'>
            <hr/>
                <h3 className='font-semibold text-2xl p-2'>Column Setting</h3>

                {/* add column */}
                <input type='checkbox' className={inputStyle} id='addcolumn' value={showAddColumn} onChange={(event) => setShowAddColumn(event.target.checked)} checked={showAddColumn} />
                <label htmlFor='addcolumn' className={labelStyle}> Show Add Column Option </label>

            </div>

            

            <div className='m-3'>
            <hr/>
                <h3 className='font-semibold text-2xl p-2'>Filter Setting</h3>

                {/* show filter */}
                <input type='checkbox' className={inputStyle} id='filter' value={showFilter} onChange={(event) => setShowFilter(event.target.checked)} checked={showFilter} />
                <label htmlFor='filter' className={labelStyle}> Show Filter Option </label>

            </div>

            <div className='m-3'>
            <hr/>
                <h3 className='font-semibold text-2xl p-2'>Navigation Setting</h3>

                {/* side nav */}
                <input type='checkbox' className={inputStyle} id='nav' value={showNav} onChange={(event) => setShowNav(event.target.checked)} checked={showNav} />
                <label htmlFor='nav' className={labelStyle}> Show Navigation Bar </label>

            </div>
            </div>

            {/* save changes section */}
            <div className='flex items-center justify-center'>
                <span>Click here to save changes : </span> &nbsp;
                <button className='py-3 px-2 bg-purple-600 text-black dark:text-white rounded-full hover:opacity-75' onClick={saveChanges}>
                    Save Changes
                </button>
            </div>

        </div>

    </div>
  )
}

export default Settings