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
import {useNavigate, useParams} from "react-router-dom";
import {useCategoryDashboardData} from "../../api/apis";
import React, {useState} from "react";
import {parseCount} from "../../util/utils";
import {NegativeStar, PositiveStar} from "../YoutubeChannelDetail/ChannelDetailReviews";
import VideoItem, {Dot} from "../../component/VideoItem";
import {Criteria} from "@elastic/eui/src/components/basic_table/basic_table";


const CategoryDashBoard = () => {
  const navigate = useNavigate();
  const {categoryName} = useParams()
  const [page, setPage] = useState(0)
  const {data: categoryDashboardData } = useCategoryDashboardData(categoryName, page)

  const columns: Array<EuiTableFieldDataColumnType<SearchChannelResponseItem>> = [
    {
      field: 'name',
      name: '채널명',
      width: "400px",
      style: { cursor: "pointer", },
      render: (_, channel: SearchChannelResponseItem) => (
        <EuiFlexGroup
          gutterSize="m"
          alignItems="center"
          onClick={() => { navigate(`/channels/${channel.channelId}`)}}
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
              {"구독자 "}
              {parseCount(Number(channel?.followerCount)) || "0"}
            </div>
          </EuiFlexItem>
        </EuiFlexGroup>
      ),
    },
    {
      field: 'name',
      name: '카테고리',
      render: (_, channel: SearchChannelResponseItem) => (
        <EuiTextColor color="subdued">
          #웹예능
          <Dot />
          #직업체험
        </EuiTextColor>
      )
    },
    {
      field: 'name',
      name: 'AD조회수',
      render: (_, channel: SearchChannelResponseItem) => (
        <EuiTextColor color="subdued">
          1,302회
        </EuiTextColor>
      )
    },
    {
      field: 'name',
      name: 'AD코멘트수',
      render: (_, channel: SearchChannelResponseItem) => (
        <EuiTextColor color="subdued">
          1,302회
        </EuiTextColor>
      )
    },
    {
      field: 'name',
      name: '주 시청사',
      render: (_, channel: SearchChannelResponseItem) => (
        <div>
          <EuiBadge
            color="hollow"
          >
            20대여성
          </EuiBadge>
          <EuiBadge
            color="hollow"
          >
            10대여성
          </EuiBadge>
        </div>
      )
    },
    {
      field: 'name',
      name: '광고주리뷰',
      render: (_, channel: SearchChannelResponseItem) => (
        <div>
          <PositiveStar/>
          <PositiveStar/>
          <PositiveStar/>
          <PositiveStar/>
          <NegativeStar/>
          <br/>
          <EuiBadge
            color="hollow"
            iconType="editorComment"
          >
            3
          </EuiBadge>
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

      <EuiSpacer size="xl" />

      <EuiFlexGroup
        gutterSize="xs"
      >
        <EuiTitle size="s">
          <h3>
            최근 광고 동영상
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
        gutterSize="m"
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

      <EuiSpacer size="xl" />

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
          onChange={(criteria: Criteria<any>) => {
          }}
          pagination={{
            pageIndex: page,
            pageSize: 20,
            totalItemCount: 100,
          }}
        />
      </EuiPageSection>
    </EuiPageBody>
  )
}

export default CategoryDashBoard;