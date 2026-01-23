"use client"

import Modal from "@/components/Modal"
import { InputGroupComponent } from "@/components/inputComponent"
import { useState } from "react"
import { createBooking } from "@/lib/booking-api"
import { getCookie } from "@/lib/client-cookies"
import { PaymentCycle } from "@/app/types"
import { toast } from "react-toastify"

type Props = {
  
    kosId: number
  isShow: boolean
  onClose: (v: boolean) => void
  onSuccess?: () => void
}

export default function BookingModal({ kosId, isShow, onClose, onSuccess }: Props) {
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [cycle, setCycle] = useState<PaymentCycle>("monthly")
  const [loading, setLoading] = useState(false)
  const TOKEN = getCookie("token") || ""

  const handleSubmit = async () => {
    try {
      setLoading(true)

      await createBooking(
        kosId,
        { startDate, endDate, paymmentCycle: cycle },
        TOKEN
      )

      toast.success("Booking berhasil 🎉", { containerId: `toastUser` })
      onSuccess?.()
      onClose(false)
    } catch (err: any) {
      toast.error(err?.message || "Gagal booking", { containerId: `toastUser` })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal isShow={isShow} onClose={onClose}>
      <div className="p-6">
        <h2 className="text-lg font-bold mb-4">Booking Kos</h2>

        <InputGroupComponent
          label="Start Date"
          type="date"
          id="startDate"
          value={startDate}
          onChange={setStartDate}
          required
        />

        <InputGroupComponent
          label="End Date"
          type="date"
          id="endDate"
          value={endDate}
          onChange={setEndDate}
        />

        <div className="my-3">
          <strong className="text-xs text-slate-500">Payment Cycle</strong>
          <select
            value={cycle}
            onChange={e => setCycle(e.target.value as PaymentCycle)}
            className="w-full border rounded-md p-2"
          >
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>

        <button
          disabled={loading}
          onClick={handleSubmit}
          onMouseDown={(e) => e.stopPropagation()}
          className="w-full mt-4 bg-primary text-white py-2 rounded-xl"
        >
          {loading ? "Processing..." : "Book Sekarang"}
        </button>
      </div>
    </Modal>
  )
}
