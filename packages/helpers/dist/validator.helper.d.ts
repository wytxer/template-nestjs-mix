import { ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
export declare const regexEmoji: RegExp;
export declare const regexPhone: RegExp;
export declare const regexSpecialChat: RegExp;
export declare const regexChineseChat: RegExp;
export declare const regexCnEnNumberOrUnderlineChat: RegExp;
export declare const regexPassword: RegExp;
export declare class NotIncludedEmoji implements ValidatorConstraintInterface {
    validate(text: string, args: ValidationArguments): boolean;
    defaultMessage(args: ValidationArguments): string;
}
export declare class IsGlobalPhone implements ValidatorConstraintInterface {
    validate(text: string, args: ValidationArguments): boolean;
    defaultMessage(args: ValidationArguments): string;
}
export declare class NotIncludedSpecialChat implements ValidatorConstraintInterface {
    validate(text: string, args: ValidationArguments): boolean;
    defaultMessage(args: ValidationArguments): string;
}
export declare class IsChineseChat implements ValidatorConstraintInterface {
    validate(text: string, args: ValidationArguments): boolean;
    defaultMessage(args: ValidationArguments): string;
}
export declare class IsCnEnNumberOrUnderlineChat implements ValidatorConstraintInterface {
    validate(text: string, args: ValidationArguments): boolean;
    defaultMessage(args: ValidationArguments): string;
}
export declare class IsPassword implements ValidatorConstraintInterface {
    validate(text: string, args: ValidationArguments): boolean;
    defaultMessage(args: ValidationArguments): string;
}
