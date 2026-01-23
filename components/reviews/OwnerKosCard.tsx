"use client"

import Image from "next/image"
import { useState } from "react"
import { IKos } from "@/app/types"
import { BASE_IMAGE_KOS } from "@/global"
import OwnerReviewModal from "./OwnerReviewModal"

export default function OwnerKosCard({ kos }: { kos: IKos }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="cursor-pointer border rounded-xl overflow-hidden hover:shadow transition"
      >
        <div className="relative h-40">
          <Image
            src={
              kos.foto?.length
                ? `${BASE_IMAGE_KOS}/${kos.foto[0].foto}`
                : "/image/no-image.jpg"
            }
            alt={kos.name}
            fill
            className="object-cover"
          />
        </div>

        <div className="p-4">
          <h3 className="font-semibold">{kos.name}</h3>
          <p className="text-sm text-gray-500">{kos.address}</p>
        </div>
      </div>

      {/* MODAL */}
      <OwnerReviewModal
        isShow={open}
        onClose={setOpen}
        kos={kos}
      />
    </>
  )
}
