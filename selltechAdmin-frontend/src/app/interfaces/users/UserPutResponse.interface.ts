import { User } from "./User.interface";

export interface UserPutResponse {
    success: boolean;
    message: string;
    user: User;
}