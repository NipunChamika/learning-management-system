export type CreateUserParams = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: 'ADMIN' | 'STUDENT';
};

export type CreateStudentInfoParams = {
  programEnrolled: string;
  passedAL: boolean;
};
