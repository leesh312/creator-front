import axios from "axios";
import {youtube_v3} from "googleapis";
import {useQuery} from "react-query";

export const apiSearch = async (q: string) => {
  const res = await axios.get<youtube_v3.Schema$SearchListResponse>(`/v1/y/channels/q?q=${q}`)
  return res.data.items as youtube_v3.Schema$SearchResult[]
}

export const useSearch = (q: string) => {
  return useQuery(["/v1/y/channels/q", q], () => apiSearch(q), { enabled: !!q })
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