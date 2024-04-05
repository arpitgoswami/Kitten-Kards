import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Dashboard from './pages/Dashboard'
import Leaders from './pages/Leaders'
import Login from './pages/Login'
import Rules from './pages/Rules'

import Apps from './redux/app'

import './styles/global.css'

function App() {
   return (
      <>
         <Router>
            <Routes>
               <Route path="*" element={<Dashboard />} />
               {/* Render Navigation on all routes */}
               <Route path="/dashboard" element={<Dashboard />} />
               <Route path="/leaders" element={<Leaders />} />
               <Route path="/login" element={<Login />} />
               <Route path="/rules" element={<Rules />} />
               <Route path="/app" element={<Apps />} />
            </Routes>
         </Router>
      </>
   )
}

export default App
