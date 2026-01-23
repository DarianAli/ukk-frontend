import { useState } from "react"
import { IReviews } from "@/app/types"
import { post } from "@/lib/api-bridge"
import { BASE_API_URL } from "@/global"
import { getCookie } from "@/lib/client-cookies"
import { Reply } from "lucide-react"
import { toast } from "react-toastify"

export default function ReviewReplyItem({
  review,
  onSuccess,
}: {
  review: IReviews
  onSuccess: () => void
}) {
  const [reply, setReply] = useState("")
  const [isReplying, setIsReplying] = useState(false)
  const [loading, setLoading] = useState(false)
  const token = getCookie("token") || ""
  const hasReply = review.replyReview && review.replyReview.length > 0

  const submitReply = async () => {
    try {
    if (!reply.trim()) return

    setLoading(true)
    await post(
      `${BASE_API_URL}/replies/create/${review.idReviews}/reply`,
      JSON.stringify({ reply }),
      token
    )

    toast("Reply Terkirim!", {
      hideProgressBar: true,
      containerId: `toastKos`,
      type: `success`
    })

    setLoading(false)
    setReply("")
    setIsReplying(false)
    onSuccess()
  } catch (error) {
    console.log(error)
    toast("Gagal Reply", {
      hideProgressBar: true,
      containerId: `toastKos`,
      type: `warning`
    })
  }
  }

  return (
    <div className="border rounded-xl p-4 space-y-3">
      <div>
        <p className="text-xs text-gray-500 mb-1">
          {review.user?.email || "Anonymous"}
        </p>
        <p className="text-sm text-gray-800 leading-relaxed">
          {review.comment}
        </p>
      </div>

      {hasReply ? (
        <div className="ml-4 bg-primary/5 border-l-4 border-primary rounded-r-lg p-4">
          <div className="flex items-center gap-2 mb-1">
            <Reply className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              {review.replyReview?.map((reply) => (
                <div
                  key={reply.idReply}
                  className="w-full border rounded-lg p-2 text-sm resize-none"
                >
                  <p className="text-xs text-blue-600 font-semibold mb-1">
                    Owner
                  </p>
                  <p className="text-sm leading-snug">
                    {reply.reply}
                  </p>
                </div>
              ))}
            </span>
          </div>

        </div>  
      ) : isReplying ? (
        <div className="ml-4 space-y-2">
          <textarea
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            placeholder="Tulis balasan Anda..."
            className="w-full border rounded-lg p-2 text-sm resize-none"
            rows={3}
          />
          <div className="flex gap-2">
            <button
              onClick={submitReply}
              disabled={loading}
              className="text-sm bg-primary text-white px-4 py-1.5 rounded-lg disabled:opacity-50"
            >
              {loading ? "Menyimpan..." : "Kirim Balasan"}
            </button>
            <button
              onClick={() => {
                setIsReplying(false)
                setReply("")
              }}  
              className="text-sm border px-4 py-1.5 rounded-lg"
            >
              Batal
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsReplying(true)}
          className="ml-4 text-sm border px-4 py-1.5 rounded-lg flex items-center gap-2"
        >
          <Reply className="w-4 h-4" />
          Balas Review
        </button>
      )}
    </div>
  )
}
