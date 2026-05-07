import { useState } from 'react'
import { toast } from 'react-hot-toast'
import Button from '../components/ui/Button'
import Input  from '../components/ui/Input'

const TABS = [
  { key: 'account',  label: 'Account',       icon: '👤' },
  { key: 'notifs',   label: 'Notifications', icon: '🔔' },
  { key: 'privacy',  label: 'Privacy',       icon: '🔒' },
  { key: 'appearance', label: 'Appearance',  icon: '🎨' },
] as const

type Tab = typeof TABS[number]['key']

export default function Settings() {
  const [tab, setTab]     = useState<Tab>('account')
  const [saving, setSaving] = useState(false)

  const [account, setAccount] = useState({
    name: 'Amina Khalid', email: 'amina@example.com',
    currentPassword: '', newPassword: '', confirmPassword: '',
  })

  const [notifPrefs, setNotifPrefs] = useState({
    emailDeadlines:    true,
    emailCollabs:      true,
    emailSchedule:     false,
    inAppDeadlines:    true,
    inAppCollabs:      true,
    inAppIdeas:        true,
    weeklyDigest:      true,
  })

  const [privacy, setPrivacy] = useState({
    profilePublic:     true,
    showSocialLinks:   true,
    showInsights:      false,
    dataAnalytics:     true,
  })

  const [appearance, setAppearance] = useState({
    theme: 'light',
    compactMode: false,
    language: 'English',
  })

  function save() {
    setSaving(true)
    setTimeout(() => { setSaving(false); toast.success('Settings saved!') }, 700)
  }

  function Toggle({ value, onChange }: { value: boolean; onChange: () => void }) {
    return (
      <button onClick={onChange}
        className={`relative w-11 h-6 rounded-full transition-all duration-200 flex-shrink-0 ${value ? 'bg-[#c9a84c]' : 'bg-gray-200'}`}>
        <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${value ? 'translate-x-5' : 'translate-x-0'}`} />
      </button>
    )
  }

  function SettingRow({ label, desc, value, onChange }: { label: string; desc?: string; value: boolean; onChange: () => void }) {
    return (
      <div className="flex items-center justify-between gap-4 py-4 border-b border-gray-50 last:border-0">
        <div className="min-w-0">
          <p className="text-sm font-medium text-[#0d0f14]">{label}</p>
          {desc && <p className="text-xs text-gray-400 mt-0.5">{desc}</p>}
        </div>
        <Toggle value={value} onChange={onChange} />
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h2 className="font-bold text-2xl text-[#0d0f14]">Settings</h2>
        <p className="text-sm text-gray-400 mt-1">Manage your account and preferences</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl overflow-x-auto w-fit">
        {TABS.map((t) => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${tab === t.key ? 'bg-white shadow-sm text-[#0d0f14]' : 'text-gray-500'}`}>
            <span>{t.icon}</span><span className="hidden sm:block">{t.label}</span>
          </button>
        ))}
      </div>

      {/* Account */}
      {tab === 'account' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
            <h3 className="font-bold text-sm text-[#0d0f14]">Account Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Full Name" value={account.name}  onChange={(e) => setAccount({ ...account, name: e.target.value })}  placeholder="Your full name" />
              <Input label="Email"     value={account.email} onChange={(e) => setAccount({ ...account, email: e.target.value })} placeholder="your@email.com" type="email" />
            </div>
            <Button variant="gold" onClick={save} loading={saving} size="sm">Save Account</Button>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
            <h3 className="font-bold text-sm text-[#0d0f14]">Change Password</h3>
            <Input label="Current Password" type="password" value={account.currentPassword} onChange={(e) => setAccount({ ...account, currentPassword: e.target.value })} placeholder="••••••••" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="New Password"     type="password" value={account.newPassword}     onChange={(e) => setAccount({ ...account, newPassword: e.target.value })}     placeholder="••••••••" />
              <Input label="Confirm Password" type="password" value={account.confirmPassword} onChange={(e) => setAccount({ ...account, confirmPassword: e.target.value })} placeholder="••••••••" />
            </div>
            <Button variant="primary" onClick={() => toast.success('Password updated!')} size="sm">Update Password</Button>
          </div>

          <div className="bg-white rounded-2xl border border-red-100 shadow-sm p-6">
            <h3 className="font-bold text-sm text-red-600 mb-1">Danger Zone</h3>
            <p className="text-xs text-gray-400 mb-4">Once you delete your account, there is no going back.</p>
            <Button variant="danger" size="sm" onClick={() => toast.error('Account deletion requires confirmation')}>
              🗑 Delete Account
            </Button>
          </div>
        </div>
      )}

      {/* Notifications */}
      {tab === 'notifs' && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-1">
          <h3 className="font-bold text-sm text-[#0d0f14] mb-2">Email Notifications</h3>
          <SettingRow label="Deadline reminders"    desc="Get emailed 3 days before collab deadlines"         value={notifPrefs.emailDeadlines}  onChange={() => setNotifPrefs({ ...notifPrefs, emailDeadlines: !notifPrefs.emailDeadlines })} />
          <SettingRow label="Collab updates"         desc="Emails when collab status changes"                  value={notifPrefs.emailCollabs}    onChange={() => setNotifPrefs({ ...notifPrefs, emailCollabs: !notifPrefs.emailCollabs })} />
          <SettingRow label="Schedule reminders"     desc="Emails before scheduled posts go live"             value={notifPrefs.emailSchedule}   onChange={() => setNotifPrefs({ ...notifPrefs, emailSchedule: !notifPrefs.emailSchedule })} />
          <SettingRow label="Weekly digest"          desc="A weekly summary of your content and performance"  value={notifPrefs.weeklyDigest}    onChange={() => setNotifPrefs({ ...notifPrefs, weeklyDigest: !notifPrefs.weeklyDigest })} />

          <h3 className="font-bold text-sm text-[#0d0f14] pt-4 mb-2">In-App Notifications</h3>
          <SettingRow label="Deadline alerts"   value={notifPrefs.inAppDeadlines} onChange={() => setNotifPrefs({ ...notifPrefs, inAppDeadlines: !notifPrefs.inAppDeadlines })} />
          <SettingRow label="Collab alerts"     value={notifPrefs.inAppCollabs}   onChange={() => setNotifPrefs({ ...notifPrefs, inAppCollabs: !notifPrefs.inAppCollabs })} />
          <SettingRow label="Idea reminders"    value={notifPrefs.inAppIdeas}     onChange={() => setNotifPrefs({ ...notifPrefs, inAppIdeas: !notifPrefs.inAppIdeas })} />
          <div className="pt-4">
            <Button variant="gold" size="sm" onClick={save} loading={saving}>Save Preferences</Button>
          </div>
        </div>
      )}

      {/* Privacy */}
      {tab === 'privacy' && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-1">
          <h3 className="font-bold text-sm text-[#0d0f14] mb-2">Privacy Settings</h3>
          <SettingRow label="Public profile"     desc="Allow brands to discover your creator profile"    value={privacy.profilePublic}   onChange={() => setPrivacy({ ...privacy, profilePublic: !privacy.profilePublic })} />
          <SettingRow label="Show social links"  desc="Display your linked social accounts on profile"  value={privacy.showSocialLinks}  onChange={() => setPrivacy({ ...privacy, showSocialLinks: !privacy.showSocialLinks })} />
          <SettingRow label="Show insights"      desc="Share your follower and engagement stats"         value={privacy.showInsights}     onChange={() => setPrivacy({ ...privacy, showInsights: !privacy.showInsights })} />
          <SettingRow label="Analytics tracking" desc="Help us improve CCMS with anonymous usage data"  value={privacy.dataAnalytics}    onChange={() => setPrivacy({ ...privacy, dataAnalytics: !privacy.dataAnalytics })} />
          <div className="pt-4">
            <Button variant="gold" size="sm" onClick={save} loading={saving}>Save Privacy</Button>
          </div>
        </div>
      )}

      {/* Appearance */}
      {tab === 'appearance' && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
          <h3 className="font-bold text-sm text-[#0d0f14]">Appearance</h3>

          <div>
            <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block mb-3">Theme</label>
            <div className="flex gap-3">
              {[
                { key: 'light', label: '☀️ Light', bg: '#f8f7f4', border: '#e5e7eb' },
                { key: 'dark',  label: '🌙 Dark',  bg: '#0d0f14', border: '#374151' },
              ].map((t) => (
                <button key={t.key} onClick={() => { setAppearance({ ...appearance, theme: t.key }); toast(`${t.label} mode — coming soon!`) }}
                  className={`flex-1 py-3 rounded-xl border-2 text-sm font-semibold transition-all ${appearance.theme === t.key ? 'border-[#c9a84c] text-[#c9a84c]' : 'border-gray-200 text-gray-500'}`}
                  style={{ backgroundColor: t.bg }}>
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between py-3 border-t border-gray-50">
            <div>
              <p className="text-sm font-medium text-[#0d0f14]">Compact Mode</p>
              <p className="text-xs text-gray-400">Reduce spacing for more content on screen</p>
            </div>
            <button onClick={() => setAppearance({ ...appearance, compactMode: !appearance.compactMode })}
              className={`relative w-11 h-6 rounded-full transition-all flex-shrink-0 ${appearance.compactMode ? 'bg-[#c9a84c]' : 'bg-gray-200'}`}>
              <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${appearance.compactMode ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block mb-2">Language</label>
            <select className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#c9a84c] bg-white appearance-none"
              value={appearance.language} onChange={(e) => setAppearance({ ...appearance, language: e.target.value })}>
              {['English', 'French', 'Spanish', 'Arabic', 'Portuguese'].map((l) => (
                <option key={l}>{l}</option>
              ))}
            </select>
          </div>
          <Button variant="gold" size="sm" onClick={save} loading={saving}>Save Appearance</Button>
        </div>
      )}
    </div>
  )
}