import { string } from 'yup'
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

export type TextContent = {
  text: string
}
export type HtmlContent = {
  html: string
}
export type ImageContent = {
  src: string
  alt: string
  width: number | null
  height: number | null
}
export type FormulaContent = {
  latex: string
  caption: string
}
export type VideoContent = {
  url: string
  caption: string
}
export type FigureContent = {
  src: string
  caption: string
  border: 'solid' | 'dashed' | 'light' | 'shadow'
}
export type ContentDetails =
  | TextContent
  | HtmlContent
  | ImageContent
  | FormulaContent
  | VideoContent
  | FigureContent
export type ContentPart = {
  type: string
  details: ContentDetails
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
  image = 'image',
  formula = 'formula',
  video = 'video',
  diagram = 'figure',
  text = 'text',
}

export type LessonPart = {
  id: number
  lessonId: number
  contentType: LessonContentEnum
  content: Json
}
