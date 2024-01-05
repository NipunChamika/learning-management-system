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
  programName: string;
};
