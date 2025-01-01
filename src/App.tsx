import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { supabase } from './lib/supabase';
import { Auth } from './components/Auth';
import { MutualFundList } from './components/MutualFundList';
import { ProfileDropdown } from './components/ProfileDropdown';
import { Profile } from './components/Profile';
import { Toaster } from 'react-hot-toast';

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  if (!session) {
    return <Auth />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Toaster position="top-center" />
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link to="/" className="text-xl font-bold text-gray-900 hover:text-indigo-600 transition-colors">
                  Mutual Fund Tracker
                </Link>
              </div>
              <div className="flex items-center">
                <ProfileDropdown onSignOut={handleSignOut} />
              </div>
            </div>
          </div>
        </nav>

        <main className="py-10">
          <Routes>
            <Route path="/" element={<MutualFundList />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;