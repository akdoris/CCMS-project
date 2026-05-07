import { useState } from 'react'
import { toast } from 'react-hot-toast'
import Button from '../components/ui/Button'

const FAQS = [
  { q: 'How do I add a new content idea?',           a: 'Go to Content Ideas in the sidebar, click "+ New Idea", fill in the title, description, platform and status, then save. Your idea will appear in the grid immediately.' },
  { q: 'How do I schedule a post?',                  a: 'Navigate to Schedule, click "+ Schedule Post", select your platform, set a date and time, and confirm. Your post will appear on the calendar view.' },
  { q: 'How do I track a brand collaboration?',      a: 'Go to Brand Collabs, click "+ Add Collab", and fill in the brand details including deliverables, deadline and payment. You can update the status as the deal progresses.' },
  { q: 'Can I link my social media accounts?',       a: 'Yes! Go to My Profile → Social Links tab. Enter your profile URLs for YouTube, Instagram, TikTok, Twitter, Facebook and LinkedIn.' },
  { q: 'How do I change my notification settings?',  a: 'Go to Settings → Notifications tab. You can toggle email and in-app notifications individually for deadlines, collabs, schedules and more.' },
  { q: 'Is my data secure?',                         a: 'Yes. All data is encrypted in transit using HTTPS. Passwords are hashed using bcrypt. We never share your personal data with third parties.' },
  { q: 'How do I delete my account?',                a: 'Go to Settings → Account tab. Scroll to the Danger Zone section and click "Delete Account". This action is permanent and cannot be undone.' },
]

const GUIDES = [
  { icon: '🚀', title: 'Getting Started',         desc: 'Set up your profile and add your first content idea in 5 minutes.' },
  { icon: '📅', title: 'Mastering the Calendar',  desc: 'Learn how to plan content weeks ahead using the schedule view.' },
  { icon: '🤝', title: 'Managing Brand Deals',    desc: 'Step-by-step guide to tracking collaborations from pitch to payment.' },
  { icon: '📊', title: 'Reading Your Analytics',  desc: 'Understand your performance metrics and what they mean for growth.' },
]

export default function Help() {
  const [openFaq,  setOpenFaq]  = useState<number | null>(null)
  const [message,  setMessage]  = useState('')
  const [subject,  setSubject]  = useState('')
  const [sending,  setSending]  = useState(false)

  function sendMessage() {
    if (!subject || !message) { toast.error('Please fill in all fields'); return }
    setSending(true)
    setTimeout(() => { setSending(false); toast.success('Message sent! We will reply within 24 hours.'); setMessage(''); setSubject('') }, 1000)
  }

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h2 className="font-bold text-2xl text-[#0d0f14]">Help & Support</h2>
        <p className="text-sm text-gray-400 mt-1">Find answers, guides and contact support</p>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { icon: '📖', label: 'Documentation' },
          { icon: '🎥', label: 'Video Tutorials' },
          { icon: '💬', label: 'Live Chat' },
          { icon: '📧', label: 'Email Support' },
        ].map((item, i) => (
          <button key={i} onClick={() => toast(`${item.label} — coming soon!`)}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center hover:-translate-y-0.5 hover:shadow-md transition-all">
            <div className="text-2xl mb-2">{item.icon}</div>
            <p className="text-xs font-semibold text-gray-600">{item.label}</p>
          </button>
        ))}
      </div>

      {/* Guides */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 pt-5 pb-4 border-b border-gray-100">
          <h3 className="font-bold text-sm text-[#0d0f14]">Quick Start Guides</h3>
        </div>
        <div className="divide-y divide-gray-50">
          {GUIDES.map((g, i) => (
            <button key={i} onClick={() => toast(`"${g.title}" guide — coming soon!`)}
              className="w-full flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-all text-left">
              <span className="text-2xl">{g.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-[#0d0f14]">{g.title}</p>
                <p className="text-xs text-gray-400 mt-0.5">{g.desc}</p>
              </div>
              <span className="text-gray-300 text-sm">→</span>
            </button>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 pt-5 pb-4 border-b border-gray-100">
          <h3 className="font-bold text-sm text-[#0d0f14]">Frequently Asked Questions</h3>
        </div>
        <div className="divide-y divide-gray-50">
          {FAQS.map((faq, i) => (
            <div key={i}>
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-all text-left gap-4"
              >
                <p className="font-medium text-sm text-[#0d0f14]">{faq.q}</p>
                <span className={`text-gray-400 transition-transform flex-shrink-0 ${openFaq === i ? 'rotate-180' : ''}`}>▾</span>
              </button>
              {openFaq === i && (
                <div className="px-6 pb-4">
                  <p className="text-sm text-gray-500 leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Contact Form */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
        <h3 className="font-bold text-sm text-[#0d0f14]">Contact Support</h3>
        <p className="text-xs text-gray-400">Can't find your answer? Send us a message and we'll reply within 24 hours.</p>
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Subject</label>
          <input className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#c9a84c] bg-white"
            placeholder="What do you need help with?"
            value={subject} onChange={(e) => setSubject(e.target.value)} />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Message</label>
          <textarea className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#c9a84c] resize-none"
            rows={4} placeholder="Describe your issue in detail…"
            value={message} onChange={(e) => setMessage(e.target.value)} />
        </div>
        <Button variant="gold" onClick={sendMessage} loading={sending}>Send Message 📨</Button>
      </div>
    </div>
  )
}