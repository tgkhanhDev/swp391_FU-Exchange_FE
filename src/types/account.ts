export interface Account {
  staffInforResponseList: StaffInforResponseList;
  meta: Meta;
}

export interface StaffInforResponseList {
  staffId: number;
  roleId: RoleId
  firstName: string
  lastName: string
  gender: string
  identityCard: string
  address: string
  phoneNumber: string
  dob: string
  active: boolean
}

export interface RoleId {
  roleId: number
  roleName: string
}

export interface Meta {
  total: number
  current: number
}

export type filterGetStaffAccount = {
  current: number,
  identityCard ?: string,
}

export type setStatus = {
  staffId: number,
  active: number,
}

export type setStatusAcc = {
  registeredStudentId: number,
  isActive: number,
}

export type setStatusSeller = {
  sellerId: number,
  isActive: number,
}

export interface UpdateProfile {
  staffId: number;
  firstName: string
  lastName: string
  gender: string
  identityCard: string
  address: string
  phoneNumber: string
  dob: Date
}

export interface UpdatePassword {
  staffId: number;
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

export interface Seller {
  sellerId: number
  student: Student
  bankingName: string
  bankingNumber: string
  active: number
};

export interface Student {
  studentId: string
  firstName: string
  lastName: string
  identityCard: string
  address: string
  phoneNumber: string
  gender: string
  dob: string
};

export type filterGetCustomerAccount = {
  name?: number | "";
}

export type deleteSellerPostProductFilter = {
  postProductId: number;
  postStatusId: number;
};