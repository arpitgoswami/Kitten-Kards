import { MdOutlineRestartAlt } from "react-icons/md";
import { MdLeaderboard } from "react-icons/md";
import { IoLogOutSharp } from "react-icons/io5";
import { FaQuoteLeft } from "react-icons/fa";

import Card from "../components/Card";
import Result from "../components/Result";

import { useState } from "react";

function Dashboard() {
  const [status, setStatus] = useState();
  const [showPopup, setShowPopup] = useState(false);

  var defuse = 0;
  var won = 5;

  function explode() {
    setStatus("Explode Card: You Lose");
    setShowPopup(!showPopup);
  }

  function winner() {
    setStatus("You Won");
    setShowPopup(!showPopup);
  }

  function shuffle() {
    setStatus("Shuffle");
    setShowPopup(!showPopup);
  }

  const selection = (text) => {
    if (text == "💥") {
      if (defuse == 0) {
        explode();
      } else {
        defuse -= 1;
      }
    } else if (text == "🔄") {
      shuffle();
    } else if (text == "💣") {
      defuse += 1;
      console.log(defuse);
    } else {
      console.log(text);
    }

    won === 1 ? winner() : (won -= 1);
  };

  return (
    <div
      id="kanit-regular"
      className="flex justify-center items-center bg-[#222831] w-screen h-screen text-[#D1D1C4] font-semibold"
    >
      <div>
        <div className="text-center font-normal text-4xl mb-8">🎭 My Cards</div>
        <div className="grid grid-cols-5 gap-3">
          {[...Array(5)].map((_, index) => (
            <Card key={index} onClick={selection} />
          ))}
        </div>

        <div
          className="justify-center font-normal text-1xl space-x-8 flex bg-[#393E46] p-4 rounded-md"
          id="buttons"
        >
          <button onClick={() => window.location.reload()}>
            <MdOutlineRestartAlt />
            &nbsp; restart
          </button>
          <button>
            <MdLeaderboard />
            &nbsp; leaderboard
          </button>
          <button>
            <IoLogOutSharp />
            &nbsp; logout
          </button>
          <button>
            <FaQuoteLeft />
            &nbsp; quote
          </button>
        </div>
      </div>
      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-800 p-4 rounded-md">
            <span>{status}</span>
            <button
              onClick={() => window.location.reload()}
              className="bg-red-500 p-2 mt-2 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
