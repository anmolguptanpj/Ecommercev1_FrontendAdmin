import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../store/authSlice";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(
        loginUser({
          email,
          password,
          loginFrom: "ADMIN",
        })
      ).unwrap();

      navigate("/home");
    } catch (err) {
      console.log("Login failed:", err);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
      <div className="w-full max-w-md">
        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-black">Welcome Back</h1>
            <p className="mt-2 text-gray-500">
              Login to continue managing the admin panel
            </p>
          </div>

          {isAuthenticated && (
            <div className="mb-5 rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-600">
              Logged in Successfully
            </div>
          )}

          {error && (
            <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-500">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-sm text-gray-500">Email Address</label>
              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-2 w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-black"
              />
            </div>

            <div>
              <label className="text-sm text-gray-500">Password</label>
              <input
                type={show ? "text" : "password"}
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-2 w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-black"
              />

              <div className="mt-4 flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={show}
                  onChange={() => setShow((prev) => !prev)}
                  className="h-4 w-4 accent-black"
                />
                <label className="text-sm text-gray-600">Show Password</label>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full rounded-2xl py-3 font-medium text-white transition ${
                loading
                  ? "cursor-not-allowed bg-gray-400"
                  : "bg-black hover:opacity-90"
              }`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
