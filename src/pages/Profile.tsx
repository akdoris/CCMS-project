import { useState } from 'react'
import { toast } from 'react-hot-toast'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'

const SOCIAL_PLATFORMS = [
  { key: 'youtube',   label: 'YouTube',   icon: '📺', placeholder: 'https://youtube.com/@yourchannel',   color: '#FF0000' },
  { key: 'instagram', label: 'Instagram', icon: '📸', placeholder: 'https://instagram.com/yourhandle',   color: '#C13584' },
  { key: 'tiktok',    label: 'TikTok',    icon: '🎵', placeholder: 'https://tiktok.com/@yourhandle',     color: '#333'    },
  { key: 'twitter',   label: 'Twitter/X', icon: '🐦', placeholder: 'https://twitter.com/yourhandle',     color: '#1DA1F2' },
  { key: 'facebook',  label: 'Facebook',  icon: '📘', placeholder: 'https://facebook.com/yourpage',      color: '#1877F2' },
  { key: 'linkedin',  label: 'LinkedIn',  icon: '💼', placeholder: 'https://linkedin.com/in/yourprofile', color: '#0A66C2' },
]

const INSIGHTS = [
  { platform: 'YouTube',   icon: '📺', color: '#FF0000', followers: '152K', growth: '+2.4K',  posts: 48,  engagement: '6.2%' },
  { platform: 'Instagram', icon: '📸', color: '#C13584', followers: '89K',  growth: '+1.1K',  posts: 312, engagement: '4.8%' },
  { platform: 'TikTok',    icon: '🎵', color: '#333',    followers: '234K', growth: '+12.3K', posts: 198, engagement: '9.1%' },
  { platform: 'Twitter/X', icon: '🐦', color: '#1DA1F2', followers: '18K',  growth: '+340',   posts: 892, engagement: '2.3%' },
]

export default function Profile() {
  const [activeTab, setActiveTab] = useState<'profile' | 'social' | 'insights'>('profile')
  const [profile, setProfile] = useState({
    name: 'Amina Khalid', email: 'amina@example.com', bio: 'Digital content creator specializing in lifestyle, productivity and tech. Partnering with brands that align with my values.', niche: 'Lifestyle & Tech', location: 'New York, USA', website: 'https://aminakhalid.com',
  })
  const [socials, setSocials] = useState<Record<string, string>>({
    youtube: 'https://youtube.com/@aminakhalid', instagram: 'https://instagram.com/aminakhalid',
    tiktok: 'https://tiktok.com/@aminakhalid', twitter: '', facebook: '', linkedin: '',
  })
  const [saving, setSaving] = useState(false)

  function handleSave() {
    setSaving(true)
    setTimeout(() => { setSaving(false); toast.success('Profile updated!') }, 800)
  }

  const tabs = [
    { key: 'profile',  label: 'Profile Info', icon: '👤' },
    { key: 'social',   label: 'Social Links', icon: '🔗' },
    { key: 'insights', label: 'Insights',     icon: '📊' },
  ] as const

  return (
    <div className="space-y-6 max-w-3xl">

      {/* Header */}
      <div className="flex items-start gap-5">
        <div className="relative flex-shrink-0">
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-bold text-[#0d0f14]"
            style={{ background: 'linear-gradient(135deg, #c9a84c, #2cc4a0)' }}>
            AM
          </div>
          <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-white border border-gray-200 rounded-lg flex items-center justify-center text-xs shadow-sm hover:bg-gray-50">
            ✏️
          </button>
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="font-bold text-xl text-[#0d0f14]">{profile.name}</h2>
          <p className="text-gray-400 text-sm mt-0.5">{profile.email}</p>
          <p className="text-gray-500 text-sm mt-2 leading-relaxed line-clamp-2">{profile.bio}</p>
          <div className="flex flex-wrap gap-2 mt-3">
            <span className="text-xs bg-[#c9a84c]/10 text-[#a07820] px-3 py-1 rounded-full font-medium">{profile.niche}</span>
            <span className="text-xs bg-gray-100 text-gray-500 px-3 py-1 rounded-full">📍 {profile.location}</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl w-fit">
        {tabs.map((t) => (
          <button key={t.key} onClick={() => setActiveTab(t.key)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === t.key ? 'bg-white shadow-sm text-[#0d0f14]' : 'text-gray-500 hover:text-gray-700'}`}>
            <span>{t.icon}</span><span className="hidden sm:block">{t.label}</span>
          </button>
        ))}
      </div>

      {/* Profile Info Tab */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
          <h3 className="font-bold text-sm text-[#0d0f14]">Personal Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Full Name"  value={profile.name}     onChange={(e) => setProfile({ ...profile, name: e.target.value })}     placeholder="Your full name" />
            <Input label="Email"      value={profile.email}    onChange={(e) => setProfile({ ...profile, email: e.target.value })}    placeholder="your@email.com" type="email" />
            <Input label="Niche"      value={profile.niche}    onChange={(e) => setProfile({ ...profile, niche: e.target.value })}    placeholder="e.g. Lifestyle & Tech" />
            <Input label="Location"   value={profile.location} onChange={(e) => setProfile({ ...profile, location: e.target.value })} placeholder="e.g. New York, USA" />
            <div className="sm:col-span-2">
              <Input label="Website" value={profile.website} onChange={(e) => setProfile({ ...profile, website: e.target.value })} placeholder="https://yourwebsite.com" />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Bio</label>
            <textarea
              className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#c9a84c] resize-none"
              rows={4} value={profile.bio}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              placeholder="Tell brands and followers about yourself…"
            />
          </div>
          <div className="flex justify-end pt-2">
            <Button variant="gold" onClick={handleSave} loading={saving}>Save Changes</Button>
          </div>
        </div>
      )}

      {/* Social Links Tab */}
      {activeTab === 'social' && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
          <h3 className="font-bold text-sm text-[#0d0f14]">Linked Social Accounts</h3>
          <p className="text-xs text-gray-400">Connect your social accounts to track insights and share your profile with brands.</p>
          <div className="space-y-3">
            {SOCIAL_PLATFORMS.map((p) => (
              <div key={p.key} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0 bg-gray-50">
                  {p.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <label className="text-xs font-semibold text-gray-500 block mb-1">{p.label}</label>
                  <input
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#c9a84c] bg-white"
                    placeholder={p.placeholder}
                    value={socials[p.key] ?? ''}
                    onChange={(e) => setSocials({ ...socials, [p.key]: e.target.value })}
                  />
                </div>
                <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${socials[p.key] ? 'bg-emerald-400' : 'bg-gray-200'}`} />
              </div>
            ))}
          </div>
          <div className="flex justify-end pt-2">
            <Button variant="gold" onClick={() => toast.success('Social links saved!')} loading={saving}>Save Links</Button>
          </div>
        </div>
      )}

      {/* Insights Tab */}
      {activeTab === 'insights' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { label: 'Total Followers', val: '493K', icon: '👥', color: '#c9a84c' },
              { label: 'Avg Engagement',  val: '5.6%', icon: '❤️', color: '#2cc4a0' },
              { label: 'Posts This Month', val: '18',  icon: '📢', color: '#7c6fcd' },
              { label: 'Brand Deals',      val: '4',   icon: '🤝', color: '#e8614d' },
            ].map((k, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center">
                <div className="text-xl mb-2">{k.icon}</div>
                <div className="font-bold text-xl mb-1" style={{ color: k.color }}>{k.val}</div>
                <div className="text-xs text-gray-400">{k.label}</div>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-6 pt-5 pb-4 border-b border-gray-100">
              <h3 className="font-bold text-sm text-[#0d0f14]">Platform Breakdown</h3>
            </div>
            <div className="divide-y divide-gray-50">
              {INSIGHTS.map((ins, i) => (
                <div key={i} className="px-6 py-4 flex items-center gap-4">
                  <span className="text-2xl">{ins.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-[#0d0f14]">{ins.platform}</p>
                    <p className="text-xs text-gray-400">{ins.posts} posts</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm text-[#0d0f14]">{ins.followers}</p>
                    <p className="text-xs text-emerald-500 font-semibold">{ins.growth} this month</p>
                  </div>
                  <div className="text-right hidden sm:block">
                    <p className="text-xs text-gray-400">Engagement</p>
                    <p className="font-bold text-sm" style={{ color: ins.color }}>{ins.engagement}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}