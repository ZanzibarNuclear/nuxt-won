export const useLearningService = () => {
  return {
    getCourses(published: boolean = true, archived: boolean = false) { },
    getLessons(courseKey: string) { }
  }
}
