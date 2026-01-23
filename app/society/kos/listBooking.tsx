"use client"

import { useEffect, useState } from "react"
import { getMyBookings } from "@/lib/booking-api"
import { IBooking } from "@/app/types"
import { getCookie } from "@/lib/client-cookies"

export default function MyBookings() {
  const [data, setData] = useState<IBooking[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const token = getCookie("token") || ""
      const res = await getMyBookings(token)
      setData(res.data)
    }
    fetchData()
  }, [])

  return (
    <div className="grid gap-4">
      {data.map(b => (
        <div key={b.idBooks} className="border p-4 rounded-xl">
          <h3 className="font-bold">{b.kos_id?.name}</h3>
          <p>Status: {b.status}</p>
          <p>Cycle: {b.paymmentCycle}</p>
          <p>Total: Rp {b.totalPrice.toLocaleString()}</p>
        </div>
      ))}
    </div>
  )
}
