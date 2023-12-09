import { Model } from 'sequelize-typescript';
export declare class AdminEntity extends Model {
    id: number;
    adminId: string;
    name: string;
    phone: string;
    password: string;
    description: string;
    isEnabled: boolean;
    loggedAt?: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string;
}
