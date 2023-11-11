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

export const apiFetchChannel = async (channelId: number) => {
  const res = await axios.get<SearchChannelResponseItem>(`/v1/channels/${channelId}`)
  return res.data
}

export const useFetchChannel = (channelId: number) => {
  return useQuery(
    ["/v1/channels/", channelId],
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

interface SignupAsAdvertiserRequest {
  email: string
  password: string
  corpName: string
  name: string
  position: string
  phone: string
  agree1: boolean
  agree2: boolean
  agree3: boolean
}

export const apiSignupAdvertiser = async (payload: SignupAsAdvertiserRequest) => {
  const res = await axios.post<{ memberId: number }>(`/v1/advertiser/signup`, payload)
  return res.data
}

export const useSignupAdvertiser = () => {
  return useMutation(
    apiSignupAdvertiser
  )
}