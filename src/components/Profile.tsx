import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { User } from '@supabase/supabase-js';
import toast from 'react-hot-toast';
import { LoadingButton } from './common/LoadingButton';

export function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getProfile() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
        
      
          setFullName(user?.user_metadata?.full_name || '');
          setPhone(user?.user_metadata?.phone||'');
      } catch (error) {
        toast.error('Error fetching user profile');
      }
    }

    getProfile();
  }, []);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setPasswordError('');

    try {
      // Validate passwords if a new password is being set
      if (password) {
        if (password !== confirmPassword) {
          setPasswordError('Passwords do not match');
          setLoading(false);
          return;
        }
        if (password.length < 6) {
          setPasswordError('Password must be at least 6 characters long');
          setLoading(false);
          return;
        }
      }

      // Prepare update data object
      const updateData: any = {
        data: {}
      };

      // Add fields to update only if they have values
      if (fullName) {
        updateData.data.full_name = fullName;
      }
      if (phone) {
        updateData.data.phone = phone;
      }
      if (password) {
        updateData.password = password;
      }

      // Only make the API call if there's something to update
      if (Object.keys(updateData.data).length > 0 || updateData.password || updateData.phone) {
        const { error } = await supabase.auth.updateUser(updateData);
        if (error) throw error;
        toast.success('Profile updated successfully');
        setPassword('');
        setConfirmPassword(''); // Clear password field after successful update
      } else {
        toast.error('No changes to update');
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6">My Profile</h2>
        <form onSubmit={handleUpdateProfile} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <p className="mt-1 text-sm text-gray-900">{user?.email}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">New Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Enter new password"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Confirm new password"
            />
            {passwordError && (
              <p className="mt-1 text-sm text-red-600">{passwordError}</p>
            )}
          </div>

          <LoadingButton
            type="submit"
            isLoading={loading}
            loadingText="Updating..."
            className="w-full"
          >
            Update Profile
          </LoadingButton>
        </form>
      </div>
    </div>
  );
}