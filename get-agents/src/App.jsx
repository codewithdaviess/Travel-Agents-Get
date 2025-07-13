// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SelectAccountType from './pages/SelectAccountType'
import AgentSignupForm from './pages/AgentSignupForm'
import TouristSignupForm from './pages/TouristSignupForm'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SelectAccountType />} />
        <Route path="/signup-agent" element={<AgentSignupForm />} />
        <Route path="/signup-tourist" element={<TouristSignupForm />} />
      </Routes>
    </Router>
  )
}

export default App
