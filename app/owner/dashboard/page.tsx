"use client"

import { BASE_API_URL } from "@/global"
import StatCard from "./StatCard"
import { useState, useEffect } from "react"
import { getCookie } from "@/lib/client-cookies"
import { get } from "@/lib/api-bridge"
import { IBooking } from "@/app/types"
import StatusBadge from "./StatusBadge"

type Booking = {
  idBooks: number
  startDate: string
  status: string
  user_id: {
    email: string
  }
  kos_id: {
    name: string
  }
}

export default function DashboardPage() {
  /* ===== FETCH DATA ===== */


  const [totalKos, setTotalKos] = useState<number>(0)
  const [totalReview, setTotalReview] = useState<number>(0)
  const [totalBook, setTotalBook] = useState<number>(0)
  const [data, setData] = useState<IBooking[]>([])
  

  const TOKEN = getCookie("token")|| ""

  const getBooking = async () => {
    try {
      const url = `${BASE_API_URL}/book/get-ActiveBook`
      const { data } = await get(url, TOKEN)

      if (data?.status && Array.isArray(data.data)) {
        setTotalBook(data.data.length)
      }
    } catch (error) {
      console.error("Failed to fetch book count", error)
    }
  }
    useEffect(() => {
    getBooking()
  }, [])

  const getReview = async () => {
    try {
      const url = `${BASE_API_URL}/review/get-perOwner`
      const { data } = await get(url, TOKEN)

      if (data?.status && typeof(data.data)) {
        setTotalReview(data.data)
      }
    } catch (error) {
      console.error("Failed to fetch kos count", error)
    }
  }

  useEffect(() => {
    getReview()
  }, [])

  console.log(totalReview)

  const getKos = async () => {
    try {
      const url = `${BASE_API_URL}/kos/my`
      const { data } = await get(url, TOKEN)

      if (data?.status && Array.isArray(data.data)) {
        setTotalKos(data.data.length)
      }
    } catch (error) {
      console.error("Failed to fetch kos count", error)
    }
  }

  useEffect(() => {
    getKos()
  }, [])

    const fetchBooking = async () => {
      const token = getCookie("token") || ""
      const res = await get(`${BASE_API_URL}/book/get-OwnerBook`, token)
      if (res?.data?.status) {
        setData(res.data.data)
      }
    }
  
    useEffect(() => {
      fetchBooking()
    }, [])
  


  return (
    <div className="min-h-screen flex flex-col p-6 gap-8">
      
      {/* ===== MAIN CONTENT ===== */}
      <main className="flex-1 space-y-8">
        
        {/* ===== STAT CARDS ===== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard title="Total Kos" value={totalKos} />
          <StatCard title="Total Review" value={totalReview} />
          <StatCard title="Active Bookings" value={totalBook} />
          {/* <StatCard title="Revenue" value={`Rp ${revenue}`} /> */}
        </div>

        {/* ===== RECENT BOOKINGS ===== */}
        <div className="bg-white rounded-xl shadow-sm border">
          <h2 className="text-lg font-semibold p-5 border-b">
            Recent Bookings
          </h2>

          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="text-left px-5 py-3">Guest</th>
                <th className="text-left px-5 py-3">Kos</th>
                <th className="text-left px-5 py-3">Date</th>
                <th className="text-left px-5 py-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-5 text-gray-500">
                    Belum ada booking aktif
                  </td>
                </tr>
              ) : (
                data.map((b) => (
                  <tr key={b.idBooks} className="border-t">
                    <td className="px-5 py-3">
                      {b.user_id?.email ?? "-"}
                    </td>
                    <td className="px-5 py-3">
                      {b.kos_id?.name ?? "-"}
                    </td>
                    <td className="px-5 py-3">
                      {new Date(b.startDate).toLocaleDateString("id-ID")}
                    </td>
                    <td className="px-5 py-3">
                      <StatusBadge status={b.status} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </main>

      {/* ===== FOOTER ===== */}
      <footer className="bg-[#2E3B36] text-primary-foreground py-10 px-10 rounded-3xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-sm">
          <div>
            <h3 className="text-xl font-semibold mb-2">KosHunter</h3>
            <p className="opacity-80">
              Temukan kos terbaik dengan mudah, cepat, dan terpercaya.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Navigasi</h4>
            <ul className="space-y-1 opacity-80">
              <li><a href="/owner/dashboard">Beranda</a></li>
              <li><a href="/tentang">Tentang Kami</a></li>
              <li><a href="/bantuan">Bantuan</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Kontak</h4>
            <p className="opacity-80">Email: darianaliapr@gmail.com</p>
            <p className="opacity-80">Instagram: @darianaliapr</p>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-4 text-center text-sm opacity-70">
          © {new Date().getFullYear()} Darian Ali Aprianto.
        </div>
      </footer>

    </div>
  )
}
