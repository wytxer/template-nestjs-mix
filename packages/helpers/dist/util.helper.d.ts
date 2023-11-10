interface ICreateAtIntervalOptions {
    startAt: string;
    endAt: string;
    interval?: number;
    startIndex?: number;
    endOffset?: number;
}
interface ICreateAtIntervalTime {
    hour: string;
    time: string;
    [key: string]: number | string;
}
export declare const objectToString: (data: Record<string, string | boolean | number>) => string;
export declare const createUuid: () => string;
export declare const toTreeData: (data: any[], parentKey: string, parentId?: number) => any[];
export declare const createAtInterval: (options: ICreateAtIntervalOptions) => ICreateAtIntervalTime[];
export declare const cryptoRandomCharacter: (length?: number) => string;
export {};
