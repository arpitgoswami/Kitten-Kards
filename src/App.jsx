import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Leaders from "./pages/Leaders";
import Login from "./pages/Login";

import Result from "./components/Result";

import "./styles/global.css";

function Navigation() {
  return (
    <div>
      <Link to="/contact">Click me</Link> {/* Render link conditionally */}
    </div>
  );
}

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="*" element={<Navigation />} />{" "}
          {/* Render Navigation on all routes */}
          <Route path="/contact" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
