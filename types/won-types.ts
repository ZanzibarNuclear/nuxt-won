export type Course = {
  id: number
  publicKey: string
  title: string
  description: string | null
  teaser: string | null
  coverArt: string | null
  syllabus: string | null
  publishedAt: string | null
  paths: LessonPath[] | null
}
export type LessonPlan = {
  id: number
  publicKey: string
  courseKey: number
  title: string
  description: string | null
  coverArt: string | null
  objective: string | null
  publishedAt: string | null
}
export type LessonPath = {
  id: number
  publicKey: string
  name: string
  description: string
  courseKey: string
  trailhead: string
  steps: LessonStep[] | null
}
export type LessonStep = {
  id: number
  lessonPath: string
  from: string
  to: string
  teaser: string
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
  caption: string | null
  credit: {
    name: string | null
    url: string | null
  }
  bgColor: string | null
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
  width: string
}
export enum LessonContentEnum {
  html = 'html',
  image = 'image',
  formula = 'formula',
  video = 'video',
  figure = 'figure',
  text = 'text',
}
export type ContentDetails =
  | TextContent
  | HtmlContent
  | ImageContent
  | FormulaContent
  | VideoContent
  | FigureContent
export type ContentPart = {
  id: number
  publicKey: string
  lessonId: number
  type: LessonContentEnum
  details: ContentDetails
  sequence: number
}
export type LearningBookmark = {
  id: string
  lessonKey: string
  pathKey: string
  updatedAt: string
}
export type UserProfile = {
  id: string
  screen_name: string
  full_name: string
  avatar_url: string
  website: string
  join_reason: string
  nuclear_likes: string
  xUsername: string
  linkedin_profile_name: string
  joined_at: string
  updated_at: string
}
