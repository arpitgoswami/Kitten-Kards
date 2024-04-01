import React, { useState } from "react";

function Result() {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className="bg-transparent flex justify-center items-center w-screen h-screen text-white">
      <div id="glassmorphism">
        <button onClick={togglePopup} className="bg-blue-500 p-4 rounded-md">
          Show Popup
        </button>
        {showPopup && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-gray-800 p-4 rounded-md">
              <span>You Lose</span>
              <button
                onClick={togglePopup}
                className="bg-red-500 p-2 mt-2 rounded-md"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Result;
