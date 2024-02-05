export type CreateUserParams = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: 'ADMIN' | 'STUDENT';
};

export type UpdateUserParams = {
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: 'ADMIN' | 'STUDENT';
};

export type CreateStudentInfoParams = {
  passedAL: boolean;
  programIds: number[];
};

export type UpdateStudentInfoParams = {
  passedAL?: boolean;
  programIds?: number[];
};

export type CreateProgramParams = {
  programCode: string;
  programName: string;
};

export type UpdateProrgamParams = {
  programCode?: string;
  programName?: string;
};

export type CreateCourseParams = {
  courseCode: string;
  courseName: string;
};

export type UpdateCourseParams = {
  courseCode?: string;
  courseName?: string;
};

export type CreateLearningMaterialParams = {
  learningMaterialTitle: string;
  materialType: string;
  resourcePath?: string;
};

export type UpdateLearningMaterialParams = {
  learningMaterialTitle?: string;
  materialType?: string;
  resourcePath?: string;
};

export type CreateAssignmentParams = {
  assignmentTitle: string;
  resourcePath?: string;
};

export type UpdateAssignmentParams = {
  assignmentTitle?: string;
  resourcePath?: string;
};

export type ResetPasswordParams = {
  email: string;
  otp: string;
  newPassword: string;
};
