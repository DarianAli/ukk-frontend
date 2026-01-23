"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import Modal from "@/components/Modal"
import { IReviews, IReviewsModal } from "@/app/types"
import { BASE_API_URL, BASE_IMAGE_KOS } from "@/global"
import { get, post } from "@/lib/api-bridge"
import { getCookie } from "@/lib/client-cookies"
import { MapPin } from "lucide-react"
import ReviewReplyItem from "./ReviewReplyItem"


const OwnerReviewModal = ({ isShow, onClose, kos }: IReviewsModal) => {
  const [reviews, setReviews] = useState<IReviews[]>([])
  const token = getCookie("token") || ""

  const fetchReviews = async () => {
    const res = await get(
      `${BASE_API_URL}/review/getRev/${kos.idKos}`,
      token
    )
    if (res?.data?.status) setReviews(res.data.data)
  }

  useEffect(() => {
    if (isShow) fetchReviews()
  }, [isShow])

  return (
    <Modal isShow={isShow} onClose={onClose}>
      <div className="p-6 space-y-6">

        <div className="relative w-full h-64 rounded-xl overflow-hidden">
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

        <div className="flex justify-between">
          <div>
            <h2 className="text-2xl font-bold">{kos.name}</h2>
            <div className="flex items-center gap-2 text-gray-500">
              <MapPin size={16} />
              {kos.address}
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-3">
            Review Penghuni ({reviews.length})
          </h3>

          <div className="space-y-4 max-h-72 overflow-y-auto">
            {reviews.map((rev) => (
              <ReviewReplyItem
                key={rev.idReviews}
                review={rev}
                onSuccess={fetchReviews}
              />
            ))}
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default OwnerReviewModal
