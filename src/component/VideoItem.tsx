import {EuiFlexGroup, EuiFlexItem, EuiSpacer} from "@elastic/eui";
import React from "react";
import {useNavigate} from "react-router-dom";
import dayjs from "dayjs";
import {parseCount} from "../util/utils";

interface VideoItemProps {
  channelThumbnail?: string
  channelName?: string
  videoThumbnail: string
  videoKey: string
  videoTitle: string
  viewCount: number
  commentCount?: number
  publishedAt: string
  showChannelAvatar?: boolean
  showChannelName?: boolean
  onChannelClick?: VoidFunction
}

const VideoItem = (props: VideoItemProps) => {
  return (
    <div
      style={{"width": "220px"}}
    >
      <a
        href={`https://www.youtube.com/watch?v=${props.videoKey}`}
        target="_blank"
      >
        <img
          src={props.videoThumbnail}
          width="220"
          height="124"
          alt=""
          style={{"borderRadius": "4px"}}
        />
      </a>
      <EuiSpacer size="s"/>
      <EuiFlexGroup
        gutterSize="s"
        alignItems="center"
      >
        {props.showChannelAvatar && (
          <EuiFlexItem
            grow={false}
          >
            <img
              src={props.channelThumbnail}
              style={{width: "40px", height: "40px", borderRadius: "20px"}}
              onClick={props.onChannelClick}
            />
          </EuiFlexItem>
        )}
        <EuiFlexItem
          grow={true}
        >
          <a
            href={`https://www.youtube.com/watch?v=${props.videoKey}`}
            target="_blank"
          >
            <div style={{
              lineHeight: "1.2em",
              fontWeight: "bold",
              height: "2.4em",
              overflow: "hidden"
            }}>
              {props.videoTitle}
            </div>
          </a>
          <div style={{
            fontSize: "0.9em",
            color: "#666"
          }
          }>
            {props.showChannelName && (
              <div
                style={{marginTop: "8px", fontWeight: "bold"}}
                onClick={props.onChannelClick}
              >
                {props.channelName}
              </div>
            )}
            <div style={{marginTop: "4px"}}>
              <span>조회수 {parseCount(props.viewCount)}회</span>
              <Dot/>
              <span>{dayjs(props.publishedAt).fromNow()}</span>
              {props.commentCount && props.commentCount > 0 && (
                <>
                  <Dot/>
                  <span>댓글 {props.commentCount}</span>
                </>
              )}
            </div>
          </div>
        </EuiFlexItem>
      </EuiFlexGroup>
    </div>
  )
}

export const Dot = () => {
  return (
    <span style={{margin: "0 4px"}}>·</span>
  )
}

export default VideoItem