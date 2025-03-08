'use client';

import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Toaster, toast } from 'sonner';
import { serverURL } from '../../utils/utils';

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
      <div className="mb-8 transition-all duration-500 ease-in-out transform hover:scale-105">
        <h1 className="text-4xl font-bold text-indigo-700">Botstudio</h1>
      </div>

      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md transition-all duration-500 ease-in-out transform hover:shadow-3xl">
        {formStep === 1 && (
          <div className="transition-opacity duration-300 ease-in-out">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Get Started</h2>
            <input
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 ease-in-out"
              placeholder="Enter your email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <button
              className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-all duration-300 ease-in-out mb-4"
              onClick={sendVerificationCode}
              disabled={loading}
            >
              {loading ? <span className="loading loading-spinner"></span> : "Continue with email"}
            </button>
          </div>
        )}

        {formStep === 2 && (
          <div className="transition-opacity duration-300 ease-in-out">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Your Details</h2>
            <input
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 ease-in-out"
              placeholder="Full Name"
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <button 
              className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-all duration-300 ease-in-out"
              onClick={() => setFormStep(3)}
            >
              Next
            </button>
          </div>
        )}

        {formStep === 3 && (
          <div className="transition-opacity duration-300 ease-in-out">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Set Password</h2>
            <input
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 ease-in-out"
              placeholder="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <button 
              className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-all duration-300 ease-in-out"
              onClick={() => setFormStep(4)}
            >
              Next
            </button>
          </div>
        )}

        {formStep === 4 && (
          <div className="transition-opacity duration-300 ease-in-out">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Verify Email</h2>
            <input
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 ease-in-out"
              placeholder="Verification Code"
              type="text"
              onChange={(e) => setVerificationCode(e.target.value)}
              value={verificationCode}
            />
            <button 
              className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-all duration-300 ease-in-out"
              onClick={verifyEmail}
            >
              Create Account
            </button>
          </div>
        )}

        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-indigo-600 hover:underline transition-colors duration-300 ease-in-out">
            Log in
          </Link>
        </p>
      </div>
      <Toaster />
    </main>
  );
}

