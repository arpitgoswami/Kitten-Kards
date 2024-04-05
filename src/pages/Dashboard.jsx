import { Link } from 'react-router-dom'
import { MdOutlineRestartAlt } from 'react-icons/md'
import { MdLeaderboard } from 'react-icons/md'
import { IoLogOutSharp } from 'react-icons/io5'
import { FaQuoteLeft } from 'react-icons/fa'
import Card from '../components/Card'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'

function Dashboard() {
   const [status, setStatus] = useState()
   const [showPopup, setShowPopup] = useState(false)

   const count = useSelector((state) => state.count)
   const dispatch = useDispatch()

   const won = useSelector((state) => state.count)
   var defuse = 0

   useState(() => {
      var cond
      axios
         .get('https://kitten-kards-backend.onrender.com/getSession')
         .then((res) => {
            cond = res.data
         })
         .catch((err) => console.log(err))
      if (cond == '0') {
         window.location.href = 'login'
      }
      if (cond == '1') {
         console.log('Signed In')
      }
   }, [])

   const logout = async (e) => {
      e.preventDefault()
      axios
         .get('https://kitten-kards-backend.onrender.com/logout')
         .then((res) => {
            console.log(res.data)
         })
         .catch((err) => console.log(err))
      window.location.href = 'login'
   }

   function explode() {
      setStatus('You lost the game.')
      setShowPopup(!showPopup)
   }

   function winner() {
      axios
         .get('https://kitten-kards-backend.onrender.com/won')
         .then((res) => {
            none
         })
         .catch((err) => console.log(err))
      setStatus('You won the game.')
      setShowPopup(!showPopup)
   }

   const shuffle = () => {
      setStatus('Shuffling the cards again.')
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

      won === 1 ? winner() : () => dispatch({ type: 'DECREMENT' })
   }

   return (
      <div
         id="kanit-regular"
         className="flex h-screen w-screen items-center justify-center bg-[var(--dark)] font-semibold text-[var(--white)]"
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
               className="text-1xl flex justify-center space-x-8 rounded-md bg-[var(--grey)] p-4 font-normal"
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

               <button onClick={logout}>
                  <IoLogOutSharp />
                  &nbsp; logout
               </button>

               <Link to="../rules">
                  <button>
                     <FaQuoteLeft />
                     &nbsp; rules
                  </button>
               </Link>
            </div>
         </div>

         {showPopup && (
            <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
               <div className="w-[18] rounded-md bg-[var(--dark)] px-4 py-4 font-mono text-sm">
                  <div>
                     <p>
                        <span className="text-[var(--blue)]">Message:</span>{' '}
                        {status}
                     </p>
                     <button
                        onClick={() => window.location.reload()}
                        className="mt-2 rounded-md bg-[var(--grey)] p-2 opacity-80 hover:opacity-100"
                     >
                        Okay
                     </button>
                  </div>
               </div>
            </div>
         )}
      </div>
   )
}

export default Dashboard
