import {EuiFlexGroup, EuiFlexItem, EuiSpacer} from "@elastic/eui";
import React from "react";
import {useNavigate} from "react-router-dom";
import dayjs from "dayjs";
import {parseCount} from "../util/utils";

interface VideoItemProps {
  channelThumbnail: string
  videoThumbnail: string
  videoTitle: string
  viewCount: number
  publishedAt: string
  showChannelAvatar: boolean
}

const VideoItem = (props: VideoItemProps) => {
  return (
    <div
      style={{ "width": "260px" }}
    >
      <img
        src={props.videoThumbnail}
        width="246"
        height="138"
        alt=""
      />
      <EuiSpacer size="s"/>
      <EuiFlexGroup
        gutterSize="s"
        alignItems="center"
      >
        { props.showChannelAvatar && (
          <EuiFlexItem
            grow={false}
          >
            <img
              src={props.channelThumbnail}
              style={{width: "40px", height: "40px", borderRadius: "20px"}}
            />
          </EuiFlexItem>
        )}
        <EuiFlexItem
          grow={true}
        >
          <div style={{
            lineHeight: "1.2em",
            fontWeight: "bold",
            height: "2.4em",
            overflow: "hidden"
          }}>
            {props.videoTitle}
          </div>
          <div style={{
            marginTop: "8px",
            fontSize: "0.9em",
            color: "#777"}
          }>
            <span>조회수 {parseCount(props.viewCount)}회</span>
            <span style={{margin: "0 4px"}}>·</span>
            <span>{dayjs(props.publishedAt).fromNow()}</span>
          </div>
        </EuiFlexItem>
      </EuiFlexGroup>
    </div>
  )
}

export default VideoItem