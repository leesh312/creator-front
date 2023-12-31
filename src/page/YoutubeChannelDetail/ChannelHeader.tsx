import {EuiAvatar, EuiFlexGroup, EuiFlexItem, EuiSpacer, EuiText, EuiTextColor, EuiTitle} from "@elastic/eui";
import React from "react";
import {Dot} from "../../component/VideoItem";
import {parseCountry} from "../../util/utils";
import lodash from "lodash";

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
            {parseCountry(channelData?.country)}
            <Dot/>
            {!!channelData && !!channelData.tags && lodash.chain(channelData.tags).split(",").take(4).map((tag: string) => (
                <>
                  <EuiTextColor color="subdued">
                    #{tag}
                  </EuiTextColor>
                  {" "}
                </>
              )
            ).value()}
          </EuiTextColor>
          <EuiSpacer size="xs" />
          <pre style={{ background: "#f7f8fc", padding: "12px", borderRadius: "4px", fontSize: "12px", maxHeight: "80px", overflow: "hidden" }}>
            {channelData?.description}
          </pre>
        </EuiFlexGroup>
      </EuiFlexItem>
      <EuiFlexItem>
      </EuiFlexItem>
    </EuiFlexGroup>
  )
}

export default ChannelHeader