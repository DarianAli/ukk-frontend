export interface IUser {
    idUser: string; 
    uuid: string;
    name: string;
    email: string;
    password: string;
    role: string;
    profile: string;
    phone: string;
    createdAt: string;
    updatedAt: string;
}

export interface IKos {
    idKos: string;
    uuid: string;
    name: string;
    addres: string;
    foto: string
    price_per_month: number;
    createdAt: string;
    updatedAt: string;
}