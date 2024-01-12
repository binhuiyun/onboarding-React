import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import PersonalInformationPage from "./pages/PersonalInformation/PersonalInformationPage";
import "./App.css";
import VisaPage from "./pages/VisaManagement/VisaPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/visa" element={<VisaPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
