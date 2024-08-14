import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/authContext'; // Adjust the path as needed
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const Profile = () => {
  const { user, loading, error, handleSignOut, handlePasswordReset } = useContext(AuthContext);
  const navigate = useNavigate(); // Initialize useNavigate hook

  const [resetEmail, setResetEmail] = useState('');
  const [resetMessage, setResetMessage] = useState(null);

  if (loading) {
    return <div className="text-center text-2xl h-full w-full flex items-center justify-center text-gray-600">Loading your profile...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  if (!user) {
    return <div className="text-center text-gray-600">No user data available</div>;
  }

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    const message = await handlePasswordReset(resetEmail);
    if (message) {
      setResetMessage(message);
      setResetEmail(''); // Clear the input if successful
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">Profile</h1>
      <div className="space-y-4">
        <p className="text-lg text-gray-700"><strong>Name:</strong> {user.displayName || 'No name available'}</p>
        <p className="text-lg text-gray-700"><strong>Email:</strong> {user.email}</p>
      </div>
      <button
        onClick={handleSignOut}
        className="mt-6 block w-full select-none rounded-lg bg-red-500 py-3 px-6 text-center text-white font-bold transition-all hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
      >
        Sign Out
      </button>
      
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Reset Password</h2>
        <form onSubmit={handleResetSubmit} className="space-y-4">
          <div>
            <label htmlFor="resetEmail" className="block text-gray-700 font-semibold mb-2">Email:</label>
            <input
              type="email"
              id="resetEmail"
              name="resetEmail"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          {resetMessage && <div className="text-green-500">{resetMessage}</div>}
          {error && <div className="text-red-500">{error}</div>}
          <button
            type="submit"
            className="w-full select-none rounded-lg bg-blue-500 py-3 px-6 text-center text-white font-bold transition-all hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
