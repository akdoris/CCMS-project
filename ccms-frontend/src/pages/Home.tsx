import { useNavigate } from 'react-router-dom'

const FEATURES = [
  { icon: '💡', title: 'Content Ideas',      desc: 'Capture, organize and track every content idea across all your platforms.' },
  { icon: '📅', title: 'Smart Scheduling',   desc: 'Schedule posts with a visual calendar and get reminders before every deadline.' },
  { icon: '🤝', title: 'Brand Collabs',      desc: 'Manage brand deals from first contact to final payment in one place.' },
  { icon: '📊', title: 'Analytics',          desc: 'Track performance, engagement and revenue growth over time.' },
  { icon: '🔔', title: 'Notifications',      desc: 'Never miss a deadline with smart alerts for collabs and scheduled posts.' },
  { icon: '⚙️', title: 'Customizable',      desc: 'Personalize your profile, link your social accounts and set your preferences.' },
]

const STATS = [
  { val: '500+',  label: 'Active Creators'    },
  { val: '$2M+',  label: 'Revenue Tracked'    },
  { val: '10K+',  label: 'Posts Scheduled'    },
  { val: '98%',   label: 'Creator Satisfaction' },
]

const TESTIMONIALS = [
  { name: 'James O.',  role: 'YouTube Creator · 280K subs',  avatar: 'JO', text: 'CCMS completely changed how I manage brand deals. I used to miss deadlines constantly — now everything is tracked in one place.' },
  { name: 'Priya S.',  role: 'Instagram Creator · 95K subs', avatar: 'PS', text: 'The scheduling calendar is my favourite feature. I can see my entire month at a glance and plan content way ahead of time.' },
  { name: 'Marcus T.', role: 'TikTok Creator · 450K subs',   avatar: 'MT', text: 'I went from spreadsheets to CCMS and saved 5+ hours every week. The brand collab tracker alone is worth it.' },
]

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#f8f7f4]">

      {/* ── NAV ────────────────────────────────────────────── */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#c9a84c] flex items-center justify-center text-[#0d0f14] font-bold text-sm">
              ✦
            </div>
            <span className="font-bold text-[#0d0f14] text-base">CCMS</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-gray-500">
            <button onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-[#0d0f14] transition-colors">Features</button>
            <button onClick={() => document.getElementById('stats')?.scrollIntoView({ behavior: 'smooth' })}    className="hover:text-[#0d0f14] transition-colors">Stats</button>
            <button onClick={() => document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-[#0d0f14] transition-colors">Reviews</button>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => navigate('/login')}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-[#0d0f14] transition-colors">
              Sign In
            </button>
            <button onClick={() => navigate('/signup')}
              className="px-4 py-2 bg-[#c9a84c] text-[#0d0f14] text-sm font-semibold rounded-xl hover:bg-[#f0c96b] transition-all">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* ── HERO ───────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-20 md:py-28 text-center">
        <div className="inline-flex items-center gap-2 bg-[#c9a84c]/10 text-[#a07820] text-xs font-semibold px-4 py-2 rounded-full mb-6">
          ✦ Built for Digital Content Creators
        </div>
        <h1 className="font-bold text-4xl md:text-6xl text-[#0d0f14] leading-tight mb-6">
          Your entire creator<br />
          <span style={{ color: '#c9a84c' }}>business, managed.</span>
        </h1>
        <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          CCMS helps you capture content ideas, schedule posts, track brand collaborations and measure your growth — all in one beautiful dashboard.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button onClick={() => navigate('/signup')}
            className="px-8 py-3.5 bg-[#0d0f14] text-white text-sm font-semibold rounded-xl hover:bg-[#1c1f2a] transition-all">
            Start for Free →
          </button>
          <button onClick={() => navigate('/dashboard')}
            className="px-8 py-3.5 border border-gray-200 text-gray-700 text-sm font-semibold rounded-xl hover:bg-gray-50 transition-all">
            View Demo Dashboard
          </button>
        </div>
      </section>

      {/* ── STATS ──────────────────────────────────────────── */}
      <section id="stats" className="bg-[#0d0f14] py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {STATS.map((s, i) => (
              <div key={i} className="text-center">
                <p className="font-bold text-3xl md:text-4xl text-[#c9a84c] mb-1">{s.val}</p>
                <p className="text-white/40 text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ───────────────────────────────────────── */}
      <section id="features" className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="font-bold text-3xl md:text-4xl text-[#0d0f14] mb-4">
            Everything you need to grow
          </h2>
          <p className="text-gray-400 text-base max-w-xl mx-auto">
            From idea to published content — CCMS covers every step of your creator workflow.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:-translate-y-1 hover:shadow-md transition-all">
              <div className="text-3xl mb-4">{f.icon}</div>
              <h3 className="font-bold text-base text-[#0d0f14] mb-2">{f.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ───────────────────────────────────── */}
      <section className="bg-white py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="font-bold text-3xl md:text-4xl text-[#0d0f14] mb-4">How it works</h2>
            <p className="text-gray-400 text-base">Get up and running in minutes</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Create your account',     desc: 'Sign up in seconds and set up your creator profile with your platforms and niche.' },
              { step: '02', title: 'Add your content & deals', desc: 'Import your ideas, schedule posts, and add brand collaborations to your tracker.' },
              { step: '03', title: 'Grow with confidence',    desc: 'Track deadlines, measure performance, and never miss an opportunity again.' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 rounded-2xl bg-[#c9a84c]/10 flex items-center justify-center mx-auto mb-4">
                  <span className="font-bold text-[#c9a84c] text-sm">{s.step}</span>
                </div>
                <h3 className="font-bold text-base text-[#0d0f14] mb-2">{s.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ───────────────────────────────────── */}
      <section id="testimonials" className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="font-bold text-3xl md:text-4xl text-[#0d0f14] mb-4">
            Loved by creators
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <p className="text-sm text-gray-600 leading-relaxed mb-6">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-[#0d0f14]"
                  style={{ background: 'linear-gradient(135deg, #c9a84c, #2cc4a0)' }}>
                  {t.avatar}
                </div>
                <div>
                  <p className="font-semibold text-sm text-[#0d0f14]">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────── */}
      <section className="bg-[#0d0f14] py-20">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="font-bold text-3xl md:text-4xl text-white mb-4">
            Ready to take control of your<br />
            <span style={{ color: '#c9a84c' }}>creator business?</span>
          </h2>
          <p className="text-white/40 text-base mb-8">
            Join hundreds of creators already using CCMS to grow smarter.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={() => navigate('/signup')}
              className="px-8 py-3.5 bg-[#c9a84c] text-[#0d0f14] text-sm font-semibold rounded-xl hover:bg-[#f0c96b] transition-all">
              Get Started Free →
            </button>
            <button onClick={() => navigate('/login')}
              className="px-8 py-3.5 border border-white/10 text-white text-sm font-semibold rounded-xl hover:bg-white/5 transition-all">
              Sign In
            </button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────── */}
      <footer className="bg-[#0d0f14] border-t border-white/5 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-[#c9a84c] flex items-center justify-center text-[#0d0f14] font-bold text-xs">✦</div>
            <span className="text-white/50 text-sm">CCMS — Content Creator Management System</span>
          </div>
          <p className="text-white/20 text-xs">© 2025 CCMS. Built for creators.</p>
        </div>
      </footer>
    </div>
  )
}