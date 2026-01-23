"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Modal from "@/components/Modal";
import { IReviews, IReviewsModal } from "@/app/types";
import { BASE_API_URL, BASE_IMAGE_KOS } from "@/global";
import { get, post } from "@/lib/api-bridge";
import { getCookie } from "@/lib/client-cookies";
import { InputGroupComponent } from "@/components/inputComponent";
import { MapPin } from "lucide-react";
import { toast } from "react-toastify";

const ReviewModal = ({ isShow, onClose, kos }: IReviewsModal) => {
  const [reviews, setReviews] = useState<IReviews[]>([]);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const token = getCookie("token") || "";

const formatPrice = (price: string | number) => {
  const value =
    typeof price === "string"
      ? Number(price.replace(/[^\d]/g, ""))
      : price

  if (isNaN(value)) return "Rp 0"

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value)
}


  const fetchReviews = async () => {
    const res = await get(`${BASE_API_URL}/review/getRev/${kos.idKos}`, token);
    if (res?.data?.status) {
      setReviews(res.data.data);
    }
  };

  const submitReview = async () => {
    try {
    if (!comment.trim()) return;

    setLoading(true);
    await post(
      `${BASE_API_URL}/review/add/${kos.idKos}`,
      JSON.stringify({ comment }),
      token
    );
    toast.success("Berhasil Memberi Review!", { containerId: `toastUser` })

    setComment("");
    setLoading(false);
    fetchReviews();
    onClose(false);
  } catch (error) {
    toast.warning("Terjadi kesalahan", { containerId: `toastUser` })
  }
  };

  useEffect(() => {
    if (isShow) fetchReviews();
  }, [isShow]);

  return (
    <Modal isShow={isShow} onClose={onClose}>
      <div className="p-6 space-y-6">
        {/* Header Kos Start */}
        <div className="flex gap-4">
          <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden bg-gray-200 shrink-0">
            <Image
              src={
                kos.foto && kos.foto.length > 0
                  ? `${BASE_IMAGE_KOS}/${kos.foto[0].foto}`
                  : "/image/no-image.jpg"
              }
              alt={kos.name}
              fill
              className="object-cover"
            />
          </div>
        </div>
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
                {kos.name}
              </h2>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>{kos.address}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-primary">{formatPrice(kos.price_per_month)}</div>
              <div className="text-muted-foreground">/bulan</div>
            </div>
          </div>
        {/* Header Kos End */}

        {/* Fasilitas Start */}
        {kos.kosFasilitas && kos.kosFasilitas.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold mb-2">Fasilitas</h3>
            <div className="flex flex-wrap gap-2">
              {kos.kosFasilitas.map((f, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-gray-100 px-3 py-1 rounded-full"
                >
                  {f.fasilitas?.fasilitas}
                </span>
              ))}
            </div>
          </div>
        )}
        {/* Fasilitas End */}

        {/* Review List Start */}
        <div>
          <h3 className="text-sm font-semibold mb-3">Review Penghuni</h3>

          <div className="space-y-4 max-h-56 overflow-y-auto">
            {reviews.length === 0 && (
              <p className="text-sm text-gray-400">Belum ada review</p>
            )}

            {reviews.map((rev) => (
              <div key={rev.idReviews} className="space-y-2">

                {/* USER REVIEW */}
                <div className="bg-gray-50 p-3 rounded-xl">
                  <p className="text-xs text-gray-500 mb-1">
                    {rev.user?.email || "Anonymous"}
                  </p>
                  <p className="text-sm leading-snug">
                    {rev.comment}
                  </p>
                </div>

                {/* OWNER REPLIES */}
                {rev.replyReview && rev.replyReview.length > 0 && (
                  <div className="space-y-2">
                    {rev.replyReview.map((reply) => (
                      <div
                        key={reply.idReply}
                        className="ml-8 bg-blue-50 p-3 rounded-xl border-l-4 border-blue-400"
                      >
                        <p className="text-xs text-blue-600 font-semibold mb-1">
                          Owner
                        </p>
                        <p className="text-sm leading-snug">
                          {reply.reply}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

              </div>
))}
          </div>
        </div>

        {/* Review List End */}

        {/* Input Review Start */}
        <div className="border-t pt-4">
          <InputGroupComponent
            type="text"
            id="comment"
            label="Tulis Review"
            value={comment}
            onChange={setComment}
            placeholder="Bagikan pengalamanmu tinggal di kos ini..."
          />

          <button
            onClick={submitReview}
            disabled={loading}
            className="mt-3 w-full bg-primary text-white py-2 rounded-xl hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Mengirim..." : "Kirim Review"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ReviewModal;
