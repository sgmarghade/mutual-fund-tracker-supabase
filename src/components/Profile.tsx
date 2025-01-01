import React from 'react';
import { supabase } from '../lib/supabase';

export function Profile() {
  const user = supabase.auth.getUser();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6">My Profile</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <p className="mt-1 text-sm text-gray-900">{user.data?.user?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}