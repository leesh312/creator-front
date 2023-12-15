import {
  EuiAvatar,
  EuiBadge,
  EuiBasicTable,
  EuiFlexGroup,
  EuiFlexItem,
  EuiLink,
  EuiPageBody,
  EuiPageSection, EuiSpacer,
  EuiTextColor,
  EuiTitle
} from "@elastic/eui";
import {EuiTableFieldDataColumnType} from "@elastic/eui/src/components/basic_table/table_types";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useCategoryDashboardData} from "../../api/apis";
import React, {useState} from "react";
import {parseCount} from "../../util/utils";
import {NegativeStar, PositiveStar} from "../YoutubeChannelDetail/ChannelDetailReviews";
import VideoItem, {Dot} from "../../component/VideoItem";
import {Criteria} from "@elastic/eui/src/components/basic_table/basic_table";
import lodash from "lodash"


const CategoryDashBoard = () => {
  const navigate = useNavigate();
  const {categoryName} = useParams()
  const [page, setPage] = useState(0)
  const {data: categoryDashboardData, isLoading } = useCategoryDashboardData(categoryName, page)

  const columns: Array<EuiTableFieldDataColumnType<SearchChannelResponseItem>> = [
    {
      field: 'name',
      name: '채널명',
      width: "400px",
      style: {cursor: "pointer",},
      render: (_, channel: SearchChannelResponseItem) => (
        <EuiFlexGroup
          gutterSize="l"
          alignItems="center"
          onClick={() => {
            navigate(`/channels/${channel.channelId}`)
          }}
        >
          <EuiFlexItem
            grow={false}
          >
            <EuiAvatar
              size="l"
              name=""
              imageUrl={channel?.thumbnailUrl || ""}
            />
          </EuiFlexItem>
          <EuiFlexItem>
            <div>
              <b>{channel.name}</b>
            </div>
            <div>
              {!!channel.tags && lodash.chain(channel.tags).split(",").take(2).map((tag: string) => (
                  <>
                    <EuiTextColor color="subdued">
                      #{tag}
                    </EuiTextColor>
                    {" "}
                  </>
                )
              ).value()}
            </div>
          </EuiFlexItem>
        </EuiFlexGroup>
      ),
    },
    {
      field: 'name',
      name: '구독자',
      render: (_, channel: SearchChannelResponseItem) => (
        <EuiTextColor color="subdued">
          {parseCount(Number(channel?.followerCount)) || "0"}명
        </EuiTextColor>
      )
    },
    {
      field: 'name',
      name: '평균 조회수',
      render: (_, channel: SearchChannelResponseItem) => (
        <EuiTextColor color="subdued">
          {parseCount(channel.avgViewCount)}회
        </EuiTextColor>
      )
    },
    {
      field: 'name',
      name: '평균 코멘트수',
      render: (_, channel: SearchChannelResponseItem) => (
        <EuiTextColor color="subdued">
          {channel.avgCommentCount}개
        </EuiTextColor>
      )
    },
    {
      field: 'name',
      name: '광고주리뷰',
      render: (_, channel: SearchChannelResponseItem) => (
        <div>
          { !!channel.reviewSummary && (
            <>
              {[1, 2, 3, 4, 5].map((i) => {
                const value = !!channel.reviewSummary?.evalScore && channel.reviewSummary?.evalScore >= i
                return value ? <PositiveStar /> : <NegativeStar />
              })}
              <br/>
              <EuiBadge
                color="hollow"
                iconType="editorComment"
              >
                {channel.reviewSummary.count}
              </EuiBadge>
            </>
          )}
        </div>
      )
    },
  ];

  return (
    <EuiPageBody
      paddingSize="l"
      panelled
      restrictWidth
    >
      <EuiTitle>
        <h2>{categoryName}</h2>
      </EuiTitle>

      <EuiSpacer size="xl"/>

      { !!categoryDashboardData?.recentAdVideos?.length && (
        <>
          <EuiFlexGroup
            gutterSize="xs"
            alignItems={"center"}
          >
            <EuiTitle size="s">
              <h3>
                최근 광고 영상
              </h3>
            </EuiTitle>
            <span
              style={{
                "fontWeight": "700",
                "fontSize": "14px",
                "padding": "4px 8px",
                "backgroundColor": "#eaeaea",
                "borderRadius": "6px",
              }}
            >
          AD
        </span>
          </EuiFlexGroup>

          <EuiSpacer size="m"/>

          <EuiFlexGroup
            wrap
            gutterSize="l"
          >
            {
              categoryDashboardData?.recentAdVideos.map((item) => (
                <a
                  href={`https://www.youtube.com/watch?v=${item.videoKey}`}
                  target="_blank"
                >
                  <EuiFlexItem
                    grow={false}
                    onClick={() => {
                      navigate(`/channels/${item.channelId}`)
                    }}
                    style={{cursor: "pointer"}}
                  >
                    <VideoItem
                      channelThumbnail={""}
                      videoThumbnail={item.thumbnailUrl}
                      videoTitle={item.title}
                      viewCount={item.viewCount}
                      publishedAt={item.publishedAt?.toString() || ""}
                      showChannelAvatar={false}
                    />
                  </EuiFlexItem>
                </a>
              ))
            }
          </EuiFlexGroup>

          <EuiSpacer size="l"/>
          <EuiFlexGroup>
            <EuiFlexItem>
              <Link to={"#"}>최근 광고 영상 전체보기</Link>
            </EuiFlexItem>
          </EuiFlexGroup>

          <EuiSpacer size="xl"/>
        </>
      )}

      <EuiTitle size="s">
        <h3>
          {categoryName} 인기 채널
        </h3>
      </EuiTitle>

      <EuiPageSection>
        <EuiBasicTable
          tableCaption="채널 데이터"
          items={categoryDashboardData?.channels || []}
          columns={columns}
          tableLayout={'fixed'}
          onChange={(criteria: Criteria<any>) => {}}
          pagination={{
            pageIndex: page,
            pageSize: 20,
            totalItemCount: 100,
          }}
          loading={isLoading}
          noItemsMessage={
            <>
              <div style={{minHeight: "500px", }}>

              </div>
            </>
          }
        />
      </EuiPageSection>
    </EuiPageBody>
  )
}

export default CategoryDashBoard;