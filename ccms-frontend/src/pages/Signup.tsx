import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import Input  from '../components/ui/Input'
import Button from '../components/ui/Button'

export default function Signup() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '', email: '', password: '', confirm: ''
  })
  const [loading, setLoading] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name || !form.email || !form.password) {
      toast.error('Please fill in all fields')
      return
    }
    if (form.password !== form.confirm) {
      toast.error('Passwords do not match')
      return
    }
    if (form.password.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      toast.success('Account created! Welcome to CCMS 🎉')
      navigate('/dashboard')
    }, 1200)
  }

  return (
      <div className="min-h-screen bg-[#f8f7f4] flex">

        {/* Left Panel */}
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
              Start your<br />
              <span style={{ color: '#c9a84c' }}>creator journey</span><br />
              today.
            </h1>
            <p className="text-white/40 text-base leading-relaxed max-w-sm">
              Join hundreds of creators who use CCMS to organise their content, track brand deals, and grow their business.
            </p>
          </div>

          {/* Features */}
          <div className="space-y-3">
            {[
              { icon: '💡', text: 'Capture and organize unlimited content ideas' },
              { icon: '📅', text: 'Schedule posts across all your platforms'      },
              { icon: '🤝', text: 'Track brand deals and never miss a deadline'   },
              { icon: '📊', text: 'Measure your growth with built-in analytics'  },
            ].map((f, i) => (
                <div key={i} className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3">
                  <span className="text-lg">{f.icon}</span>
                  <p className="text-white/60 text-sm">{f.text}</p>
                </div>
            ))}
          </div>
        </div>

        {/* Right Panel */}
        <div className="flex-1 flex items-center justify-center p-6 md:p-12">
          <div className="w-full max-w-md">

            {/* Mobile logo */}
            <div className="flex items-center gap-3 mb-8 lg:hidden">
              <div className="w-9 h-9 rounded-xl bg-[#c9a84c] flex items-center justify-center text-[#0d0f14] font-bold">
                ✦
              </div>
              <p className="font-bold text-lg text-[#0d0f14]">CCMS</p>
            </div>

            <h2 className="font-bold text-2xl md:text-3xl text-[#0d0f14] mb-2">Create your account</h2>
            <p className="text-gray-400 text-sm mb-8">Get started with CCMS for free</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                  label="Full Name"
                  type="text"
                  placeholder="Amina Khalid"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <Input
                  label="Email Address"
                  type="email"
                  placeholder="amina@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Password</label>
                  <input
                      type="password"
                      placeholder="Min. 6 characters"
                      className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#c9a84c] bg-white"
                      value={form.password}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Confirm</label>
                  <input
                      type="password"
                      placeholder="Repeat password"
                      className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#c9a84c] bg-white"
                      value={form.confirm}
                      onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                  />
                </div>
              </div>

              <Button
                  type="submit"
                  variant="gold"
                  loading={loading}
                  className="w-full justify-center py-3 text-sm font-semibold mt-2"
              >
                Create Account
              </Button>
            </form>

            <p className="text-center text-sm text-gray-400 mt-6">
              Already have an account?{' '}
              <Link to="/login" className="text-[#c9a84c] font-semibold hover:underline">
                Sign in
              </Link>
            </p>

            <p className="text-center text-xs text-gray-300 mt-4 leading-relaxed">
              By creating an account you agree to our{' '}
              <span className="text-[#c9a84c]">Terms of Service</span>
              {' '}and{' '}
              <span className="text-[#c9a84c]">Privacy Policy</span>
            </p>
          </div>
        </div>
      </div>
  )
}