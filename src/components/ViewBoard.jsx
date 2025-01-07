import SideNav from './SideNav';
import BoardTitle from './BoardTitle';
import { useContext } from 'react';
import { taskContext } from '../context/KanbanTaskContext';


const ViewBoard = () => {

  const {isBoardModalOpen, setIsBoardModalOpen} = useContext(taskContext);


  return (
    <div className="flex">
      <SideNav />
      <BoardTitle isBoardModalOpen={isBoardModalOpen} setIsBoardModalOpen={setIsBoardModalOpen} />
    </div>
  )
}

export default ViewBoard