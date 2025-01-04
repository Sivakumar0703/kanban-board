import React from 'react'

const EllipsisOptions = ({type, openBoardModelForEditing, openBoardModelForDeleting}) => {
  return (
    <div
    className={type === "Boards" ? "absolute top-16 right-5":"absolute top-6 right-4"}
    >

      <div className="flex justify-end items-center">
        <div className="px-4 py-5 text-sm shadow-md shadow-[#364e7e1a] w-40 bg-white dark:bg-[#20212c] space-y-4 pr-12 rounded-lg h-auto z-30" >
          <p className="cursor-pointer text-gray-700 dark:text-gray-400" onClick={openBoardModelForEditing}> Edit {type}  </p>
          <p className="cursor-pointer text-gray-700 dark:text-gray-400" onClick={openBoardModelForDeleting}> Delete {type}  </p>

        </div>
      </div>

    </div>
  )
}

export default EllipsisOptions