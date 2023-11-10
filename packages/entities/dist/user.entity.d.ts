import { Model } from 'sequelize-typescript';
import { GenderEnum, ClientSourceEnum, UserTypeEnum } from 'domains';
export declare class UserEntity extends Model {
    id: number;
    userId: string;
    unionId?: string;
    openId?: string;
    nickname: string;
    avatarUrl: string;
    phone?: string;
    gender: GenderEnum;
    clientSource: ClientSourceEnum;
    userType: UserTypeEnum;
    loggedAt?: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string;
}
