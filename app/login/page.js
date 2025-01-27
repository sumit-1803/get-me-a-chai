"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify'; // Import toast from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for styling
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    setLoading(false);

    if (res.ok) {
      localStorage.setItem('token', data.token);
      
      toast.success('Login successful!');

      router.push('/dashboard');
      setTimeout(() => {
        setTimeout(() => {
          window.location.reload(); 
        }, 500); // 500ms delay to ensure proper routing
      }, 200); // 1-second delay before redirecting
    } else {
      setError(data.message);
      toast.error(`Error: ${data.message}`); // Show error toast
    }

  };

  const handleRedirectToSignup = () => {
    router.push('/signup'); // Redirect to signup page
  };

  return (
    <div className="animate-fadeIn min-h-screen flex justify-center items-center bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
      <div className="bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-3xl font-semibold text-center mb-6">Login</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleLogin}>
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
              className="w-full p-3 text-black border border-gray-300 rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6 relative">
            <label htmlFor="password" className="block text-sm font-medium text-[#fff]">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 text-black border border-gray-300 rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            className="w-full bg-[#3730a3] text-white py-3 rounded-md text-lg font-medium hover:bg-[#3737a8]  transition duration-200"
            disabled={loading}
          >
            {loading ? (
              <span className="animate-spin">Loading...</span> // Add a loading spinner or text
            ) : (
              'Login'
            )}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don&apos;t have an account?{' '}
            <button
              onClick={handleRedirectToSignup}
              className="text-blue-600 font-medium hover:underline"
            >
              Register
            </button>
          </p>
        </div>
      </div>
      {/* Toast Container should be added to render toasts */}
      <ToastContainer />
    </div>
  );
};

export default Login;
