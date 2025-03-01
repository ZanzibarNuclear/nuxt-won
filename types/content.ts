export interface CourseNavigation {
  _path: string
  title: string
  _dir: string
  sequence: number
  children?: LessonNavigation[]
}

export interface LessonNavigation {
  _path: string
  title: string
  _file: string
  sequence: number
} 