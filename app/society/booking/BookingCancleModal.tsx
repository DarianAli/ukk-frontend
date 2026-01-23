"use client"

import Modal from "@/components/Modal"
import { IBooking } from "@/app/types"
import { put } from "@/lib/api-bridge"
import { BASE_API_URL } from "@/global"
import { getCookie } from "@/lib/client-cookies"
import { toast } from "react-toastify"

export default function BookingCancelModal({
  isShow,
  onClose,
  booking,
  onSuccess
}: {
  isShow: boolean
  onClose: (v: boolean) => void
  booking: IBooking
  onSuccess: () => void
}) {
  const handleCancel = async () => {
    try {
    const token = getCookie("token") || ""

    await put(
      `${BASE_API_URL}/book/editStatus/${booking.kosId}/${booking.idBooks}`,
      { status: "cancel" },
      token
    )

    toast("Pembatalan Berhasil!", {
      hideProgressBar: true,
      containerId: `toastUser`,
      type: "success"
    })

    onClose(false)
    onSuccess()
  } catch (error) {
    toast("Terjadi keslahan", {
      hideProgressBar: true,
      containerId: `toastUser`,
      type: `warning`
    })
  }
  }

  return (
    <Modal isShow={isShow} onClose={onClose}>
      <div className="p-6 space-y-4">
        <h2 className="text-lg font-bold text-red-600">
          Batalkan Booking?
        </h2>

        <p>
          Apakah kamu yakin ingin membatalkan booking kos{" "}
          <strong>{booking.kos_id?.name}</strong>?
        </p>

        <div className="flex gap-2">
          <button
            onClick={() => onClose(false)}
            className="flex-1 border py-2 rounded-lg"
          >
            Tidak
          </button>
          <button
            onClick={handleCancel}
            className="flex-1 bg-red-500 text-white py-2 rounded-lg"
          >
            Ya, Batalkan
          </button>
        </div>
      </div>
    </Modal>
  )
}
