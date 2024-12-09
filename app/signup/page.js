"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';  // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css';  // Import styles for react-toastify
import { FaEye } from 'react-icons/fa';
import { Password, Visibility, VisibilityOff } from '@mui/icons-material';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  // Password validation function
  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[@$!%*?&#]/.test(password);

    if (password.length < minLength) {
      return "Password must be at least 8 characters long.";
    }
    if (!hasUpperCase) {
      return "Password must include at least one uppercase letter.";
    }
    if (!hasLowerCase) {
      return "Password must include at least one lowercase letter.";
    }
    if (!hasNumber) {
      return "Password must include at least one number.";
    }
    if (!hasSpecialChar) {
      return "Password must include at least one special character (@, $, !, %, *, ?, & or #).";
    }

    return ""; // No errors
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const passwordValidationError = validatePassword(password);
    if (passwordValidationError) {
      setPasswordError(passwordValidationError); // Set the error message to display below the password field

      // Show toast notification for validation failure
      toast.error(passwordValidationError, {
        position: "top-center",
        autoClose: 3000, // Auto-close after 3 seconds
      });

      return; // Stop form submission
    }
    setPasswordError(""); // Clear password error if validation passes


    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      // Show success toast
      toast.success('Signup successful! Redirecting to login...', {
        position: "top-center",
        autoClose: 3000, // Toast will auto-close after 3 seconds
        onClose: () => {
          // Redirect to login page after the toast closes
          router.push('/login');
        }
      });
    } else {
      setError(data.message);
    }
  };

  return (
    <div className="animate-fadeIn min-h-screen flex justify-center items-center ">
      <div className="bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-3xl font-semibold text-center mb-6">Sign Up</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-[#fff]">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border text-black border-gray-300 rounded-md mt-1 focus:outline-none  "
            />
          </div>
          <div className="mb-6 relative">
            <label htmlFor="password" className="block text-sm font-medium text-[#fff]">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"} // Toggle input type between text and password
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border text-black border-gray-300 rounded-md mt-1 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)} // Toggle showPassword state
              className="absolute top-1/2 right-3 transform -translate-y-1/2 flex items-center"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <VisibilityOff style={{ color: 'black' }} />
              ) : (
                <Visibility style={{ color: 'black' }} />
              )}
            </button>
          </div>


          <button
            type="submit"
            className="w-full bg-[#3730a3] text-white py-3 rounded-md text-lg font-medium hover:bg-[#3737a8] transition duration-200"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <button
              onClick={() => router.push('/login')}
              className="text-blue-600 font-medium hover:underline"
            >
              Login
            </button>
          </p>
        </div>
      </div>

      {/* Add ToastContainer at the bottom */}
      <ToastContainer />
    </div>
  );
};

export default Signup;
