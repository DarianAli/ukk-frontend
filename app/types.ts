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
    address: string;
    foto: IFotoKos[]
    price_per_month: string;
    createdAt: string;
    updatedAt: string;
}

export interface IFotoKos {
    idFoto: number;
    uuid: string;
    foto: string;
    kosId: number
}