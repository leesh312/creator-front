import {EuiFlexGroup, EuiFlexItem, EuiIcon, EuiSpacer, EuiStat, EuiTextColor} from "@elastic/eui";
import {parseCount, parseRatio} from "../../util/utils";
import React from "react";

const ChannelSummaryStats = ({channelData}: { channelData?: SearchChannelResponseItem }) => {

  return (
    <>
      <EuiFlexGroup>
        <EuiFlexItem>
          <EuiStat
            title={parseCount(Number(channelData?.followerCount)) || "0"}
            description="구독자수"
            textAlign="left"
          >
            {/* TODO <EuiTextColor color="success">*/}
            {/*  <span>*/}
            {/*    한달 3.5% <EuiIcon type="sortUp"/>*/}
            {/*  </span>*/}
            {/*</EuiTextColor>*/}
          </EuiStat>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiStat
            title={parseCount(channelData?.contentsCount || 0)}
            description="동영상"
            textAlign="left"
          >
            {/* TODO <EuiTextColor color="success">*/}
            {/*  <span>*/}
            {/*    한달 평균 8.2개*/}
            {/*  </span>*/}
            {/*</EuiTextColor>*/}
          </EuiStat>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiStat
            title={parseCount(channelData?.avgViewCount || 0)}
            description="평균 조회수"
            textAlign="left"
          >

          </EuiStat>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiStat
            title={parseRatio(channelData?.avgViewRatio || 0)}
            description="조회수/구독자수"
            textAlign="left"
          >
            {/* TODO <EuiTextColor color="success">*/}
            {/*  <span>*/}
            {/*    참여율 높음*/}
            {/*  </span>*/}
            {/*</EuiTextColor>*/}
          </EuiStat>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiStat
            title={parseRatio(channelData?.avgCommentRatio || 0)}
            description="댓글/조회수"
            textAlign="left"
          >
            {/* TODO <EuiTextColor color="success">*/}
            {/*  <span>*/}
            {/*    참여율 매우 높음*/}
            {/*  </span>*/}
            {/*</EuiTextColor>*/}
          </EuiStat>
        </EuiFlexItem>
      </EuiFlexGroup>

      <EuiSpacer size="m" />

      <EuiFlexGroup>
        <EuiFlexItem>
          <EuiStat
            title=""
            description=""
            textAlign="left"
          >
          </EuiStat>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiStat
            title={parseCount(channelData?.totalAdCount || 0)}
            description="최근 광고 영상"
            textAlign="left"
          >
          </EuiStat>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiStat
            title={parseCount(channelData?.avgAdViewCount || 0)}
            description="광고 평균 조회수"
            textAlign="left"
          >

          </EuiStat>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiStat
            title={parseRatio(channelData?.avgAdViewRatio || 0)}
            description="광고 조회수/구독자수"
            textAlign="left"
          >
            {/* TODO <EuiTextColor color="success">*/}
            {/*  <span>*/}
            {/*    참여율 높음*/}
            {/*  </span>*/}
            {/*</EuiTextColor>*/}
          </EuiStat>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiStat
            title={parseRatio(channelData?.avgAdCommentRatio || 0)}
            description="광고 댓글/조회수"
            textAlign="left"
          >
            {/* TODO <EuiTextColor color="success">*/}
            {/*  <span>*/}
            {/*    참여율 매우 높음*/}
            {/*  </span>*/}
            {/*</EuiTextColor>*/}
          </EuiStat>
        </EuiFlexItem>
      </EuiFlexGroup>
    </>
  )
}

export default ChannelSummaryStats