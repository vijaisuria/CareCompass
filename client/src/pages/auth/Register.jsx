import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function Register() {
  const navigate = useNavigate();

  // if loggedin move to home
  useEffect(() => {
    if (sessionStorage.getItem("user_id")) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    if (data.password !== data["confirm-password"]) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            password: data.password,
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        toast.success(result.message);
        navigate("/login");
      } else {
        toast.error(result.message || "Registration failed");
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col lg:flex-row justify-center px-6 py-12 lg:px-8">
      {/* Left Side (Image) */}
      <div className="hidden lg:flex lg:w-1/2 justify-center items-center">
        <img
          alt="Register Illustration"
          src="/auth-Illustration.png"
          className="w-2/3 object-contain"
        />
      </div>

      {/* Right Side (Form) */}
      <div className="flex flex-col justify-center lg:w-1/2">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="/logo.svg"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-4 text-center text-2xl font-bold tracking-tight">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm">
            Join us and unlock endless opportunities to grow and succeed.
          </p>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium">
                Full Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 text-black focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 text-black focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 text-black focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium"
              >
                Confirm Password
              </label>
              <div className="mt-2">
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  required
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 text-black focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="terms" className="ml-2 block text-sm">
                I accept the terms and conditions
              </label>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Register
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer"
            >
              Sign in here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
