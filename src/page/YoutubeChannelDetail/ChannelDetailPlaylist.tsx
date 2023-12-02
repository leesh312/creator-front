import {EuiFlexGroup, EuiFlexItem, EuiSpacer, EuiTitle} from "@elastic/eui";
import VideoItem from "../../component/VideoItem";
import React from "react";
import {useNavigate} from "react-router-dom";
import {AdBadge} from "../../component/Misc";

interface Props {
  title: string
  isAd: boolean
  showChannelAvatar: boolean
  videos?: VideoSummaryResponseItem[]
}

const ChannelDetailPlaylist = ({title, isAd, showChannelAvatar, videos}: Props) => {
  return (
    <>
      <EuiFlexGroup
        gutterSize="xs"
      >
        <EuiTitle size="s">
          <h3>
            {title}
          </h3>
        </EuiTitle>
        {isAd && (
          <AdBadge />
        )}
      </EuiFlexGroup>

      <EuiSpacer size="m"/>

      <EuiFlexGroup
        wrap
        gutterSize="m"
      >
        {videos && videos?.map((item) => {
          return (
            <a
              href={`https://www.youtube.com/watch?v=${item.videoKey}`}
              target="_blank"
            >
              <EuiFlexItem
                grow={false}
                style={{cursor: "pointer"}}
              >
                <VideoItem
                  channelThumbnail={""}
                  videoThumbnail={item.thumbnailUrl}
                  videoTitle={item.title}
                  viewCount={item.viewCount}
                  publishedAt={item.publishedAt?.toString() || ""}
                  showChannelAvatar={showChannelAvatar}
                />
              </EuiFlexItem>
            </a>
          )
        })}
      </EuiFlexGroup>
    </>
  )
}

export default ChannelDetailPlaylist;