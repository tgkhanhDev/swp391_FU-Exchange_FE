export interface viewSeller {
  sellerTO: SellerTo
  deliveryAddress: string
}

export type SellerTo = {
  sellerId: number;
  RegisteredStudent: RegisteredStudent;
  student: Student;
  bankingNumber: string;
  bankingName: string;
  active: number;
};

export type RegisteredStudent = {
  registeredStudentId: number;
  Student: Student;
  Role: Role;
  active: boolean;
  deliveryAddress: string;
};

export type updateDelivery = {
  registeredStudentId: number,
  deliveryAddress: string,
}

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

export type LoginStaffType = {
  numberPhone: string;
  password: string;
};

export type LoginResponse = {
  username: string;
  role: string;
  accessToken: string;
};

export type IsAllowRegisterType = {
  studentId: string;
  identity: string;
};

export type RegisterStudentReq = {
  studentId: string;
  identifyNumber: string;
  password: string;
  confirmPassword: string;
};

export type RegisterSellerReq = {
  registeredStudentId: number;
  password: string;
  bankingNumber: string;
  bankingName: string;
};

export type UpdatePassword = {
  idWantUpdate: number;
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

export type UpdateBanking = {
  sellerId: number;
  bankingNumber: string;
  bankingName: string;
};

export interface Staff {
  roleId: Role;
  firstName: string;
  lastName: string;
  gender: string;
  identityCard: string;
  address: string;
  phoneNumber: string;
  dob: string;
}

export interface StudentInfo {
  accessToken: string;
  registeredStudentId: number;
  role: string;
  username:string
}