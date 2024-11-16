// /routes/AppRoutes.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../components/pages/Home';
import AuthPage from "../features/auth/AuthPage";
import RegisterForm from '../features/auth/components/RegisterForm';

import AboutPage from '../components/pages/AboutPage';
import BellsPage from '../components/pages/BellsPage';
import ChefPage from '../components/pages/ChefPage';
import JoinUsPage from '../components/pages/JoinUsPage';
import MediaContactPage from '../components/pages/MediaContactPage';
import NextEventsPage from '../components/pages/NextEventsPage';
import PastShowsPage from '../components/pages/PastShowsPage';
import StaffPage from '../components/pages/StaffPage';


import AudioPracticePage from '../components/pages/members/AudioPracticePage';
import BlogPage from '../components/pages/members/BlogPage';
import ChoristsPage from '../components/pages/members/ChoristsPage';
import ComingEventsPage from '../components/pages/members/ComingEventsPage';
import SchedulesPage from '../components/pages/members/SchedulesPage';
import ScoresPage from '../components/pages/members/ScoresPage';


const AppRoutes = () => {
	const { user } = AuthPage();
	const isAuthenticated = !!user;
	const isAdmin = user?.is_admin || false;
	
  return (
    <Routes>
      {/* Public Routes */}
	  <Route path="/" element={<Home />} />
	  <Route path="/login" element={!isAuthenticated ? <AuthPage /> : <Navigate to="/" />} />
      <Route path="/register" element={!isAuthenticated ? <RegisterForm /> : <Navigate to="/" />} />

	  <Route path="/about" element={<AboutPage />} />
	  <Route path="/bells" element={<BellsPage />} />
	  <Route path="/chef" element={<ChefPage />} />
	  <Route path="/join-us" element={<JoinUsPage />} />
	  <Route path="/media-contact" element={<MediaContactPage />} />
	  <Route path="/next-events" element={<NextEventsPage />} />
      <Route path="/past-shows" element={<PastShowsPage />} />
	  <Route path="/staff" element={<StaffPage />} />

      {/* Authenticated Routes */}
	  {isAuthenticated && (
        <>
          {/* Other authenticated routes */}
		  <Route path="/member-audio" element={<AudioPracticePage />} />
		  <Route path="/member-blog" element={<BlogPage />} />
		  <Route path="/member-chorists" element={<ChoristsPage isAdmin={isAdmin} />} />
		  <Route path="/member-coming-event" element={<ComingEventsPage />} />
		  <Route path="/member-dashboard" element={<Dashboard />} />
		  <Route path="/member-schedules" element={<SchedulesPage />} />
		  <Route path="/member-scores" element={<ScoresPage />} />
        </>
      )}
	   {/* Admin Routes */}
	   {/* {isAuthenticated && isAdmin && (
        <Route path="/feature-flags" element={<FeatureFlagsPage />} />
      )} */}

      {/* Redirect unknown paths to home */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
