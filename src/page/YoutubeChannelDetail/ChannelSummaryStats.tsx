import {EuiFlexGroup, EuiFlexItem, EuiIcon, EuiStat, EuiTextColor} from "@elastic/eui";
import {parseCount} from "../../util/utils";
import React from "react";

const ChannelSummaryStats = ({channelData}: { channelData?: SearchChannelResponseItem }) => {

  return (
    <EuiFlexGroup>
      <EuiFlexItem>
        <EuiStat
          title={parseCount(Number(channelData?.followerCount)) || "0"}
          description="구독자수"
          textAlign="left"
        >
          <EuiTextColor color="success">
            <span>
              한달 3.5% <EuiIcon type="sortUp"/>
            </span>
          </EuiTextColor>
        </EuiStat>
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiStat
          title={channelData?.contentsCount || "0"}
          description="동영상"
          textAlign="left"
        >
          <EuiTextColor color="success">
            <span>
              한달 평균 8.2개
            </span>
          </EuiTextColor>
        </EuiStat>
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiStat
          title={"102만"}
          description="평균 조회수"
          textAlign="left"
        >

        </EuiStat>
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiStat
          title={"25.6%"}
          description="조회수/구독자수"
          textAlign="left"
        >
          <EuiTextColor color="success">
                  <span>
                    참여율 높음
                  </span>
          </EuiTextColor>
        </EuiStat>
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiStat
          title={"5.3%"}
          description="댓글/구독자수"
          textAlign="left"
        >
          <EuiTextColor color="success">
                  <span>
                    참여율 매우 높음
                  </span>
          </EuiTextColor>
        </EuiStat>
      </EuiFlexItem>
    </EuiFlexGroup>
  )
}

export default ChannelSummaryStats