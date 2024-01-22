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
import ProtectedRoute from "./components/Layout/ProtectedRoute";
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
  const selectedComponent = statusComponentMap[status] || <NotFound />;

  return <div>{selectedComponent}</div>;
};
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register/:token" element={<Register />} />
          {/* <Route element = {<AuthLayout/>}> */}
          <Route
            path="/hiring-management"
            element={
              <ProtectedRoute>
                <HiringManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/hiring-management/applications/*"
            element={
              <ProtectedRoute>
                <ApplicationStatusRouter />
              </ProtectedRoute>
            }
          />
          <Route
            path="/hiring-management/applications"
            element={
              <ProtectedRoute>
                <ReviewApplications />
              </ProtectedRoute>
            }
          />
          <Route
            path="/hiring-management/token"
            element={
              <ProtectedRoute>
                <ReviewTokenHistory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/applications/:id"
            element={
              <ProtectedRoute>
                <ApplicationFeedback />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route
          path="/visa"
          element={
            <ProtectedRoute>
              <VisaPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/visa-hr"
          element={
            <ProtectedRoute>
              <VisaHrPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/personal-information"
          element={
            <ProtectedRoute>
              <PersonalInformationPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/onboarding"
          element={
            <ProtectedRoute>
              <OnboardingPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employee-profile"
          element={
            <ProtectedRoute>
              <EmployeeProfilePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employee-profile/details"
          element={
            <ProtectedRoute>
              <EmployeeProfileDetailsPage />
            </ProtectedRoute>
          }
        />
        {/* </Route> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
