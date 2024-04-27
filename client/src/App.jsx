import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import HiringManagement from "./pages/HiringManagement";
import PersonalInformation from "./pages/PersonalInformation";
import VisaPage from "./pages/VisaManagement/VisaPage";
import PendingApplications from "./pages/HiringManagement/ReviewApplications/PendingApplications";
import ApprovedApplications from "./pages/HiringManagement/ReviewApplications/ApprovedApplications";
import RejectedApplications from "./pages/HiringManagement/ReviewApplications/RejectedApplications";
import OnboardingPage from "./pages/Onboarding/";
import ReviewTokenHistory from "./pages/HiringManagement/ReviewTokenHistory";
import VisaHrPage from "./pages/VisaManagement/VisaHrPage";
import NotFound from "./pages/NotFound";
import EmployeeProfile from "./pages/EmployeeProfile";
import EmployeeProfileDetailsPage from "./pages/EmployeeProfile/EmployeeProfileDetailsPage";
import ApplicationFeedback from "./pages/HiringManagement/ReviewApplications/ApplicationFeedback";
import AuthLayout from "./components/Layout/AuthLayout";
import Layout from "./components/Layout";
import BacicLayout from "./components/Layout/BacisLayout";
import { useSelector } from "react-redux";

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
  const selectedComponent = statusComponentMap[status] || <NotFound />;

  return <div>{selectedComponent}</div>;
};


function App() {
  const user = useSelector((state) => state.user);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={user.email === "hr@gmail.com" ? <Layout /> : <BacicLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element = {<AuthLayout/>}>
          <Route path="/hiring-management" element={<HiringManagement />} />
          <Route
            path="/hiring-management/applications/*"
            element={<ApplicationStatusRouter />}
          />
    
          <Route
            path="/hiring-management/token"
            element={<ReviewTokenHistory />}
          />
          <Route path="/applications/:id" element={<ApplicationFeedback />} />
          <Route path="/employee-profile" element={<EmployeeProfile />} />

          <Route
            path="/employee-profile/:u_id"
            element={
              <EmployeeProfileDetailsPage />
            }
          />

          <Route path="/visa-hr" element={<VisaHrPage />} />
     

        <Route path="/visa" element={<VisaPage />} />

        <Route
          path="/personal-information"
          element={<PersonalInformation />}
        />
        <Route
          path="/onboarding"
          element={
            <OnboardingPage />
          }
        />
   
      </Route>
      </Route>
   
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
