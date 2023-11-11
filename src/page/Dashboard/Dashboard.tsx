import {
  EuiButton,
  EuiButtonEmpty,
  EuiFieldText,
  EuiFlexGroup, EuiFlexItem,
  EuiForm,
  EuiFormRow,
  EuiPageBody,
  EuiPageSection,
  EuiSpacer,
  EuiTitle
} from "@elastic/eui";
import React, {useRef, useState} from "react";
import {useSignin} from "../../api/apis";
import {useNavigate} from "react-router-dom";

const drinkCategory = [
  {
    channelThumbnail: "https://yt3.googleusercontent.com/ytc/APkrFKZw7QYtLji9hNDyeBgFMtGN-gUMXythGeqcEQMSdQ=s176-c-k-c0x00ffffff-no-rj",
    videoThumbnail: "https://i.ytimg.com/vi/xT2nV3fzIMI/hqdefault.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBQAAhcmqBbDKMJMEK1EqpykbIniw",
    videoTitle: "음료회사 직원분들 음료 뿜게 만들었던 마케팅팀 신입사원 최종합격 PT발표 공개합니다 | 미미미생 ep.12",
  },
  {
    channelThumbnail: "https://yt3.ggpht.com/Dbq4i6Jea2PTPR_n5-VBgBXNcfmJ7VH8Z7SkgQk21n9qQMh1IVLY2-nsxLL1V_kyyT_UyChMZQ=s48-c-k-c0x00ffffff-no-rj",
    videoThumbnail: "https://i.ytimg.com/vi/oc5X0o0AQ8w/hqdefault.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLA-oWE6zvx_NCAZck6Q5YnZkjIKWQ",
    videoTitle: "[#스프라이트] 더울 땐 뭐다? 스프라이트! - Full",
  },
  {
    channelThumbnail: "https://yt3.ggpht.com/ulXLca0picDWWpU_RvZD0Vpw5Za7BxOOzJK0RhvOBlnkBfZCWCetLjEQODycQ1uF033WJQ6x-w=s48-c-k-c0x00ffffff-no-rj",
    videoThumbnail: "https://i.ytimg.com/vi/CzuA_rQjdkc/hqdefault.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAXDEJQan_-2jlO-Y2zc5tufuN83w",
    videoTitle: "비비와 함께 무한탄산 무한텐션❗ 클룹 제로소다 런칭🍇🍑🍍 (Full ver.)",
  },
  {
    channelThumbnail: "https://yt3.ggpht.com/ytc/APkrFKaGR43PuO_IRePdcOaw1fm8FA4U7fBGcrD4GuBy8A=s48-c-k-c0x00ffffff-no-rj",
    videoThumbnail: "https://i.ytimg.com/vi/1vIhPbOfGws/hqdefault.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCCrRi10YpUgMQg3K7D3vaF6lsi-g",
    videoTitle: "2023 포카리스웨트 TVC 모든 오늘을 파랑해 60s _오예주",
  },
  {
    channelThumbnail: "https://yt3.ggpht.com/ytc/APkrFKbAtPFAkLGX8Uhd9nHN3vBASAjwkus3N1dnb6ZoPg=s48-c-k-c0x00ffffff-no-rj",
    videoThumbnail: "https://i.ytimg.com/vi/o3P7lKQopWI/hqdefault.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBdObp_-DWG7Ovbh9ijHwcCnqzHwg",
    videoTitle: "2019_ 팔도 뽀로로 크~하song",
  }
]

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <EuiPageBody paddingSize="none" panelled>
      <EuiPageSection>
        <EuiTitle>
          <h2>대시보드</h2>
        </EuiTitle>

        <EuiSpacer size="xl"/>

        <EuiTitle size="s">
          <h3>`음료` 카테고리의 새 광고 영상</h3>
        </EuiTitle>

        <EuiSpacer/>

        <EuiFlexGroup
          wrap
          gutterSize="m"
        >
          {drinkCategory.map((item) => {
            return (
              <EuiFlexItem
                grow={false}
              >
                <img
                  src={item.videoThumbnail}
                  width="246"
                  height="138"
                  alt=""
                />
                <EuiSpacer size="s"/>
                <EuiFlexGroup
                  gutterSize="s"
                  alignItems="center"
                >
                  <EuiFlexItem
                    grow={false}
                  >
                    <img
                      src={item.channelThumbnail}
                      style={{width: "40px", height: "40px", borderRadius: "20px"}}
                    />
                  </EuiFlexItem>
                  <EuiFlexItem>
                    <div style={{
                      lineHeight: "1.2em",
                      fontWeight: "bold",
                      height: "2.4em",
                      width: "180px",
                      overflow: "hidden"
                    }}>
                      {item.videoTitle}
                    </div>
                    <div style={{
                      marginTop: "8px",
                      fontSize: "0.9em",
                      color: "#777"}
                    }>
                      <span>조회수 123회</span>
                      <span style={{margin: "0 4px"}}>·</span>
                      <span>3일전</span>
                    </div>
                  </EuiFlexItem>
                </EuiFlexGroup>
              </EuiFlexItem>
            )
          })}
        </EuiFlexGroup>
      </EuiPageSection>
    </EuiPageBody>
  )
}

export default Dashboard