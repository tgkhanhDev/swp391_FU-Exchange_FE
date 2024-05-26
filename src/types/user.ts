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
}

export type Student = {
    studentId: number,
    firstName: string,
    lastName: string,
    identityCard: string,
    address: string,
    phoneNumber: string,
    gender: string,
    dob: Date,
}