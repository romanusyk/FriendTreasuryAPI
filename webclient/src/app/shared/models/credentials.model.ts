export class Credentials {
    username: string;
    password: string;
    confirmPassword: string;
    phone: string;
}

export enum CredentialsType {
    login,
    register
}
