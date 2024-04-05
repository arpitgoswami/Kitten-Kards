import { useEffect, useState } from 'react'
import axios from 'axios'

const Login = () => {
   // Input Hooks
   const [username, setUsername] = useState('')
   const [password, setPassword] = useState('')

   // Status Hooks
   const [status, setStatus] = useState('')
   const [message, setMessage] = useState('')

   const handleLogin = async (e) => {
      e.preventDefault()
      try {
         const response = await axios.post('http://localhost:3001/login', {
            username,
            password,
         })
         setMessage(response.data)
         setStatus(response.status)
      } catch (error) {
         setMessage(error.response.data)
      }
   }

   const handleSignUp = async (e) => {
      e.preventDefault()
      try {
         const response = await axios.post('http://localhost:3001/signup', {
            username,
            password,
         })
         setMessage(response.data)
      } catch (error) {
         setMessage(error.response.data)
      }
   }

   useEffect(() => {
      if (status == 202) {
         window.location.href = './dashboard'
      }
   }, [status])

   return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--dark)] px-4 py-12 text-[var(--white)] sm:px-6 lg:px-8">
         <div className="w-full max-w-md">
            <div>
               <div className="text-center text-3xl">🐱 Kitten Kards</div>
               <div className="mt-2 text-center text-sm text-[var(--blue)] opacity-60">
                  -- Login Form --
               </div>
            </div>
            <form className="mt-4 space-y-3 text-sm" onSubmit={handleLogin}>
               <input
                  type="text"
                  className="block w-full rounded-sm border-2 bg-transparent px-2 py-2 placeholder:text-white"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
               />
               <input
                  type="password"
                  className="block w-full rounded-sm border-2 bg-transparent px-2 py-2 placeholder:text-white"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
               />
               <button
                  type="submit"
                  className="w-full justify-center rounded-sm bg-[var(--grey)] py-2 text-base opacity-80 hover:opacity-100"
               >
                  Login
               </button>
               <button
                  className="w-full justify-center rounded-sm bg-[var(--grey)] py-2 text-base opacity-80 hover:opacity-100"
                  onClick={handleSignUp}
               >
                  Sign Up
               </button>
               <p className="mt-4 text-center text-sm text-[var(--white)]">
                  {message}
               </p>
            </form>
         </div>
      </div>
   )
}

export default Login
