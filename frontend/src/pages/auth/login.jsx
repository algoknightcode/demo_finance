import React, { useState, useEffect, useContext } from "react";
import AuthLayout from "../../components/layout/authlayout";
import Input from "../../components/input";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"; 
import axiosInstance from "../../util/axiosInstance";
import { API_PATHS, BASE_URL } from "../../util/apipath";
import { UserContext } from "../../context/usercontext";

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [serverStatus, setServerStatus] = useState("unknown"); // Track server status
  const { updateUser } = useContext(UserContext);
  
  const navigate = useNavigate();
  
  // Check if backend is running on component mount
  useEffect(() => {
    const checkServer = async () => {
      try {
        // Issue a lightweight GET request to confirm the backend is reachable
        const response = await fetch(`${BASE_URL.replace(/\/+$/, "")}/api/health`, {
          method: "GET",
          mode: "cors",
        }); 

        if (!response.ok) {
          throw new Error(`Health check failed with status ${response.status}`);
        }
        setError(null);
        setServerStatus("available");
      } catch (error) {
        console.error("Backend server check failed:", error);
        setServerStatus("unavailable");
        setError("Connection to server failed. Please ensure your backend is running on port 5000.");
      }
    };
    
    checkServer();
  }, []);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }
    
    if (serverStatus === "unavailable") {
      setError("Backend server is not running. Please start your backend server on port 5000.");
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      if (response.data && response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("apiEndpoint", axiosInstance.defaults.baseURL);
        setError(null);
        updateUser(response.data.user);
        navigate("/dashboard");
      } else {
        setError("Login succeeded but no token received. Check backend response format.");
      }
    } catch (error) {
      console.error("Login error:", error);

      const msg = error.response?.data?.message ||
        "Login failed. Please verify your credentials and that the backend is running on port 5000.";
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="lg:w-[70%] min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-lg">
          <div className="space-y-2 text-center">
            <h3 className="text-2xl font-bold text-gray-900">Welcome Back</h3>
            <p className="text-sm text-gray-600">
              Please enter your details to log in
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {serverStatus === "unavailable" && (
              <div className="p-3 bg-red-50 text-red-700 rounded-md text-sm">
                ⚠️ Backend server not detected. Please make sure your backend is running on port 5000.
              </div>
            )}
            
            <div className="space-y-4">
              <Input
                value={email}
                onChange={({ target }) => setemail(target.value)}
                label="email"
                placeholder="John@example.com"
                type="text"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              />
              <Input
                value={password}
                onChange={({ target }) => setpassword(target.value)}
                label="password"
                placeholder="min 8 char"
                type="password"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={isLoading || serverStatus === "unavailable"}
              className={`w-full py-3 px-4 bg-primary text-black rounded-lg font-medium ${
                isLoading || serverStatus === "unavailable" ? "opacity-70 cursor-not-allowed" : "hover:bg-primary/90"
              } transition-colors focus:ring-2 focus:ring-primary/50 focus:ring-offset-2`}
            >
              {isLoading ? "LOGGING IN..." : "LOGIN"}
            </button>

            <p className="text-sm text-center text-gray-600">
              Don't have an account?{" "}
              <Link
                className="font-semibold text-primary hover:text-primary/80 transition-colors"
                to="/signup"
              >
                SignUp
              </Link>
            </p>
          </form>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;
