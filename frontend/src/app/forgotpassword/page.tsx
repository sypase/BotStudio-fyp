"use client"

import { useState } from "react"
import Link from "next/link"
import { toast } from "sonner"
import { motion } from "framer-motion"
import axios from "axios"
import { serverURL } from "@/utils/utils"

export default function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const resetPassword = async () => {
    setIsSubmitting(true)
    try {
      const response = await axios.post(`${serverURL}/users/reset-password`, { email })
      toast.success("Reset link sent to your email!")
      // You could redirect after a delay or keep them on the page
    } catch (error) {
      toast.error("Failed to send reset link. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Reset your password</h2>
            <p className="text-gray-600 mb-6">
              Enter your email address and we send you a link to reset your password.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                resetPassword()
              }}
              className="space-y-6"
            >
              <div>
                <label htmlFor="email" className="text-sm font-medium text-gray-700 block mb-2">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70"
                >
                  {isSubmitting ? "Sending..." : "Send reset link"}
                </button>
              </div>
            </form>
          </div>
          <div className="px-8 py-6 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
            <span className="text-sm text-gray-600">
              Remember your password?{" "}
              <Link href="/" className="font-medium text-indigo-600 hover:text-indigo-500">
                Sign in
              </Link>
            </span>
            <Link href="/signup" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
              Create account
            </Link>
          </div>
        </div>
      </motion.div>
    </main>
  )
}

