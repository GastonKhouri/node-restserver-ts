export interface UserModel {
    nombre: string;
    correo: string;
    password: string;
    role: string;
    estado: boolean;
    id?: string;
    uid?: string;
}

export interface RoleModel {
    role: string
}

export interface UserPayload {
    uid: string;
}

export interface JwtExpPayload {
    expiresIn: string;
    exp: number;
}