import type { IConstValue } from '../interfaces';
export declare enum GenderEnum {
    unknown = "UNKNOWN",
    male = "MALE",
    female = "FEMALE"
}
export declare class Gender {
    static values(): IConstValue[];
    static getLabelByValue(value: string): string;
    static toComment(): string;
}
export declare enum UserTypeEnum {
    common = "COMMON",
    vip = "VIP",
    svip = "SVIP"
}
export declare class UserType {
    static values(): IConstValue[];
    static getLabelByValue(value: string): string;
    static toComment(): string;
}
