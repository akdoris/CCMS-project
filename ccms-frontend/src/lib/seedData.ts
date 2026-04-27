import { ContentIdea, ScheduledPost, BrandCollab } from '../types'

export const SEED_IDEAS: ContentIdea[] = [
  { id: '1', title: 'Morning Routine Vlog (5am Edition)', description: 'Document my full 5am routine: workout, journaling, meal prep.', category: 'Lifestyle', platform: 'YouTube', status: 'Published', createdAt: '2025-04-01' },
  { id: '2', title: 'Best Budget Camera Gear 2025', description: 'Review the top 5 camera kits under $500 for beginner creators.', category: 'Tech Review', platform: 'YouTube', status: 'InProgress', createdAt: '2025-04-05' },
  { id: '3', title: 'My NYC Apartment Tour', description: 'Full tour of my 450sqft apartment and how I organize it for content creation.', category: 'Lifestyle', platform: 'Instagram', status: 'Draft', createdAt: '2025-04-08' },
  { id: '4', title: 'Editing Speed Tips for TikTok', description: '5 cuts and transitions that make your TikTok edits look professional.', category: 'Tutorial', platform: 'TikTok', status: 'Published', createdAt: '2025-03-28' },
  { id: '5', title: 'Brand Deal Negotiation Stories', description: 'Real stories of brand negotiations gone wrong — and what I learned.', category: 'Creator Business', platform: 'YouTube', status: 'Draft', createdAt: '2025-04-10' },
  { id: '6', title: 'Week in My Life: Shoot Week', description: 'Behind the scenes of a full content creation week, filming 8 pieces.', category: 'BTS', platform: 'Instagram', status: 'InProgress', createdAt: '2025-04-12' },
]

export const SEED_POSTS: ScheduledPost[] = [
  { id: '1', title: 'Morning Routine Vlog', platform: 'YouTube',   date: '2025-04-26', time: '14:00', status: 'Upcoming' },
  { id: '2', title: 'Editing Speed Tips',   platform: 'TikTok',    date: '2025-04-27', time: '18:00', status: 'Upcoming' },
  { id: '3', title: 'NYC Apartment Tour',   platform: 'Instagram',  date: '2025-04-28', time: '12:00', status: 'Upcoming' },
  { id: '4', title: 'Shoot Week BTS',       platform: 'Instagram',  date: '2025-04-30', time: '09:00', status: 'Upcoming' },
]

export const SEED_COLLABS: BrandCollab[] = [
  { id: '1', brand: 'LumiLight Tech', contact: 'sara@lumilight.com', deliverables: '2x YouTube integrations (60s mid-roll)', deadline: '2025-04-30', payment: 1800, status: 'Active', notes: 'Approved script draft. Need final video by Apr 25.', progress: 65 },
  { id: '2', brand: 'Bloom Wellness Co', contact: 'partnerships@bloomwellness.com', deliverables: '3x Instagram Reels + 1 Story', deadline: '2025-05-10', payment: 950, status: 'Pending', notes: 'Awaiting contract signature. Brief received.', progress: 20 },
  { id: '3', brand: 'NovaEdit Software', contact: 'collab@novaedit.io', deliverables: '1x YouTube tutorial (sponsored segment)', deadline: '2025-04-15', payment: 2400, status: 'Completed', notes: 'All deliverables submitted and approved.', progress: 100 },
  { id: '4', brand: 'UrbanBrew Coffee', contact: 'marketing@urbanbrew.com', deliverables: '2x TikTok videos + unboxing reel', deadline: '2025-05-20', payment: 600, status: 'Active', notes: 'Products shipped, expected Apr 16.', progress: 15 },
]