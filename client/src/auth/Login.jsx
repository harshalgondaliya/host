import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../assets/images/back.png";

const Login = () => {
  const navigate = useNavigate();

  const { backendUrl, setIsLoggedin, getUserData } = useContext(AppContext);

  const [state, setState] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      console.log("Login/Signup attempt with:", { email, password, state });
      
      // Set toast options for better UX
      const toastOptions = {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      };
      
      // Show loading toast
      const loadingToast = toast.loading("Processing request...", toastOptions);
      
      axios.defaults.withCredentials = true;

      if (state === "Sign Up") {
        console.log("Attempting signup with:", { name, email, password });
        
        try {
          const { data } = await axios.post(`${backendUrl}/api/auth/register`, {
            name,
            email,
            password,
          }, {
            timeout: 15000 // 15 second timeout
          });
          
          console.log("Signup response:", data);
  
          toast.dismiss(loadingToast);
          if (data.success) {
            toast.success("Account created successfully", toastOptions);
            setIsLoggedin(true);
            getUserData();
            navigate("/");
          } else {
            toast.error(data.message || "Sign up failed", toastOptions);
          }
        } catch (signupError) {
          toast.dismiss(loadingToast);
          console.error("Signup API error:", signupError);
          
          if (signupError.code === 'ECONNABORTED') {
            toast.error("Request timed out. Server may be down.", toastOptions);
          } else if (!navigator.onLine) {
            toast.error("You are offline. Please check your internet connection.", toastOptions);
          } else if (signupError.response) {
            toast.error(signupError.response.data?.message || "Server error. Please try again.", toastOptions);
          } else {
            toast.error("Unable to connect to server. Please try again later.", toastOptions);
          }
        }
      } else {
        console.log("Attempting login with:", { email, password });
        
        try {
          const { data } = await axios.post(`${backendUrl}/api/auth/login`, {
            email,
            password,
          }, {
            timeout: 15000 // 15 second timeout
          });
          
          console.log("Login response:", data);
  
          toast.dismiss(loadingToast);
          if (data.success) {
            toast.success("Login successful", toastOptions);
            setIsLoggedin(true);
            getUserData();
            navigate("/");
          } else {
            toast.error(data.message || "Invalid Credentials!", toastOptions);
          }
        } catch (loginError) {
          toast.dismiss(loadingToast);
          console.error("Login API error:", loginError);
          
          if (loginError.code === 'ECONNABORTED') {
            toast.error("Request timed out. Server may be down.", toastOptions);
          } else if (!navigator.onLine) {
            toast.error("You are offline. Please check your internet connection.", toastOptions);
          } else if (loginError.response) {
            toast.error(loginError.response.data?.message || "Server error. Please try again.", toastOptions);
          } else {
            toast.error("Unable to connect to server. Please try again later.", toastOptions);
          }
        }
      }
    } catch (error) {
      console.error("Global auth error:", error);
      toast.error("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-[#2C2C54] via-gray-600 to-[#2C2C54]">
      <img
        onClick={() => navigate("/")}
        src={logo}
        alt="Logo"
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
      />
      <div className="bg-white p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-950 text-sm">
        <h2 className="text-3xl font-semibold text-indigo-950 text-center mb-3">
          {state === "Sign Up" ? "Create account" : "Login"}
        </h2>

        <p className="text-center text-sm mb-6 text-indigo-950">
          {state === "Sign Up"
            ? "Create your account"
            : "Login into your account!"}
        </p>

        <form onSubmit={onSubmitHandler}>
          {state === "Sign Up" && (
            <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-indigo-950">
              <img src={assets.person_icon} alt="Person Icon" />
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="bg-transparent outline-none text-white"
                type="text"
                placeholder="Full Name"
                required
              />
            </div>
          )}

          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-indigo-950">
            <img src={assets.mail_icon} alt="Mail Icon" />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="bg-transparent outline-none text-white"
              type="email"
              placeholder="Email id"
              required
            />
          </div>

          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-indigo-950">
            <img src={assets.lock_icon} alt="Lock Icon" />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="bg-transparent outline-none text-white"
              type="password"
              placeholder="Password"
              required
            />
          </div>

          <p
            onClick={() => navigate("/reset-password")}
            className="mb-4 text-indigo-950 cursor-pointer underline"
          >
            Forget password?
          </p>

          <button
            className="w-full py-2.5 rounded-full bg-gradient-to-r from-white to-indigo-950 text-green font-medium hover:bg-gradient-to-r hover:from-indigo-950 hover:to-white"
            type="submit"
          >
            {state}
          </button>
        </form>

        {state === "Sign Up" ? (
          <p className="text-green-950 text-center text-xs mt-4">
            Already have an account? &nbsp;&nbsp;
            <span
              onClick={() => setState("Login")}
              className="text-green-950 cursor-pointer underline"
            >
              Login here
            </span>
          </p>
        ) : (
          <p className="text-indigo-950 text-center text-xs mt-4">
            Don't have an account? &nbsp;&nbsp;
            <span
              onClick={() => setState("Sign Up")}
              className="text-indigo-950 cursor-pointer underline"
            >
              Sign up
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
