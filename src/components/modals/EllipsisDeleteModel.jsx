
const EllipsisDeleteModel = ({type, deleteOnclick, title, setIsDeleteModelOpen}) => {

    // to close the delete model
    function closeDeleteModel(event){
        if(event.target !== event.currentTarget){
            return
        }
        setIsDeleteModelOpen(false);
    }

  return (
    <div
    className="px-2 py-4 fixed right-0 top-0 bottom-0 left-0 overflow-scroll scrollbar-hidden z-50 flex justify-center items-center bg-[#00000080] "
    onClick={(event) => closeDeleteModel(event)}
    >
        {/* delete model */}
        <div
        className="max-h-[95vh] overflow-y-scroll scrollbar-hidden bg-white dark:bg-[#2b2c37] dark:text-white text-black w-full rounded-xl px-8 py-8 max-w-md"
        >

            <h3 className="text-xl text-red-600 font-bold">
                Delete this {type} ?
            </h3>

            {/* delete message */}
            {
                type === "task" ? 
                <p className="text-gray-500 font-semibold tracking-wide text-sm pt-6">
                    Are you sure you want to delete the <span className="font-bold text-red-600"> "{title}"  </span> task and its subtasks?
                </p> 

                : <p className="text-gray-500 font-semibold tracking-wide text-sm pt-6">
                    Are you sure you want to delete the <span className="font-bold text-red-600"> "{title}"  </span> board?
                </p>
            }

            {/* delete button section*/}
            <div className="flex justify-center items-center w-full space-x-4 mt-5">
                <button 
                className="py-2 w-full text-white hover:opacity-75 font-bold bg-red-500 rounded-full"
                onClick={deleteOnclick}>
                    Delete
                </button>

                <button 
                className="py-2 w-full text-[#635fc7] hover:opacity-75 font-bold bg-[#635fc71a] rounded-full"
                onClick={() => setIsDeleteModelOpen(false)}>
                    Cancel
                </button>
            </div>

        </div>

    </div>
  )
}

export default EllipsisDeleteModel