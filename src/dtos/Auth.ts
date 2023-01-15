type IDefaultUserDto = {
  email: string;
  password: string;
};

export type ILoginDto = IDefaultUserDto & {
  remember: boolean;
};

export type IRegisterDto = IDefaultUserDto & {
  firstName: string;
  surName: string;
};

export type ITokenDto = {
  token: string;
};
