export class Credentials {
    username: string;
    password: string;
    confirmPassword?: string;
    phone?: string;
    email?: string;
}

export enum CredentialsType {
    login,
    register
}
