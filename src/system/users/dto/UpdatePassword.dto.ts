export class UpdatePasswordDto {
    readonly id: number;
    passwordOld: string;
    password: string;
    isAdmin: boolean;
    readonly passwordConfirm: string;
}
