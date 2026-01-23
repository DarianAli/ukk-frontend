import { get, post } from "@/lib/api-bridge"
import { BASE_API_URL } from "@/global"

export const getReviewByKos = async (kosId: number, token: string) => {
  return get(`${BASE_API_URL}/review/getRev/${kosId}`, token)
}

export const postReviewReply = async (
  kosId: number,
  reviewId: number,
  comment: string,
  token: string
) => {
  return post(
    `${BASE_API_URL}/review/edit/${kosId}/${reviewId}`,
    JSON.stringify({ comment }),
    token
  )
}
