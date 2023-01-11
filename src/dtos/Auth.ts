type IDefaultUserDto = {
    email:string,
    password:string
}

export type ILoginDto = IDefaultUserDto & {
    remember:boolean
}

export type IRegisterDto = IDefaultUserDto & {
    name:string,
    surName:string,
    email:string,
}