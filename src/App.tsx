import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/public/HomePage';
import AboutPage from './pages/public/AboutUsPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ProfilePage from './components/Profile/ProfilePage';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import NotFoundPage from './pages/NotFoundPage';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import BikeDetailPage from './components/Bike/BikeDetailPage';
import UserManagement from './pages/Admin/UserManagement';
import BikeManagement from './components/Admin/BikeManagemen';
import BikeListingPage from './components/Bike/BikeListingPage';
import PaymentPage from './components/Rental/PaymentPage';
import ReturnBikePage from './pages/Admin/ReturnBikePage';
import CouponManagementPage from './pages/Admin/CouponManagementPage';
import CouponsPage from './pages/public/page/CouponsPage';
import AppFooter from './components/Footer';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import ContactUs from './components/ContactUs';
import MyRentalsPage from './components/Rental/MyRentalsPage';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="content flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/bikes" element={<BikeListingPage />} />
            <Route path="/bikes/:bikeId" element={<BikeDetailPage />} />
            <Route path="/payment/:rentalId" element={<PaymentPage />} />
            <Route path="/coupons" element={<CouponsPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/contact-us" element={<ContactUs />} />

            {/* Private Routes */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <UserDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <ProfilePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/rental-management"
              element={
                <PrivateRoute>
                  <MyRentalsPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/bike-management"
              element={
                <PrivateRoute>
                  <BikeListingPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/bike-management/:bikeId"
              element={
                <PrivateRoute>
                  <BikeDetailPage />
                </PrivateRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin/dashboard"
              element={
                <PrivateRoute>
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/user-management"
              element={
                <PrivateRoute>
                  <AdminRoute>
                    <UserManagement />
                  </AdminRoute>
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/bike-management"
              element={
                <PrivateRoute>
                  <AdminRoute>
                    <BikeManagement />
                  </AdminRoute>
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/rental-management"
              element={
                <PrivateRoute>
                  <AdminRoute>
                    <ReturnBikePage />
                  </AdminRoute>
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/coupon-management"
              element={
                <PrivateRoute>
                  <AdminRoute>
                    <CouponManagementPage />
                  </AdminRoute>
                </PrivateRoute>
              }
            />

            {/* 404 Page */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
        <AppFooter />
      </div>
    </Router>
  );
};

export default App;












