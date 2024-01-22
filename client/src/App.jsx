import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import HiringManagement from "./pages/HiringManagement";
import PersonalInformationPage from "./pages/PersonalInformation/PersonalInformationPage";
import "./App.css";
import VisaPage from "./pages/VisaManagement/VisaPage";
import ReviewApplications from "./pages/HiringManagement/ReviewApplications";
import PendingApplications from "./pages/HiringManagement/ReviewApplications/PendingApplications";
import ApprovedApplications from "./pages/HiringManagement/ReviewApplications/ApprovedApplications";
import RejectedApplications from "./pages/HiringManagement/ReviewApplications/RejectedApplications";
import OnboardingPage from "./pages/Onboarding/OnboardingPage";
import ReviewTokenHistory from "./pages/HiringManagement/ReviewTokenHistory";
import VisaHrPage from "./pages/VisaManagement/VisaHrPage";
import NotFound from "./pages/NotFound";
import EmployeeProfilePage from "./pages/EmployeeProfile/EmployeeProfilePage";
import EmployeeProfileDetailsPage from "./pages/EmployeeProfile/EmployeeProfileDetailsPage";
import ApplicationFeedback from "./pages/HiringManagement/ReviewApplications/ApplicationFeedback";
import AuthLayout from "./components/Layout/AuthLayout";
import Layout from "./components/Layout";


const ApplicationStatusRouter = () => {
  return (
    <Routes>
      <Route path=":status" element={<ApplicationStatus />} />
    </Routes>
  );
};
const ApplicationStatus = () => {
  const { status } = useParams();

  const statusComponentMap = {
    pending: <PendingApplications />,
    approved: <ApprovedApplications />,
    rejected: <RejectedApplications />,

  };
  const selectedComponent = statusComponentMap[status] ||<NotFound/>;

  return <div>{selectedComponent}</div>;
};
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Layout />} > */}
        <Route path="/login" element={<Login />} />
        <Route path="/register/:token" element={<Register />} />
        <Route element = {<AuthLayout/>}>
        <Route path="/hiring-management" element={<HiringManagement />} />
        <Route
          path="/hiring-management/applications/*"
          element={<ApplicationStatusRouter />}
        />
        <Route
          path="/hiring-management/applications"
          element={<ReviewApplications />}
        />
        <Route
          path="/hiring-management/token"
          element={<ReviewTokenHistory />}
        />
        <Route
          path="/applications/:id"
          element={<ApplicationFeedback />}  
        />
        {/* </Route> */}
        <Route path="/visa" element={<VisaPage />} />
        <Route path="/visa-hr" element={<VisaHrPage />} />

        <Route
          path="/personal-information"
          element={<PersonalInformationPage />}
        />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/employee-profile" element={<EmployeeProfilePage />} />
        <Route path="/employee-profile/details" element={<EmployeeProfileDetailsPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
