export interface IUser {
    idUser: number; 
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
    idKos: number;
    uuid: string;
    name: string;
    address: string;
    gender: string;
    foto: IFotoKos[];
    fasilitas: IFaci[]
    price_per_month: string;
    // reviews: string;
    createdAt: string;
    updatedAt: string;
}

export interface IFotoKos {
    idFoto: number;
    uuid: string;
    foto: string;
    kosId: number
}


export interface IFaci {
    idFasilitas?: number;
    fasilitas: string
}

export interface IKosPublic extends IKos {
  kosFasilitas: {
    fasilitasId: number
    fasilitas?: {
      fasilitas: string
    }
  }[]
}

export interface IBook {
  idBook: string
  kosId: IKos[];
  userId: IUser[];
  startData: string;
  endDate: string
}

export type PaymentCycle = "monthly" | "quarterly" | "yearly"
export type BookingStatus = "active" | "cancel" | "finish" | "pending"
export type PaymentStatus = "waiting" | "paid" | "unpayed"

export interface IBooking {
  idBooks: number
  uuid: string
  kosId: number
  user_id?: {
    idUser: number | null
    email: string
  }
  startDate: string
  endDate: string
  paymmentCycle: PaymentCycle
  status: BookingStatus
  totalPrice: number
  createdAt: string
  updatedAt: string
  kos_id?: {
    idKos: number
    name: string
  }
  payment?: {
    status: PaymentStatus
    invoiceNo: string
  }[]
}

// Review

export interface IUserMini {
  idUser: number;
  email: string;
}

export interface IReviews {
  idReviews: number;
  uuid: string;
  comment: string;
  userId: number | null;
  kosId: number| null;
  createdAt: string;
  updatedAt: string;
  user?: IUserMini | null
  replyReview?: IReviewReply[]
}

export interface IReviewsModal {
  isShow: boolean;
  onClose: (status: boolean) => void;
  kos: {
    idKos: number
    name: string; 
    address: string;
    price_per_month: string;
    foto?: {foto: string}[]
    kosFasilitas?: {
      fasilitas?: {
        fasilitas: string
      }
    }[]
  }
}

export interface IReviewReply {
  idReply: number;
  uuid: string;
  reply: string;
  createdAt: string;
  ownerId?: number;
}

export interface IReviewWithReply {
  idReviews: number
  uuid: string
  comment: string
  createdAt: string
  user?: {
    idUser: number
    email: string
  }
  reply?: IReviewReply | null
}
