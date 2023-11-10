import type { IConstValue } from '../interfaces';
export declare enum SortOrderEnum {
    desc = "DESC",
    asc = "ASC"
}
export declare enum ClientSourceEnum {
    wechatApp = "WECHAT_APP",
    pc = "PC",
    unknown = "UNKNOWN"
}
export declare class ClientSource {
    static values(): IConstValue[];
    static getLabelByValue(value: string): string;
    static valid(value: string): boolean;
    static toComment(): string;
}
export declare enum ProductKeyEnum {
    admin = "ADMIN",
    wechatApp = "WECHAT_APP"
}
export declare class ProductKey {
    static values(): IConstValue[];
    static getLabelByValue(value: string): string;
    static toComment(): string;
    static valid(value: string): boolean;
}
