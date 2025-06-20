'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function AdminLoginPage() {
  const [password, setPassword] = useState('')
  const router = useRouter()
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      document.cookie = "admin_auth=true; path=/"
      router.push('/admin')
    } else {
      setError("Invalid password")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-purple-600 to-pink-600">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">Admin Login</h2>
        <div className="mb-4">
          <label htmlFor="password" className="block text-lg font-semibold text-gray-700 mb-2">Password</label>
          <input
            type="password"
            id="password"
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
        <button className="w-full py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition duration-300">
          Login
        </button>
      </form>
    </div>
  )
}
