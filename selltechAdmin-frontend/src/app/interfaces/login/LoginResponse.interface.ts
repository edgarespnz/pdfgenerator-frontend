export interface LoginResponse{
    token: {
        success: boolean;
        message: string;
        token: string;
    }
    userInfo: {
        userId: number;
        username: string;
        email: string;
    }
}