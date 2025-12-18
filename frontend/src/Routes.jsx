import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import PricingPage from "./pages/pricing";
import Resources from "./pages/resources";
import SolutionsHub from "./pages/solutions-hub";
import FreeTrialPage from "./pages/free-trial";
import ProductDemo from "./pages/product-demo";
import Homepage from "./pages/homepage";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Forgotpassword from "./components/forgotpassword";
import ResetPassword from "./components/ResetPassword";
import Home from "./pages/Home";
import Create from "./pages/Home/create";
import Templates from "./pages/Home/templates";
import Assemblies from "./pages/Home/assemblies";
import Profile from "./pages/Home/profile";
import Settings from "./pages/Home/settings";
import UserManagement from "./pages/Home/UserManagement"
import ProjectView from "pages/file-viewer/ProjectView";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import PdfPage from "./pages/file-viewer/PdfPage";
const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          {/* Public Routes */}
          <Route path="/" element={<FreeTrialPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/solutions-hub" element={<SolutionsHub />} />
          <Route path="/free-trial" element={<FreeTrialPage />} />
          <Route path="/product-demo" element={<ProductDemo />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgotpassword" element={<Forgotpassword />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          <Route path="*" element={<NotFound />} />
           <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route path="home" element={<Home />} />
            <Route path="create" element={<Create />} />
            <Route path="templates" element={<Templates />} />
            <Route path="assemblies" element={<Assemblies />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
            <Route path="project/:projectId" element={<ProjectView />} />
            <Route path="/view-pdf" element={<PdfPage />} />
          </Route>
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
