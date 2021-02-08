import { RoleEnum } from './enums';

export interface IUser {
  id?: number;
  social_id: string;
  firstName: string;
  lastName: string;
  picture: string;
  email: string;
  role: RoleEnum;
  token?: string;
  active: boolean;
}
