export interface User{
    id?: number;
    username: number;
    email: string;
    password?: string;
    role?: 'superadmin' | 'admin' | 'customer';
    active: boolean;
    suscribed: boolean; 
    createdAt?: string;
    updatedAt?: string;
}