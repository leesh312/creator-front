import axios from "axios";
import {youtube_v3} from "googleapis";
import {useMutation, useQuery} from "react-query";

export const apiSearch = async (q: string) => {
  const res = await axios.get<SearchChannelResponse>(`/v1/channels/search?q=${q}`)
  return res.data
}

export const useSearch = (q: string) => {
  return useQuery(["/v1/channels/search", q], () => apiSearch(q), { enabled: !!q, refetchOnWindowFocus: false, })
}

export const apiFetchChannel = async (channelId: string) => {
  const res = await axios.get<youtube_v3.Schema$ChannelListResponse>(`/v1/y/channels/${channelId}`)
  const items = res.data.items as youtube_v3.Schema$Channel[];
  return items.length > 0 ? items[0] : undefined
}

export const useFetchChannel = (channelId: string) => {
  return useQuery(
    ["/v1/y/channels", channelId],
    () => apiFetchChannel(channelId),
    { enabled: !!channelId },
  )
}

export const apiWriteReview = async (payload: WriteReviewRequest) => {
  const res = await axios.post(`/v1/reviews`, payload)
  return res.data
}

export const useWriteReview = () => {
  return useMutation(
    apiWriteReview,
  )
}

export const apiGetReviews = async (channelId: string) => {
  const res = await axios.get<Review[]>(`/v1/reviews?channelId=${channelId}`)
  return res.data
}

export const useFetchReviews = (channelId: string|undefined) => {
  return useQuery(
    ["/v1/reviews", channelId],
    () => apiGetReviews(channelId!!),
    { enabled: !!channelId }
  )
}