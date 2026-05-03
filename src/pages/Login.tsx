import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import Input  from '../components/ui/Input'
import Button from '../components/ui/Button'

export default function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.email || !form.password) {
      toast.error('Please fill in all fields')
      return
    }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      toast.success('Welcome back, Amina!')
      navigate('/dashboard')
    }, 1000)
  }

  return (
      <div className="min-h-screen bg-[#f8f7f4] flex">

        {/* Left Panel — Branding */}
        <div className="hidden lg:flex lg:w-1/2 bg-[#0d0f14] flex-col justify-between p-12">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#c9a84c] flex items-center justify-center text-[#0d0f14] font-bold text-lg">
              ✦
            </div>
            <div>
              <p className="text-white font-bold text-lg leading-none">CCMS</p>
              <p className="text-white/30 text-xs uppercase tracking-widest mt-0.5">Creator Studio</p>
            </div>
          </div>

          <div>
            <h1 className="text-4xl xl:text-5xl font-bold text-white leading-tight mb-6">
              Manage your<br />
              <span style={{ color: '#c9a84c' }}>creator business</span><br />
              in one place.
            </h1>
            <p className="text-white/40 text-base leading-relaxed max-w-sm">
              Content ideas, scheduling, brand collaborations and analytics — all in one powerful dashboard built for modern creators.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { val: '500+', label: 'Creators' },
              { val: '$2M+', label: 'Revenue Tracked' },
              { val: '10K+', label: 'Posts Scheduled' },
            ].map((s, i) => (
                <div key={i} className="bg-white/5 rounded-2xl p-4">
                  <p className="text-white font-bold text-xl">{s.val}</p>
                  <p className="text-white/30 text-xs mt-1">{s.label}</p>
                </div>
            ))}
          </div>
        </div>

        {/* Right Panel — Form */}
        <div className="flex-1 flex items-center justify-center p-6 md:p-12">
          <div className="w-full max-w-md">

            {/* Mobile logo */}
            <div className="flex items-center gap-3 mb-10 lg:hidden">
              <div className="w-9 h-9 rounded-xl bg-[#c9a84c] flex items-center justify-center text-[#0d0f14] font-bold">
                ✦
              </div>
              <p className="font-bold text-lg text-[#0d0f14]">CCMS</p>
            </div>

            <h2 className="font-bold text-2xl md:text-3xl text-[#0d0f14] mb-2">Welcome back</h2>
            <p className="text-gray-400 text-sm mb-8">Sign in to your creator dashboard</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                  label="Email Address"
                  type="email"
                  placeholder="amina@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                    Password
                  </label>
                  <button type="button" className="text-xs text-[#c9a84c] hover:underline">
                    Forgot password?
                  </button>
                </div>
                <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#c9a84c] bg-white"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
              </div>

              <Button
                  type="submit"
                  variant="gold"
                  loading={loading}
                  className="w-full justify-center py-3 text-sm font-semibold mt-2"
              >
                Sign In to Dashboard
              </Button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-400">or</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* Demo login */}
            <button
                onClick={() => { toast.success('Demo login — Welcome!'); navigate('/dashboard') }}
                className="w-full py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all"
            >
              🚀 Continue with Demo Account
            </button>

            <p className="text-center text-sm text-gray-400 mt-6">
              Don't have an account?{' '}
              <Link to="/signup" className="text-[#c9a84c] font-semibold hover:underline">
                Sign up free
              </Link>
            </p>
          </div>
        </div>
      </div>
  )
}