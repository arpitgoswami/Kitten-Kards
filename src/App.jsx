import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import Dashboard from './pages/Dashboard'
import Leaders from './pages/Leaders'
import Login from './pages/Login'

import Result from './components/Result'

import './styles/global.css'

function App() {
   return (
      <>
         <Router>
            <Routes>
               <Route path="*" element={<Login />} />
               {/* Render Navigation on all routes */}
               <Route path="/dashboard" element={<Dashboard />} />
               <Route path="/leaders" element={<Leaders />} />
               <Route path="/login" element={<Login />} />
            </Routes>
         </Router>
      </>
   )
}

export default App
