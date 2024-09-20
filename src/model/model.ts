export interface SignUpFormValues {
    name: string;
    email: string;
    password: string;
    phone: string;
    address: string; 
}
export interface SignUpResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: {
        _id: string;
        name: string;
        email: string;
        phone: string;
        address: string;
        role?: string; 
    };
    
  }

export interface LoginFormValues  {
    email: string;
    password: string;
};

export interface LoginResponse {
    success: boolean;
    statusCode: number;
    message: string;
    token: string;
    data: {
        _id: string;
        name: string;
        email: string;
        phone: string;
        address: string;
        role?: string;
        __v: number;
    };
}

 
export interface UserData {
    name: string;
    email: string;
    password?: string;
    phone: string;
    address: string;
    
};

export interface UserProfileFormValues {
  name: string;
  email: string;
  phone: string;
  address: string;
};

interface UserProfile {
    name: string;
    email: string;
    address: string;
    phone: string;
    password?: string;
    
}

export interface Action {
    type: string;
    payload?: UserProfile;
}