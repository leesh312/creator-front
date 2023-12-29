import {EuiFlexGroup, EuiFlexItem, EuiPageBody, EuiPagination, EuiRadioGroup, EuiSpacer, EuiTab, EuiTabs, EuiTitle} from "@elastic/eui";
import React, {useMemo, useState} from "react";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import VideoItem from "../../component/VideoItem";
import {useCategoryDashboardData, useCategoryVideoData} from "../../api/apis";
import {number} from "prop-types";


export const CategoryVideos = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const page: number = useMemo(() => {
    const p = searchParams.get("page")
    return p ? Number(p) : 0
  }, [searchParams])

  const period: string = useMemo(() => {
    return searchParams.get("period") || "1M"
  }, [searchParams])

  const {categoryName} = useParams()
  // const [page, setPage] = useState(0)
  const {data: categoryVideos, isLoading} = useCategoryVideoData(categoryName, true, period, page)

  // const onSelectedTabChanged = (id: string) => {
  //   setSelectedTabId(id);
  //   if(id === "1") {
  //     setSearchParams({"period": "1W"})
  //   } else if(id === "2") {
  //     setSearchParams({"period": "1M"})
  //   } else if(id === "3") {
  //     setSearchParams({"period": "3M"})
  //   }
  // };

  console.log("categoryVideos?.totalPage", categoryVideos?.totalPage)
  console.log("page", page)

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

      <EuiSpacer size="xl"/>
      <EuiTabs>
        <EuiTab
          key="1W"
          href={undefined}
          onClick={() => setSearchParams({ period: '1W', page: `0` })}
          isSelected={"1W" === period}
        >
          최근 1주
        </EuiTab>
        <EuiTab
          key="1M"
          href={undefined}
          onClick={() => setSearchParams({ period: '1M', page: `0}` })}
          isSelected={"1M" === period}
        >
          최근 1달
        </EuiTab>
        <EuiTab
          key="3M"
          href={undefined}
          onClick={() => setSearchParams({ period: '3M', page: `0` })}
          isSelected={"3M" === period}
        >
          최근 3달
        </EuiTab>
      </EuiTabs>
      <EuiSpacer size="xl"/>

      <EuiFlexGroup
        direction="column"
      >
        <EuiFlexGroup
          wrap
          gutterSize="l"
        >
          {
            categoryVideos?.recentAdVideos.map((item) => (
              <EuiFlexItem
                grow={false}
                onClick={() => {
                  navigate(`/channels/${item.channelId}`)
                }}
                style={{cursor: "pointer"}}
              >
                <div
                  style={{width: "265px"}}
                >
                  <VideoItem
                    channelThumbnail={item.channelThumbnail}
                    channelName={item.channelName}
                    videoKey={item.videoKey}
                    videoThumbnail={item.thumbnailUrl}
                    videoTitle={item.title}
                    viewCount={item.viewCount}
                    publishedAt={item.publishedAt?.toString() || ""}
                    showChannelName={true}
                    showChannelAvatar={true}
                  />
                </div>
              </EuiFlexItem>
            ))
          }
        </EuiFlexGroup>

        <EuiFlexGroup
          justifyContent="center"
        >
          <EuiFlexItem grow={false}>
            <EuiPagination
              aria-label="page"
              pageCount={categoryVideos?.totalPage || 1}
              activePage={page}
              onPageClick={nextPage => setSearchParams({ period, 'page': `${nextPage}`})}
            />
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiFlexGroup>

    </EuiPageBody>
  )
}

export default CategoryVideos