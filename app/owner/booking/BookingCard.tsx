"use client"

import { IBooking } from "@/app/types"
import { useState } from "react"
import { put } from "@/lib/api-bridge"
import { BASE_API_URL } from "@/global"
import { getCookie } from "@/lib/client-cookies"
import BookingDetailModal from "./BookingDetailModal"
import BookingCancelModal from "./BookingCancelModal"
import { toast } from "react-toastify"

export default function BookingCard({
  booking,
  onUpdate,
}: {
  booking: IBooking
  onUpdate: () => void
}) {
  const [showDetail, setShowDetail] = useState(false)
  const [showCancel, setShowCancel] = useState(false)
  const [loading, setLoading] = useState(false)

  const token = getCookie("token") || ""
  const handleUpdateStatus = async (newStatus: "active" | "finish") => {
  const token = getCookie("token") || ""

  const res = await put(
    `${BASE_API_URL}/book/editStatus/${booking.kosId}/${booking.idBooks}`,
    { status: newStatus },
    token
  )

  if (res.status) {
    toast("Berhasil mengubah status!", {
      hideProgressBar: true,
      containerId: `toastUser`,
      type: `success`
    })
    onUpdate()
  } else {
    toast("Gagal mengubah status booking", {
      hideProgressBar: true,
      containerId: `toastUser`,
      type: `warning`
    })
  }
}

  const statusColor: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-700",
    active: "bg-green-100 text-green-700",
    cancel: "bg-red-100 text-red-700",
    finish: "bg-gray-200 text-gray-700",
  }

  return (
    <div className="bg-white border rounded-xl p-4 flex justify-between items-center">
      {/* LEFT */}
      <div className="space-y-1">
        <h2 className="font-bold text-lg">{booking.kos_id?.name}</h2>

        <p className="text-sm text-gray-600">
          {booking.startDate.split("T")[0]} –{" "}
          {booking.endDate.split("T")[0]}
        </p>

        <p className="text-sm">
          Total:{" "}
          <strong>
            Rp {booking.totalPrice.toLocaleString("id-ID")}
          </strong>
        </p>

        <span
          className={`text-xs px-2 py-1 rounded-full ${
            statusColor[booking.status]
          }`}
        >
          {booking.status.toUpperCase()}
        </span>
      </div>

      {/* RIGHT */}
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
                  onClick={() => handleUpdateStatus("finish")}
                  className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm"
                >
                  Selesai
                </button>

          <button
            onClick={() => setShowCancel(true)}
            className="px-3 py-1 bg-red-500 text-white rounded-lg text-sm"
          >
            Cancel
          </button>
          </>
        )}

        {booking.status === "pending" && (
          <button
            onClick={() => handleUpdateStatus("active")}
            className="px-3 py-1 bg-green-600 text-white rounded-lg text-sm"
          >
            Konfirmasi
          </button>
        )}
      </div>

      {/* MODAL */}
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
