import { createContext, useState } from "react";

export const taskContext = createContext();

const KanbanTaskContext = ({children}) => {

  const storedSettings = JSON.parse(localStorage.getItem("settings")) || {};
  const [showAssignee, setShowAssignee] = useState(storedSettings.assignee || true);
  const [showProgressBar, setShowProgressBar] = useState(storedSettings.progressBar || true);
  const [showAddColumn, setShowAddColumn] = useState(storedSettings.addcolumn || false);
  const [showFilter, setShowFilter] = useState(storedSettings.filter || true);
  const [showNav, setShowNav] = useState(storedSettings.nav || true)
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
  

  return (
    <taskContext.Provider 
      value={{
      showAssignee, 
      setShowAssignee,
      showProgressBar, 
      setShowProgressBar,
      showAddColumn, 
      setShowAddColumn,
      showFilter, 
      setShowFilter,
      showNav, 
      setShowNav,
      isBoardModalOpen, 
      setIsBoardModalOpen
      }}>

      {children}
    </taskContext.Provider>
  )
}

export default KanbanTaskContext 