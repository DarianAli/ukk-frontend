"use client"

import { useEffect, useState } from "react"
import { IBooking } from "@/app/types"
import BookingCard from "./BookingCard"
import { get } from "@/lib/api-bridge"
import { BASE_API_URL } from "@/global"
import { getCookie } from "@/lib/client-cookies"

export default function BookingPage() {
  const [data, setData] = useState<IBooking[]>([])
  const [loading, setLoading] = useState(true)
  const STATUS_FILTER = ["all", "active", "cancel", "pending"] as const
  type StatusFilter = typeof STATUS_FILTER[number]
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("active")


  const fetchBooking = async () => {
    const token = getCookie("token") || ""
    const res = await get(`${BASE_API_URL}/book/get-OwnerBook`, token)
    if (res?.data?.status) {
      setData(res.data.data)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchBooking()
  }, [])

  const filterData = 
    statusFilter === "all"
      ? data
      : data.filter(item => item.status === statusFilter)

  if (loading) return <p className="p-6">Loading...</p>

  return (
    <div className="flex flex-col min-h-screen">
    <div className="p-6 space-y-4 ">
      <h1 className="text-xl font-bold">Booking List</h1>

      {/* Filter */}
      <div className="flex gap-2 mb-6">
        {STATUS_FILTER.map(status => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-4 py-1 rounded-full text-sm border ${statusFilter === status
              ? "bg-black text-white"
              : "bg-white"
            }`}
          >
            {status.toUpperCase()}
          </button>
        ))}
      </div>

      {filterData.length === 0 && (
        <p className="text-gray-500">Belum ada booking</p>
      )}

      {filterData.map(item => (
        <BookingCard
          key={item.idBooks}
          booking={item}
          onUpdate={fetchBooking}
        />
      ))}
      </div>

       {/* FOOTER */}
        <footer className="mt-auto bg-[#2E3B36] text-primary-foreground py-10 px-10 rounded-3xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-2 text-sm">
            <div>
              <h3 className="text-xl font-semibold mb-2">KosHunter</h3>
              <p className="text-sm opacity-80">
                Temukan kos terbaik dengan mudah, cepat, dan terpercaya.
              </p>
            </div>
            <div>
            <h4 className="font-semibold mb-2">Navigasi</h4>
              <ul className="space-y-1 text-sm opacity-80">
                <li>
                  <a href="/owner/dashboard" className="hover:opacity-100 transition">
                    Beranda
                  </a>
                </li>
                <li>
                  <a href="/tentang" className="hover:opacity-100 transition">
                    Tentang Kami
                  </a>
                </li>
                <li>
                  <a href="/bantuan" className="hover:opacity-100 transition">
                    Bantuan
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Kontak</h4>
              <p className="text-sm opacity-80">Email: darianaliapr@gmail.com</p>
              <p className="text-sm opacity-80">Instagram: @darianaliapr</p>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 mt-8 pt-4 text-center text-sm opacity-70">
            © {new Date().getFullYear()} Darian Ali Aprianto.
          </div>
        </footer>
    </div>
  )
}
