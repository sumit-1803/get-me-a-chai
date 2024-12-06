"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast , ToastContainer } from 'react-toastify'; // Import toast from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for styling

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      // Save the JWT token to localStorage or cookies
      localStorage.setItem('token', data.token);
      toast.success('Login successful!'); // Show success toast
      router.push('/dashboard'); // Redirect to dashboard after successful login
      window.location.reload();
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
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-[#fff]">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 text-black border border-gray-300 rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#3730a3] text-white py-3 rounded-md text-lg font-medium hover:bg-[#3737a8]  transition duration-200"
          >
            Login
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
