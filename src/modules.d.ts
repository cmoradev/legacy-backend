declare module 'exact-math' {
    export function add(...args: any): any; // 10
    export function sub(...args: any): any; // 25
    export function mul(...args: any): any; // 2
    export function div(...args: any): any; // 27,5
    export function formula(...args: any): any; // 8.23
    export function round(...args: any): any; // 120000
    export function ceil(...args: any): any; // 0.124
    export function floor(...args: any): any; // 9
    export function pow(...args: any): any;
}

interface Stamp {
    Set(params): Stamp;

    StampV4(xml: string, callback: () => void, isb64: boolean): Stamp;
}

declare module 'sw-sdk-nodejs' {
    class AuthenticationClass {
        auth(params): this;

        Token(callback): this;

        TokenSync(): this;
    }

    // tslint:disable-next-line:max-classes-per-file
    class StampServiceClass {
        Set(params): this;

        StampV1(xml: string, callback: (error, data) => void): this;

        StampV2(xml: string, callback: (error, data) => void, isb64?: boolean): this;

        StampV3(xml: string, callback: (error, data) => void, isb64?: boolean): this;

        StampV4(xml: string, callback: (error, data) => void, isb64?: boolean): this;
    }

    // tslint:disable-next-line:max-classes-per-file
    class CancelationServiceClass {

        Set(params): this;

        CancelationByCSD(callback: (error, data) => void): this;

        CancelationByXML(callback: (error, data) => void): this;

        _setXML(params): void;

        _setCSD(params): void;

    }

    export const Authentication: AuthenticationClass;

    export const StampService: StampServiceClass;

    export const CancelationService: CancelationServiceClass;

    // tslint:disable-next-line:max-classes-per-file
    export function AccountBalance(): void;
}

declare module 'pdfmake/build/vfs_fonts' {
    export const pdfMake: {
        vfs: { [file: string]: string };
    };
}
