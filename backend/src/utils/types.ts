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
  // programEnrolled: string;
  passedAL: boolean;
  programIds: number[];
};

export type UpdateStudentInfoParams = {
  // programEnrolled?: string;
  passedAL?: boolean;
};

export type CreateProgramParams = {
  programName: string;
};

export type UpdateProrgamParams = {
  programName?: string;
};

export type CreateCourseParams = {
  courseName: string;
};

export type UpdateCourseParams = {
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
