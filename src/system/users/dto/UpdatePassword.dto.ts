export class UpdatePasswordDto {
    readonly id: number;
    password: string;
    readonly passwordConfirm: string;
}
