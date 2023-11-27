import {EuiAvatar, EuiFlexGroup, EuiFlexItem, EuiText, EuiTextColor, EuiTitle} from "@elastic/eui";
import React from "react";
import {Dot} from "../../component/VideoItem";

const ChannelHeader = ({ channelData } : { channelData?: SearchChannelResponseItem }) => {

  return (
    <EuiFlexGroup>
      <EuiFlexItem
        grow={false}
      >
        <EuiAvatar
          size="xl"
          name=""
          imageUrl={channelData?.thumbnailUrl || ""}
        />
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiFlexGroup
          direction="column"
          gutterSize="xs"
        >
          <EuiTitle size="m">
            <h3>{channelData?.name}</h3>
          </EuiTitle>
          <EuiTextColor color="subdued">
            대한민국
            <Dot />
            유튜버
          </EuiTextColor>
        </EuiFlexGroup>
      </EuiFlexItem>
      <EuiFlexItem>
      </EuiFlexItem>
    </EuiFlexGroup>
  )
}

export default ChannelHeader