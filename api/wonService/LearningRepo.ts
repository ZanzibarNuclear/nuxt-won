import type {
  CourseType,
  CreateCourseType,
  CourseBodyType,
  LessonPlanType,
  LessonPathType
} from "./schema"

const won = useWonService()
const coursePath = '/courses'
const lessonPlanPath = '/lesson-plans'

// repositories/user.ts
export const LearningRepository = {

  async getCourses(): Promise<CourseType[]> {
    return await won.get(coursePath)
  },

  async getCourse(key: string): Promise<CourseType> {
    return await won.get(`${coursePath}/${key}`)
  },

  async createCourse(payload: CreateCourseType): Promise<CourseType> {
    return await won.post(coursePath, payload)
  },

  async updateCourse(key: string, payload: CourseBodyType): Promise<CourseType> {
    return await won.put(`${coursePath}/${key}`, payload)
  },

  async publishCourse(key: string): Promise<CourseType> {
    return await won.put(`${coursePath}/${key}/publish`)
  },

  async unpublishCourse(key: string): Promise<CourseType> {
    return await won.put(`${coursePath}/${key}/unpublish`)
  },

  async archiveCourse(key: string): Promise<CourseType> {
    return await won.put(`${coursePath}/${key}/archive`)
  },

  async unarchiveCourse(key: string): Promise<CourseType> {
    return await won.put(`${coursePath}/${key}/unarchive`)
  },

  async deleteCourse(key: string) {
    return await won.delete(`${coursePath}/${key}`)
  },

  async getLessonPlansForCourse(key: string): Promise<LessonPlanType> {
    return await won.get(`${coursePath}/${key}/lesson-plans`)
  },

  async getPathsForCourse(key: string): Promise<LessonPlanType> {
    return await won.get(`${coursePath}/${key}/lesson-paths`)
  },
}
