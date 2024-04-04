import React, { useState } from 'react'

function Result() {
   const [showPopup, setShowPopup] = useState(false)

   const togglePopup = () => {
      setShowPopup(!showPopup)
   }

   return (
      <div className="flex h-screen w-screen items-center justify-center bg-transparent text-white">
         <div id="glassmorphism">
            <button
               onClick={togglePopup}
               className="rounded-md bg-blue-500 p-4"
            >
               Show Popup
            </button>
            {showPopup && (
               <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
                  <div className="rounded-md bg-gray-800 p-4">
                     <span>You Lose</span>
                     <button
                        onClick={togglePopup}
                        className="mt-2 rounded-md bg-red-500 p-2"
                     >
                        Close
                     </button>
                  </div>
               </div>
            )}
         </div>
      </div>
   )
}

export default Result
