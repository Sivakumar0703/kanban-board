import SideNav from './SideNav'
import BoardTitle from './BoardTitle'
import { useState } from 'react'


const ViewBoard = () => {

  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);


  return (
    <div className="flex">
      <SideNav />
      <BoardTitle isBoardModalOpen={isBoardModalOpen} setIsBoardModalOpen={setIsBoardModalOpen} />
    </div>
  )
}

export default ViewBoard