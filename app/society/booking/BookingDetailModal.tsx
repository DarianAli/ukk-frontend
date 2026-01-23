"use client"

import Modal from "@/components/Modal"
import { IBooking } from "@/app/types"

export default function BookingDetailModal({
  isShow,
  onClose,
  booking,
}: {
  isShow: boolean
  onClose: (v: boolean) => void
  booking: IBooking
}) {
  return (
    <Modal isShow={isShow} onClose={onClose}>
      <div className="p-6 space-y-3">
        <h2 className="text-lg font-bold">Detail Booking</h2>

        <p><strong>Kos:</strong> {booking.kos_id?.name}</p>
        <p><strong>Check-in:</strong> {booking.startDate.split("T")[0]}</p>
        <p><strong>Check-out:</strong> {booking.endDate.split("T")[0]}</p>
        <p><strong>Payment:</strong> {booking.paymmentCycle}</p>
        <p><strong>Total:</strong> Rp {booking.totalPrice.toLocaleString()}</p>
        <p><strong>Status:</strong> {booking.status}</p>

        <button
          onClick={() => onClose(false)}
          className="w-full mt-4 bg-gray-200 py-2 rounded-lg"
        >
          Tutup
        </button>
      </div>
    </Modal>
  )
}
