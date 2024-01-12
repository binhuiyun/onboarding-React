import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import './App.css';
import PersonalInformationPage from './pages/PersonalInformation/PersonalInformationPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/personal-information" element={<PersonalInformationPage />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
