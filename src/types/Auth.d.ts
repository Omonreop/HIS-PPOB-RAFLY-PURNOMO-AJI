import { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";

interface IRegister {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
}
interface ILogin {
  email: string;
  password: string;
}

interface UserExtended extends User {
  accessToken?: string;
}
interface SessionExtended extends Session {
  accessToken?: string;
}

interface JWTExtended extends JWT {
  user?: UserExtended;
}

interface IProfile {
  email?: string;
  first_name?: string;
  last_name?: string;
  profile_image?: string | FileList;
}

interface IUpdateProfile {
  first_name?: string;
  last_name?: string;
}
export type {
  IRegister,
  JWTExtended,
  SessionExtended,
  UserExtended,
  ILogin,
  IProfile,
  IUpdateProfile,
};
