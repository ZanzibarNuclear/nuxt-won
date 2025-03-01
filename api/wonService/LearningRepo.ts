import type {
  CourseType,
  CreateCourseType,
  CourseBodyType,
  LessonPlanType,
  LessonPathType,
  CreateLessonPathType,
  LessonPathBodyType,
  LessonStepType,
  CreateLessonStepType,
  CreateLessonPlanType,
  LessonPlanBodyType,
  CreateLessonContentType,
  LessonContentBodyType,
  LessonContentType
} from "./schema"

const won = useWonService()
const coursePath = 'courses'
const lessonPlanPath = 'lesson-plans'
const lessonPathPath = 'lesson-paths'
const lessonStepPath = 'lesson-steps'
const contentPath = 'lesson-contents'

// repositories/user.ts
export const LearningRepository = {

  async getCourses(): Promise<CourseType[]> {
    return await won.get(coursePath)
  },

  async getActiveCourses(): Promise<CourseType[]> {
    return await won.get(`${coursePath}/?archived=false`)
  },

  async getPublishedCourses(): Promise<CourseType[]> {
    return await won.get(`${coursePath}/?published=true`)
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

  async getLessonPlansForCourse(key: string): Promise<LessonPlanType[]> {
    return await won.get(`${coursePath}/${key}/lesson-plans`)
  },

  async getPathsForCourse(key: string): Promise<LessonPathType[]> {
    return await won.get(`${coursePath}/${key}/lesson-paths`)
  },

  async getPath(key: string): Promise<LessonPathType> {
    return await won.get(`${lessonPathPath}/${key}`)
  },

  async createPath(payload: CreateLessonPathType): Promise<LessonPathType> {
    return await won.post(lessonPathPath, payload)
  },

  async updatePath(key: string, payload: LessonPathBodyType): Promise<LessonPathType> {
    return await won.put(`${lessonPathPath}/${key}`, payload)
  },

  async deletePath(key: string) {
    return await won.delete(`${lessonPathPath}/${key}`)
  },

  async getPathSteps(key: string): Promise<LessonStepType[]> {
    return await won.get(`${lessonStepPath}/${key}`)
  },

  async getStep(key: string): Promise<LessonStepType> {
    return await won.get(`${lessonStepPath}/${key}`)
  },

  async createStep(payload: CreateLessonStepType): Promise<LessonStepType> {
    return await won.post(lessonStepPath, payload)
  },

  async updateStep(key: string, payload: LessonPathBodyType): Promise<LessonStepType> {
    return await won.put(`${lessonStepPath}/${key}`, payload)
  },

  async deleteStep(key: string) {
    return await won.delete(`${lessonStepPath}/${key}`)
  },

  async getLessonPlan(key: string): Promise<LessonPlanType> {
    return await won.get(`${lessonPlanPath}/${key}`)
  },

  async createLessonPlan(payload: CreateLessonPlanType): Promise<LessonPlanType> {
    return await won.post(lessonPlanPath, payload)
  },

  async updateLessonPlan(key: string, payload: LessonPlanBodyType): Promise<LessonPlanType> {
    return await won.put(`${lessonPlanPath}/${key}`, payload)
  },

  async publishLessonPlan(key: string): Promise<LessonPlanType> {
    return await won.put(`${lessonPlanPath}/${key}/publish`)
  },

  async unpublishLessonPlan(key: string): Promise<LessonPlanType> {
    return await won.put(`${lessonPlanPath}/${key}/unpublish`)
  },

  async archiveLessonPlan(key: string): Promise<LessonPlanType> {
    return await won.put(`${lessonPlanPath}/${key}/archive`)
  },

  async unarchiveLessonPlan(key: string): Promise<LessonPlanType> {
    return await won.put(`${lessonPlanPath}/${key}/unarchive`)
  },

  async deleteLessonPlan(key: string) {
    return await won.delete(`${lessonPlanPath}/${key}`)
  },

  async getContents(key: string): Promise<LessonContentType[]> {
    return await won.get(`${lessonPlanPath}/${key}/contents`)
  },

  async getContentPart(key: string): Promise<LessonContentType> {
    return await won.get(`${contentPath}/${key}`)
  },

  async createContentPart(payload: CreateLessonContentType): Promise<LessonContentType> {
    return await won.post(contentPath, payload)
  },

  async updateContentPart(key: string, payload: LessonContentBodyType): Promise<LessonContentType> {
    return await won.put(`${contentPath}/${key}`, payload)
  },

  async deleteContentPart(key: string) {
    return await won.delete(`${contentPath}/${key}`)
  },

}
