// lib/booking-api.ts
import { post, get, put } from "@/lib/api-bridge"
import { IBooking, PaymentCycle, BookingStatus } from "@/app/types"
import { getCookies } from "./server-cookie"

export const createBooking = async (
  kosId: number,
  data: {
    startDate: string
    endDate: string
    paymmentCycle: PaymentCycle
  }, 
  token: string
) => {
  
  return post(`/book/booking/${kosId}`, JSON.stringify(data), token)
}

export const getMyBookings = async (token: string) => {
  return get(`/get-perUser`, token )
}

export const updateBooking = async (
  data: Partial<IBooking>,
  token: string
) => {
  return put(`/update`, data, token)
}

export const updateBookingStatus = async (
  kosId: number,
  idBooks: number,
  status: BookingStatus,
  token: string
) => {
  return put(`/editStatus/${kosId}/${idBooks}`, { status }, token)
}
