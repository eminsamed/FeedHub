export enum UserPrivilege {
  Viewer,
  Member,
  Administrator
}

export interface AccessGroupUser {
  email: string;
  userPrivilege: UserPrivilege;
}