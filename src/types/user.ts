export type Seller = {
  sellerId: number;
  RegisteredStudent: RegisteredStudent;
  bankingNumber: string;
  bankingName: string;
};

export type RegisteredStudent = {
  registeredStudentId: number;
  Student: Student;
  Role: Role;
  password: string;
};

export type Role = {
  roleId: number;
  roleName: string;
};

export type Student = {
  studentId: number;
  firstName: string;
  lastName: string;
  identityCard: string;
  address: string;
  phoneNumber: string;
  gender: string;
  dob: Date;
};

export type LoginType = {
  username: string;
  password: string;
};
export type LoginResponse = {
  username: "string";
  role: "string";
  accessToken: "string";
};

export type IsAllowRegisterType = {
  studentId: string;
  identity: string;
};

export type RegisterStudentReq = {
  studentId: "string";
  identifyNumber: "string";
  password: "string";
  confirmPassword: "string";
};

export type RegisterSellerReq = {
  registeredStudentId: number;
  password: "string";
  bankingNumber: "string";
  bankingName: "string";
};

export type UpdatePassword = {
  idWantUpdate: number;
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}
