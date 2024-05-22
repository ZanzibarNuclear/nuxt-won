import type { Json } from './supabase'

export type Course = {
  id: number
  publicKey: string
  title: string
  description: string | null
  coverArt: string | null
  syllabus: string | null
  publishedAt: string | null
}

export type LessonPlan = {
  id: number
  publicKey: string
  courseId: number
  title: string
  description: string | null
  coverArt: string | null
  objective: string | null
  publishedAt: string | null
}

export type LessonPath = {
  id: number
  name: string
  courseId: number
  firstLessonId: number
}

export type LessonStep = {
  fromId: number
  toId: number
  teaser: string | null
}

enum LessonContentEnum {
  html = 'html',
  md = 'md',
  diagram = 'diagram',
  image = 'image',
  video = 'video',
}

export type LessonPart = {
  id: number
  lessonId: number
  contentType: LessonContentEnum
  content: Json
}
