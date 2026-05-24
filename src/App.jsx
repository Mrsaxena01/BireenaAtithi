import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ToastContainer } from 'react-toastify';
import { RootLayout } from '@/layouts/RootLayout';
import { HomePage } from '@/pages/home';
import { ReservationsPage } from '@/pages/reservations/index';
import { LoginPage } from '@/pages/auth/login';
import { AboutPage } from '@/pages/about';
import { FeaturesPage } from '@/pages/features';
import { PricingPage } from '@/pages/pricing';
import { ContactPage } from '@/pages/contact';
import { NotFoundPage } from '@/pages/not-found';
import { PageTransition } from '@/components/shared';
import 'react-toastify/dist/ReactToastify.css';
import { Analytics } from '@vercel/analytics/next';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">

      <Routes location={location} key={location.pathname}>
        <Route element={<RootLayout />}>
          <Route
            path="/"
            element={
              <PageTransition>
                <HomePage />
              </PageTransition>
            }
          />

          <Route
            path="/about"
            element={
              <PageTransition>
                <AboutPage />
              </PageTransition>
            }
          />
          <Route
            path="/features"
            element={
              <PageTransition>
                <FeaturesPage />
              </PageTransition>
            }
          />
          <Route
            path="/pricing"
            element={
              <PageTransition>
                <PricingPage />
              </PageTransition>
            }
          />
          <Route
            path="/contact"
            element={
              <PageTransition>
                <ContactPage />
              </PageTransition>
            }
          />

          <Route
            path="/login"
            element={
              <PageTransition>
                <LoginPage />
              </PageTransition>
            }
          />
          <Route
            path="/register"
            element={
              <PageTransition>
                <div>Register Page - Coming Soon</div>
              </PageTransition>
            }
          />
          <Route
            path="/reservations"
            element={
              <PageTransition>
                <ReservationsPage />
              </PageTransition>
            }
          />

          {/* Catch all unmatched routes - 404 page */}
          <Route
            path="*"
            element={
              <PageTransition>
                <NotFoundPage />
              </PageTransition>
            }
          />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AnimatedRoutes />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Analytics />
    </Router>
  );
}

export default App;
