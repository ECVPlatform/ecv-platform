export type MembershipTier = 'free' | 'member' | 'signature'
export type ChapterStatus  = 'act' | 'rev'
export type Visibility     = 'private' | 'shared' | 'gifted'

export interface Chapter {
  id:        string
  num:       string
  cat:       'nature' | 'culinary' | 'creative' | 'connect' | 'family'
  icon:      string
  ltr:       string
  title:     string
  line:      string
  host:      string
  loc:       string
  season:    string
  badge:     string
  status:    ChapterStatus
  stTxt:     string
  detail?:   boolean
}

export interface PersonalizationEntry {
  greet:  string
  why:    string
  pb: {
    eye:  string
    t:    string
    act:  string
  }
  fc:      string
  homeIds: string[]
}

export interface RequestPayload {
  chapter_id:  string
  months:      string[]
  guests:      string
  hotel:       string
  dates:       string
  intention:   string
  notes:       string
  user_email?: string
  user_name?:  string
}

export interface MemoirPayload {
  chapter_id:  string
  title:       string
  before_text: string
  after_text:  string
  with_whom:   string
  visibility:  Visibility
  photo_url?:  string
}

export interface GiftPayload {
  chapter_id:     string
  recipient_name: string
  recipient_email: string
  message:        string
}
