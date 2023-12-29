
interface WriteReviewRequest {
  target: number
  evalSummary?: string
  evalText1?: string
  evalScore1?: number
  evalText2?: string
  evalScore2?: number
  evalText3?: string
  evalScore3?: number
  evalText4?: string
  evalScore4?: number
  evalText5?: string
  evalScore5?: number
}

interface Review {
  status: string | undefined
  targetChannel: number
  writerId: number
  version: number
  evalSummary: string | undefined
  evalText1: string | undefined
  evalScore1: number | undefined
  evalText2: string | undefined
  evalScore2: number | undefined
  evalText3: string | undefined
  evalScore3: number | undefined
  evalText4: string | undefined
  evalScore4: number | undefined
  evalText5: string | undefined
  evalScore5: number | undefined
  createdAt: Date
  updatedAt: Date
}

interface SearchChannelResponse {
  items: SearchChannelResponseItem[]
}

interface SearchChannelResponseItem {
  channelId: number,
  platform: string
  name: string
  description: string
  country?: string
  thumbnailUrl: string
  followerCount: number
  contentsCount: number
  totalAdCount: number
  avgViewCount: number
  avgViewRatio: number
  avgCommentCount: number
  avgCommentRatio: number
  avgAdViewCount: number
  avgAdViewRatio: number
  avgAdCommentCount: number
  avgAdCommentRatio: number
  tags: string|undefined
  reviewSummary?: ReviewSummary
  videoSummary?: VideoSummaryResponse
}

interface VideoSummaryResponse {
  recentVideos: VideoSummaryResponseItem[]
  popularVideos: VideoSummaryResponseItem[]
  recentAdVideos: VideoSummaryResponseItem[]
  popularAdVideos: VideoSummaryResponseItem[]
}

interface ReviewSummary {
  count: number
  evalScore: number
}

interface VideoSummaryResponseItem {
  channelId: number,
  channelName?: string,
  channelThumbnail?: string,
  title: string,
  videoKey: string,
  videoType?: string,
  adType: string,
  category?: string,
  viewCount: number,
  likeCount: number,
  commentCount?: number,
  tags?: string,
  duration?: string,
  thumbnailUrl: string,
  publishedAt?: Date,
}

interface CategoryDashboardResponse {
  totalCount: number
  totalPage: number
  channels: SearchChannelResponseItem[],
  recentAdVideos: VideoSummaryResponseItem[],
}
