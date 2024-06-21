export interface Account {
  staffInforResponseList: StaffInforResponseList;
  meta: Meta;
}

export interface StaffInforResponseList {
  roleId: RoleId
  staffName: string
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