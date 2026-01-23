"use client"

import { useEffect, useState } from "react"
import { get } from "@/lib/api-bridge"
import { BASE_API_URL } from "@/global"
import { IKosPublic } from "@/app/types"
import PublicKosCard from "./PublicKosCard"
import { AlertInfo } from "@/components/Alert"
import { getCookie } from "@/lib/client-cookies"

export default function PublicKosPage() {
  const [kos, setKos] = useState<IKosPublic[]>([])

  const fetchKos = async () => {
    try {
      const TOKEN = getCookie("token") || ""
      const url = `${BASE_API_URL}/kos/get`
      const { data } = await get(url, TOKEN)

      if (data?.status) {
        setKos(data.data)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchKos()
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
    <div className="m-2 bg-white rounded-lg p-3 shadow">
      <h4 className="text-xl font-bold mb-2">
        Available <span className="text-primary">Kos</span>
      </h4>

      {kos.length === 0 ? (
        <AlertInfo title="Information">No Kos Available</AlertInfo>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {kos.map(k => (
            <PublicKosCard key={k.idKos} kos={k} />
          ))}
        </div>
      )}
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
