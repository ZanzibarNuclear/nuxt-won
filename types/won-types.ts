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
