/**
 * Created by zhaoxinlei on 2017/11/13.
 */
export class OnlineUser {
  Id: string;
  Identify: string;
  IdentifyType: string;
  IP: string;
  LoginTime: string;
  MacAddr: string;
  Message: string;
  Online: boolean;
  OrgList: any[];
  Password: string;
  PlatCustomerId: string;
  PrivId: string;
  ProjId: string;
  ProjList: any[];
  TryTimes: number;
  RemainTimes: number;
  Token: string;
  UserId: string;
  ValidCode: string;
  ValidCodeId: string;
}

export class AppUser {
  Birthday?: string;
  Code: string;
  CreateTime: string;
  Grender: string;
  Id: string;
  IdCardNumber: string;
  LoginLimitKind: string;
  MailAddress: string;
  MobileNumber: string;
  Name: string;
  NickName: string;
  Password: string;
  PersonId: string;
  PlatCustomerId: string;
  RealName: string;
  Remark: string;
  Status: string;
  UserType: string;
}
