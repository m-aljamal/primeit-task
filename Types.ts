export interface IUsers {
  users: IUser[];
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar: string;
  eduType?: string;
}

export interface IUserProps {
  user: IUser;
}

export interface Inputs {
  name: string;
  email: string;
  password: string;
  eduType?: string;
}

export interface IInput {
  register: any;
  placeholder: string;
  error?: string;
}
