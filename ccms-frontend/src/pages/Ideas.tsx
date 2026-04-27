export type Platform = 'YouTube' | 'Instagram' | 'TikTok' | 'Twitter'

export type IdeaStatus = 'Draft' | 'InProgress' | 'Published'

export type CollabStatus = 'Pending' | 'Active' | 'Completed' | 'Cancelled'

export type ScheduleStatus = 'Upcoming' | 'Posted' | 'Postponed'

export type ContentIdea = {
  id: string
  title: string
  description: string
  category: string
  platform: Platform
  status: IdeaStatus
  createdAt: string
}

export type ScheduledPost = {
  id: string
  title: string
  platform: Platform
  date: string
  time: string
  status: ScheduleStatus
  ideaId?: string
}

export type BrandCollab = {
  id: string
  brand: string
  contact: string
  deliverables: string
  deadline: string
  payment: number
  status: CollabStatus
  notes: string
  progress: number
}

export type User = {
  id: string
  name: string
  email: string
  role: 'creator' | 'admin'
}