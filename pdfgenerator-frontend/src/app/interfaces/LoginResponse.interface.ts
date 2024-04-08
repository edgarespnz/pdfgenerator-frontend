export interface LoginResponse{
    token: {
        success: boolean;
        message: string;
        token: string;
    }
}