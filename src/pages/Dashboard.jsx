import { Link } from 'react-router-dom'

import { MdOutlineRestartAlt } from 'react-icons/md'
import { MdLeaderboard } from 'react-icons/md'
import { IoLogOutSharp } from 'react-icons/io5'
import { FaQuoteLeft } from 'react-icons/fa'

import Card from '../components/Card'

import { useState } from 'react'

import axios from 'axios'

function Dashboard() {
   const [status, setStatus] = useState()
   const [showPopup, setShowPopup] = useState(false)

   var defuse = 0
   var won = 5

   const logout = async (e) => {
      e.preventDefault()
      axios
         .get('http://localhost:3001/logout')
         .then((res) => {
            console.log(res.data)
         })
         .catch((err) => console.log(err))
      window.location.href = 'leaders'
   }

   function explode() {
      setStatus('Explode Card: You Lose')
      setShowPopup(!showPopup)
   }

   function winner() {
      axios
         .get('http://localhost:3001/won')
         .then((res) => {
            none
         })
         .catch((err) => console.log(err))
      setStatus('You won the game.')
      setShowPopup(!showPopup)
   }

   const shuffle = () => {
      setStatus('Shuffle')
      setShowPopup(!showPopup)
   }

   const selection = (text) => {
      if (text == '💥') {
         if (defuse == 0) {
            explode()
         } else {
            defuse -= 1
         }
      } else if (text == '🔄') {
         shuffle()
      } else if (text == '💣') {
         defuse += 1
         console.log(defuse)
      } else {
         console.log(text)
      }

      won === 1 ? winner() : (won -= 1)
   }

   return (
      <div
         id="kanit-regular"
         className="flex h-screen w-screen items-center justify-center bg-[#222831] font-semibold text-[#D1D1C4]"
      >
         <div>
            <div className="mb-8 text-center text-4xl font-normal">
               🎭 My Cards
            </div>
            <div className="grid grid-cols-5 gap-3">
               {[...Array(5)].map((_, index) => (
                  <Card key={index} onClick={selection} />
               ))}
            </div>

            <div
               className="text-1xl flex justify-center space-x-8 rounded-md bg-[#393E46] p-4 font-normal"
               id="buttons"
            >
               <button onClick={() => window.location.reload()}>
                  <MdOutlineRestartAlt />
                  &nbsp; restart
               </button>

               <Link to="../leaders">
                  <button>
                     <MdLeaderboard />
                     &nbsp; leaderboard
                  </button>
               </Link>

               <Link to="../login">
                  <button>
                     <IoLogOutSharp />
                     &nbsp; logout
                  </button>
               </Link>

               <Link to="../rules">
                  <button>
                     <FaQuoteLeft />
                     &nbsp; rules
                  </button>
               </Link>

               <button onClick={winner}>
                  <FaQuoteLeft />
                  &nbsp; Win Conditin
               </button>

               <button onClick={logout}>
                  <IoLogOutSharp />
                  &nbsp; logout
               </button>
            </div>
         </div>

         {showPopup && (
            <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
               <div className="rounded-md bg-gray-800 p-4">
                  <span>{status}</span>
                  <button
                     onClick={() => window.location.reload()}
                     className="mt-2 rounded-md bg-red-500 p-2"
                  >
                     Okay
                  </button>
               </div>
            </div>
         )}
      </div>
   )
}

export default Dashboard
