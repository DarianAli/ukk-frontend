"use client"

import { useEffect, useState } from "react"
import { getCookie } from "@/lib/client-cookies"
import { get } from "@/lib/api-bridge"
import { BASE_API_URL } from "@/global"
import { IKos } from "@/app/types"
import OwnerKosCard from "@/components/reviews/OwnerKosCard"

export default function OwnerReviewPage() {
  const [kosList, setKosList] = useState<IKos[]>([])
  const [totalReview, setTotalReview] = useState<Number>(0)
  const [unreplied, setUnreplied] = useState<Number>(0)

  const token = getCookie("token") || ""

  const fetchKos = async () => {
    const res = await get(`${BASE_API_URL}/kos/my`, token)
    if (res?.data?.status) {
      setKosList(res.data.data)
    }
  }

  useEffect(() => {
    fetchKos()
  }, [])

  const fetchTotalReview = async () => {
  const res = await get(`${BASE_API_URL}/review/get-perOwner`, token)
  if (res?.data?.status) {
    setTotalReview(res.data.data)
  }
}

useEffect(() => {
  fetchKos()
  fetchTotalReview()
}, [])

  const fetchUnreplied = async () => {
  const res = await get(`${BASE_API_URL}/review/get-RevRep`, token)
  if (res?.data?.status) setUnreplied(res.data.data)
}

useEffect(() => {
  fetchKos()
  fetchUnreplied()
}, [])

  const totalKos = kosList.length

  return (
    <div className="space-y-6">
      {/* Stat */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Properti Kos" value={totalKos} />
        <StatCard title="Total Review" value={totalReview} />
        <StatCard title="Belum Dibalas" value={unreplied} />
      </div>

      <h2 className="text-lg font-semibold">Pilih Properti</h2>

      <div className="grid md:grid-cols-2 gap-6">
        {kosList.map((kos) => (
          <OwnerKosCard key={kos.idKos} kos={kos} />
        ))}
      </div>
    </div>
  )
}

const StatCard = ({ title, value }: any) => (
  <div className="bg-white rounded-xl p-5 border">
    <p className="text-sm text-gray-500">{title}</p>
    <p className="text-2xl font-bold">{value}</p>
  </div>
)
