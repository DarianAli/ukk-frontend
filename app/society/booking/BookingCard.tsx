"use client"

import { IBooking } from "@/app/types"
import { useState } from "react"
import { put, post } from "@/lib/api-bridge"
import { BASE_API_URL } from "@/global"
import { getCookie } from "@/lib/client-cookies"
import BookingDetailModal from "./BookingDetailModal"
import BookingCancelModal from "./BookingCancleModal"
import { toast } from "react-toastify"

export default function BookingCardOwner({
  booking,
  onUpdate
}: {
  booking: IBooking
  onUpdate: () => void
}) {
  const [showDetail, setShowDetail] = useState(false)
  const [showCancel, setShowCancel] = useState(false)
  const [loading, setLoading] = useState(false)

  const payment = booking.payment?.[0]
  const paymentStatus = payment?.status
  const invoiceNo = payment?.invoiceNo



  const token = getCookie("token") || ""

   const handlePay = async () => {
    if (paymentStatus !== "unpayed" || loading) return

    setLoading(true)

    const res = await post(
      `${BASE_API_URL}/payment/${booking.idBooks}/pay`,
      undefined,
      token
    )

    if (res?.status) {
      toast.success("Pembayaran berhasil", { containerId: `toastUser`, hideProgressBar: true })
      onUpdate()
    } else {
      toast.warning("Gagal melakukan pembayaran", { containerId: `toastUser`, hideProgressBar: true })
    }

    setLoading(false)
  }

  const statusColor: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-700",
    active: "bg-green-100 text-green-700",
    cancel: "bg-red-100 text-red-700",
    finish: "bg-gray-200 text-gray-700",
  }

  return (
    <div className="bg-white border rounded-xl p-4 flex justify-between items-center">
      <div>
        <h2 className="font-bold text-lg">{booking.kos_id?.name}</h2>
        <p className="text-sm text-gray-600">
          {booking.startDate.split("T")[0]} – {booking.endDate.split("T")[0]}
        </p>
        <p className="text-sm">
          Total: <strong>Rp {booking.totalPrice.toLocaleString()}</strong>
        </p>

        <span
          className={`text-xs px-2 py-1 rounded-full ${statusColor[booking.status]}`}
        >
          {booking.status.toUpperCase()}
        </span>
      </div>

      <div className="flex flex-col gap-2 items-end">
        <button
          onClick={() => setShowDetail(true)}
          className="px-3 py-1 border rounded-lg text-sm"
        >
          Detail
        </button> 


        {booking.status === "active" && (
          <>
            <button
              onClick={() => setShowCancel(true)}
              className="px-3 py-1 bg-red-500 text-white rounded-lg text-sm"
            >
              Cancel
            </button>
          </>
        )}

        {booking.status === "pending" && paymentStatus === "unpayed" && (
          <button
            onClick={handlePay}
            disabled={loading}
            className={`px-4 py-1 rounded-lg text-sm text-white ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Memproses..." : "Bayar"}
          </button>
        )}

        {paymentStatus !== "unpayed" && invoiceNo && (
          <button
            onClick={() =>
              window.open(
                `${BASE_API_URL}/public/invoice/${invoiceNo}.pdf`,
                "_blank"
              )
            }
            className="px-4 py-1 rounded-lg text-sm bg-green-100 text-green-700 border border-green-300 hover:bg-green-200 transition"
          >
            Lihat Invoice
          </button>
        )}
      </div>

      <BookingDetailModal
        isShow={showDetail}
        onClose={setShowDetail}
        booking={booking}
      />

      <BookingCancelModal
        isShow={showCancel}
        onClose={setShowCancel}
        booking={booking}
        onSuccess={onUpdate}
      />
    </div>
  )
}
