import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // if loggedin move to home
  useEffect(() => {
    if (sessionStorage.getItem("user_id")) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        sessionStorage.setItem("token", data.token); // Save the token in localStorage
        sessionStorage.setItem("user_id", data.user_id); // Save the user ID in sessionStorage
        navigate("/profile"); // Navigate to a protected route
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("An unexpected error occurred!");
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col lg:flex-row justify-center px-6 py-12 lg:px-8">
      {/* Left Side (Image) */}
      <div className="hidden lg:flex lg:w-1/2 justify-center items-center">
        <img
          alt="CareCompass"
          src="/auth-Illustration.png"
          className="w-2/3 object-contain"
        />
      </div>

      {/* Right Side (Form) */}
      <div className="flex flex-col justify-center lg:w-1/2">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="CareCompass"
            src="/logo.svg"
            className="mx-auto h-16 w-auto"
          />
          <h2 className="mt-4 text-center text-2xl font-bold tracking-tight">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 text-black focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium">
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 text-black focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm">
            Not a user?{" "}
            <span
              onClick={() => navigate("/register")}
              className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer"
            >
              Register Now
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
