import React from 'react';
import {useAuth } from '@/hooks/useAuth'
const GoogleBtn = () => {
    const { handleSignIn } = useAuth()

  return (
    <button
      onClick={handleSignIn}
      className="bg-flame text-floralWhite p-3 rounded shadow-md hover:bg-floralWhite hover:text-flame transition-colors duration-200"
    >
      Sign in with Google
    </button>
  );
};

export default GoogleBtn;
