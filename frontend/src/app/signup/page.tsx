"use client";

import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin, CredentialResponse } from '@react-oauth/google';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { motion } from 'framer-motion';

// Define serverURL here or use an environment variable
const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000/api';

export default function Signup() {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [formStep, setFormStep] = useState<number>(1);

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem("token")) {
      window.location.href = "/chat";
    }
  }, []);

  const handleGoogleSuccess = async (response: CredentialResponse) => {
    try {
      const tokenId = response.credential;
      const res = await axios.post(`${serverURL}/users/google-auth`, { tokenId });
      if (res.status === 200) {
        const { token, user } = res.data;
        toast.success("Google Authentication Successful!");
        localStorage.setItem("token", token);
        window.location.href = user.type === "admin" ? "/admin" : "/";
      }
    } catch (error) {
      console.error("Google authentication error:", error);
      toast.error("Google authentication failed. Please try again.");
    }
  };

  const sendVerificationCode = async () => {
    setLoading(true);
    if (email === "") {
      toast.error("Please enter your email!");
      setLoading(false);
      return;
    }

    try {
      await axios.post(`${serverURL}/users/send-verification-code`, { email });
      toast.success("Verification Code Sent!");
      setLoading(false);
      setFormStep(2);
    } catch (error) {
      toast.error("Something went wrong! Please try again later.");
      setLoading(false);
    }
  };

  const verifyEmail = async () => {
    if (name === "" || password === "" || verificationCode === "") {
      toast.error("Please fill out all fields!");
      return;
    }

    try {
      await axios.post(`${serverURL}/users/verify-email`, { email, code: verificationCode });
      toast.success("Email verified!");
      signup();
    } catch (error) {
      toast.error("Something went wrong! Please try again later.");
    }
  };

  const signup = async () => {
    try {
      await axios.post(`${serverURL}/users/signup`, { name, email, password });
      toast.success("Account created!");
      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex flex-col items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-indigo-700">Botstudio</h1>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md"
      >
        {formStep === 1 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Get Started</h2>
            <input
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <button
              className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-300 mb-4"
              onClick={sendVerificationCode}
              disabled={loading}
            >
              {loading ? <span className="loading loading-spinner"></span> : "Continue with email"}
            </button>
            
            <div className="flex items-center justify-center my-4">
              <div className="border-t border-gray-300 flex-grow mr-3"></div>
              <span className="text-gray-500">or</span>
              <div className="border-t border-gray-300 flex-grow ml-3"></div>
            </div>

            <div className="flex justify-center">
              <GoogleOAuthProvider clientId="602949390183-3164gj6t7dk9nsir9baenhsbgldhondc.apps.googleusercontent.com">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => toast.error("Google Sign-In failed. Please try again.")}
                  size='large'
                  theme="filled_blue"
                  shape='pill'
                  text='continue_with'
                />
              </GoogleOAuthProvider>
            </div>
          </motion.div>
        )}

        {formStep === 2 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Your Details</h2>
            <input
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Full Name"
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <button 
              className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-300"
              onClick={() => setFormStep(3)}
            >
              Next
            </button>
          </motion.div>
        )}

        {formStep === 3 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Set Password</h2>
            <input
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <button 
              className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-300"
              onClick={() => setFormStep(4)}
            >
              Next
            </button>
          </motion.div>
        )}

        {formStep === 4 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Verify Email</h2>
            <input
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Verification Code"
              type="text"
              onChange={(e) => setVerificationCode(e.target.value)}
              value={verificationCode}
            />
            <button 
              className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-300"
              onClick={verifyEmail}
            >
              Create Account
            </button>
          </motion.div>
        )}

        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-indigo-600 hover:underline">
            Log in
          </Link>
        </p>
      </motion.div>
      <ToastContainer />
    </main>
  );
}

