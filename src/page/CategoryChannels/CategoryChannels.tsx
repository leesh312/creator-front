import {
  EuiAvatar, EuiBadge,
  EuiBasicTable,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPageBody, EuiPageSection,
  EuiPagination,
  EuiSpacer,
  EuiTab,
  EuiTabs, EuiTextColor,
  EuiTitle
} from "@elastic/eui";
import VideoItem from "../../component/VideoItem";
import React, {useMemo} from "react";
import {Criteria} from "@elastic/eui/src/components/basic_table/basic_table";
import {Link, useNavigate, useParams, useSearchParams} from "react-router-dom";
import {useCategoryChannelData, useCategoryDashboardData} from "../../api/apis";
import {number} from "prop-types";
import {EuiTableFieldDataColumnType} from "@elastic/eui/src/components/basic_table/table_types";
import lodash from "lodash";
import {parseCount} from "../../util/utils";
import {NegativeStar, PositiveStar} from "../YoutubeChannelDetail/ChannelDetailReviews";

const CategoryChannels = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const {categoryName} = useParams()

  const page: number = useMemo(() => {
    const p = searchParams.get("page")
    return p ? Number(p) : 1
  }, [searchParams])

  const {data: channelData, isLoading } = useCategoryChannelData(categoryName, true, page)

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
      name: '최근 광고',
      render: (_, channel: SearchChannelResponseItem) => (
        <EuiTextColor color="subdued">
          {parseCount(channel.totalAdCount)}회
        </EuiTextColor>
      )
    },
    {
      field: 'name',
      name: '조회수',
      render: (_, channel: SearchChannelResponseItem) => (
        <EuiTextColor color="subdued">
          전체 {parseCount(channel.avgViewCount)}회 <br/>
          광고 {parseCount(channel.avgAdViewCount)}회
        </EuiTextColor>
      )
    },
    {
      field: 'name',
      name: '코멘트수',
      render: (_, channel: SearchChannelResponseItem) => (
        <EuiTextColor color="subdued">
          전체 {channel.avgCommentCount}개 <br/>
          광고 {channel.avgAdCommentCount || "-"}개
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
        <h2>
          {categoryName}
          {" "}
          광고 영상
          {" "}
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
        </h2>
      </EuiTitle>

      <EuiPageSection>
        <EuiBasicTable
          tableCaption="채널 데이터"
          items={channelData?.channels || []}
          columns={columns}
          tableLayout={'fixed'}
          onChange={(criteria: Criteria<any>) => {
            setSearchParams({ page: `${(criteria.page?.index || 0) + 1}` })
          }}
          pagination={{
            pageIndex: (page - 1),
            pageSize: (channelData?.totalPage || 1),
            totalItemCount: (channelData?.totalCount || 0),
            showPerPageOptions: false,
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

export default CategoryChannels;