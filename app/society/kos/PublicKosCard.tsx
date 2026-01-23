"use client"

import Image from "next/image"
import { IKosPublic } from "@/app/types"
import { BASE_IMAGE_KOS } from "@/global"
import { CiLocationOn } from "react-icons/ci"
import { getCookie } from "@/lib/client-cookies"
import BookingModal from "./modalBooking"
import { useState } from "react"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import ReviewModal from "./ReviewModal"


interface Props {
  kos: IKosPublic
}



export default function PublicKosCard({ kos }: Props) {
  const [showBooking, setShowBooking] = useState<boolean>(false)
  const [showReview, setShowReview] = useState<boolean>(false)
  const router = useRouter()
  const gender = (gen: string): React.ReactNode => {
        if (gen === "mix") {
            return <span className="bg-[#A7AAE1] text-[#7c81e0] text-sm font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-[#4A4E8A] dark:text-[#A7AAE1]">
                MIX
            </span>
        }
        if (gen === "male") {
            return <span className="bg-[#BADFDB] text-[#7fd3cb] text-sm font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-[#2F6F73] dark:text-[#BADFDB]">
                MALE
            </span>
        }
        return <span className="bg-[#FFBDBD] text-[#f88181] text-sm font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-[#8A3F3F] dark:text-[#FFBDBD]">

        </span>
    }

  return (
    <div className="bg-white rounded-3xl shadow-md border overflow-hidden flex flex-col">
      
      {/* Foto */}
      <div className="relative w-full h-48 bg-gray-200">
        {kos.foto?.length > 0 ? (
          <Image
            src={`${BASE_IMAGE_KOS}/${kos.foto[0].foto}`}
            alt={kos.name}
            fill
            className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-400">
            No Image
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-lg">{kos.name}</h2>
          {gender(kos.gender)}
        </div>

        <div className="flex items-center text-sm text-gray-600 gap-1">
          <CiLocationOn />
          {kos.address}
        </div>

        {/* Fasilitas */}
        <div className="flex flex-wrap gap-2 mt-2">
          {kos.kosFasilitas?.length ? (
            kos.kosFasilitas.map((f, i) => (
              <span
                key={i}
                className="px-3 py-1 text-xs rounded-full bg-gray-100 border"
              >
                {f.fasilitas?.fasilitas}
              </span>
            ))
          ) : (
            <span className="text-xs text-gray-400">
              No facilities
            </span>
          )}

        </div>

        <hr className="mt-3"/>

        <p className="text-xl font-semibold">
          Rp {Number(kos.price_per_month).toLocaleString()}
          <span className="text-sm font-normal"> / bulan</span>
        </p>

        {/* Action */}
        <div className="flex gap-2 mt-4">
          <button
            type="button"
            onClick={() => setShowBooking(true)}
            className="flex-1 bg-primary text-white rounded-lg py-2 hover:opacity-90"
          >
            Booking
          </button>

          <BookingModal 
            kosId={kos.idKos}
            isShow={showBooking}
            onClose={setShowBooking}
            onSuccess={() => {
              toast("booking berhasil ditambahkan", {
                hideProgressBar: true,
                containerId: `toastKos`,
                type: "success"
              })
              router.refresh()
              return true
            }}
          />

          <button
            type="button"
            onClick={() => setShowReview(true)}
            className="flex-1 border rounded-lg py-2 hover:bg-gray-50"
          >
            Review
          </button>

          <ReviewModal
            isShow={showReview}
            onClose={setShowReview}
            kos={kos}
          />
        </div>
      </div>
    </div>
  )
}
