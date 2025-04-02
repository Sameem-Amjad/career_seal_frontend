export interface LoginResponse {
    token: string;
    user: User
}

export interface basicResponse {
    success: boolean;
    message: string
}


interface User {
    id: string;
    username: string;
    email: string;
    isVerified: boolean;
    image: string
}


interface _User {
    _id: string;
    username: string;
    email: string;
    isVerified: boolean;
    image: string;
}


export interface signupResponse {
    token: string;
    user: User
}

export interface verifyResponse {
    success: boolean;
    user: User
}

export interface updatePasswordResponse {
    success: boolean;
    message: string
}

export interface UserDetailsResponse {
    user: _User
}

export interface ApiError {
    message: string;
    statusCode?: number; 
    errors?: Record<string, string[]>; 
}
  
export interface UserUpdateResponse {
    success: boolean;
    profile: _User;
    message: string
}

