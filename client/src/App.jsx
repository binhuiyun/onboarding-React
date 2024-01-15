import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import HiringManagement from "./pages/HiringManagement";
import PersonalInformationPage from "./pages/PersonalInformation/PersonalInformationPage";
import "./App.css";
import VisaPage from "./pages/VisaManagement/VisaPage";
import ReviewApplications from "./pages/HiringManagement/ReviewApplications";
import PendingApplications from "./pages/HiringManagement/ReviewApplications/PendingApplications";
import OnboardingPage from "./pages/Onboarding/OnboardingPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register/:token" element={<Register />} />
        <Route path="/hiring-management" element={<HiringManagement />} />
        <Route path="/hiring-management/applications" element={<ReviewApplications />} />
        <Route path="/hiring-management/applications/pending" element={<PendingApplications />} />
        <Route path="/visa" element={<VisaPage />} />

        <Route
          path="/personal-information"
          element={<PersonalInformationPage />}
        />
        <Route
          path="/onboarding"
          element={<OnboardingPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
