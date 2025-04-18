export interface LoginForm {
    email:string,
    password:string
}

export interface APIError{
    response?:{
        data?:{
            message?:string
        }
    }
}

export interface RegisterForm{
    name:string,
    email:string,
    password:string
}
