'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function RegisterPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError("Passwords don't match")
      return
    }

    setLoading(true)

    const { error } = await supabase.auth.signUp({ email, password })

    setLoading(false)

    if (error) {
      setError(error.message)
    } else {
      router.push('/login')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 bg-opacity-70 p-6">
      <div className="max-w-md w-full bg-gray-900 bg-opacity-90 p-8 rounded-xl shadow-lg backdrop-blur-sm">
        <h2 className="text-3xl font-bold mb-6 text-white text-center">Create Account</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block mb-2 font-medium text-gray-300">
              Email address
            </label>
            <input
              id="email"
              type="email"
              required
              className="w-full px-4 py-3 bg-gray-800 text-white placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-2 font-medium text-gray-300">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              className="w-full px-4 py-3 bg-gray-800 text-white placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block mb-2 font-medium text-gray-300">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              required
              className="w-full px-4 py-3 bg-gray-800 text-white placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
            />
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 transition duration-300 ease-in-out text-white font-semibold px-4 py-2 rounded-md disabled:bg-purple-400 disabled:cursor-not-allowed"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <p className="mt-6 text-center text-gray-400">
          Already have an account?{' '}
          <a href="/login" className="text-purple-400 hover:underline">
            Sign in here
          </a>
        </p>
      </div>
    </div>
  )
}
