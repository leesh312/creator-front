import React from "react";
import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiIcon,
  EuiPageBody,
  EuiPageSection,
  EuiSpacer,
  EuiStat,
  EuiTextColor,
  EuiTitle,
} from "@elastic/eui";
import {useFetchChannel, useFetchReviews, useWriteReview} from "../../api/apis";
import {Link, useNavigate, useParams} from "react-router-dom";
import VideoItem from "../../component/VideoItem";
import ChannelSummaryStats from "./ChannelSummaryStats";
import ChannelDetailReviews from "./ChannelDetailReviews";
import ChannelHeader from "./ChannelHeader";
import ReviewWriteForm, {ReviewWriteFormData} from "./ReviewWriteForm";
import ChannelDetailPlaylist from "./ChannelDetailPlaylist";

function YoutubeChannelDetail() {
  const navigate = useNavigate();
  const {channelId} = useParams()

  const {data: channelData} = useFetchChannel(Number(channelId))
  const {mutate: writeReviewMutate} = useWriteReview()
  const {data: reviews} = useFetchReviews(channelId)

  const onSubmitReview = (data: ReviewWriteFormData) => {
    if (!verifySubmitData(data)) {
      return
    }

    const {summary, text1, score1, text2, score2, text3, score3, text4, score4} = data

    const payload: WriteReviewRequest = {
      target: Number(channelId),
      evalSummary: summary,
      evalText1: text1,
      evalScore1: score1,
      evalText2: text2,
      evalScore2: score2,
      evalText3: text3,
      evalScore3: score3,
      evalText4: text4,
      evalScore4: score4,
    }

    writeReviewMutate(payload, {
      onSuccess: (_) => {
        window.alert("리뷰가 등록되었습니다")
        window.document.location.reload()
      }
    })
  }

  function verifySubmitData(data: ReviewWriteFormData) {
    const {summary, text1, score1, text2, score2, text3, score3, text4, score4,} = data;
    const somethingWritten = !!summary || !!text1 || !!text2 || !!text3 || !!text4 || !!score1 || !!score2 || !!score3 || !!score4
    if (!somethingWritten) {
      window.alert("내용을 한 영역 이상 작성해주세요")
      return false
    }

    return true
  }

  return (
    <>
      <EuiPageBody
        paddingSize="m"
        panelled
        restrictWidth
      >
        <EuiPageSection>
          <ChannelHeader
            channelData={channelData}
          />

          <EuiSpacer/>

          <ChannelSummaryStats
            channelData={channelData}
          />

          <EuiSpacer size="xl"/>
          <EuiSpacer size="xl"/>

          <div style={{width: "600px"}}>
            <ChannelDetailReviews
              reviews={reviews}
            />
          </div>

          <EuiSpacer size="xl"/>
          <EuiSpacer size="xl"/>

          <EuiTitle size="s">
            <h3>
              콜라보 제안
            </h3>
          </EuiTitle>

          <EuiSpacer size="m"/>

          <EuiFlexGroup>
            <EuiFlexItem>
              <EuiStat
                title="브랜디드"
                titleSize="s"
                description={
                  <EuiTextColor color="success">
                  <span>
                    OPEN
                  </span>
                  </EuiTextColor>
                }
                textAlign="left"
              >
                <EuiTextColor color="subdued">
                  <EuiSpacer size="s"/>
                  <div>
                    <EuiIcon type="play" />
                    {" "}
                    영상 1개
                  </div>
                  <EuiSpacer size="xs"/>
                  <div>
                    <EuiIcon type="pin" />
                    {" "}
                    브랜드/제품 집중 광고
                  </div>
                  <EuiSpacer size="xs"/>
                  <div>
                    <EuiIcon type="clock" />
                    {" "}
                    전체 영상의 50% 내외 노출
                  </div>
                </EuiTextColor>
                <EuiSpacer size="s"/>
                <Link to={"#"}>제안하기</Link>
              </EuiStat>
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiStat
                title="PPL"
                titleSize="s"
                description={
                  <EuiTextColor color="success">
                  <span>
                    OPEN
                  </span>
                  </EuiTextColor>
                }
                textAlign="left"
              >
                <EuiTextColor color="subdued">
                  <EuiSpacer size="s"/>
                  <div>
                    <EuiIcon type="play" />
                    {" "}
                    영상 1개
                  </div>
                  <EuiSpacer size="xs"/>
                  <div>
                    <EuiIcon type="pin" />
                    {" "}
                    브랜드/제품 집중 광고
                  </div>
                  <EuiSpacer size="xs"/>
                  <div>
                    <EuiIcon type="clock" />
                    {" "}
                    제품 당 1-2분 노출
                  </div>
                </EuiTextColor>
                <EuiSpacer size="s"/>
                <Link to={"#"}>제안하기</Link>
              </EuiStat>
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiStat
                title="오프라인 행사"
                titleSize="s"
                titleColor="subdued"
                description={
                  <EuiTextColor color="danger">
                  <span>
                    CLOSED
                  </span>
                  </EuiTextColor>
                }
                textAlign="left"
              >
                <EuiTextColor color="subdued">
                  <EuiSpacer size="s"/>
                  <div>
                    <EuiIcon type="play" />
                    {" "}
                    오프라인 행사 1회
                  </div>
                  <EuiSpacer size="xs"/>
                  <div>
                    <EuiIcon type="pin" />
                    {" "}
                    브랜드/제품 현장 구매전환율 증대
                  </div>
                </EuiTextColor>
              </EuiStat>
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiStat
                title="기타 제안"
                titleSize="s"
                titleColor="subdued"
                description={
                  <EuiTextColor color="danger">
                  <span>
                    CLOSED
                  </span>
                  </EuiTextColor>
                }
                textAlign="left"
              >
              </EuiStat>
            </EuiFlexItem>
          </EuiFlexGroup>

          <EuiSpacer size="xl"/>
          <EuiSpacer size="m"/>

          <ChannelDetailPlaylist
            title="인기 동영상"
            isAd={false}
            showChannelAvatar={false}
            videos={channelData?.videoSummary?.recentAdVideos}
          />

          <EuiSpacer size="xl"/>

          <ChannelDetailPlaylist
            title="인기 광고 동영상"
            isAd={false}
            showChannelAvatar={false}
            videos={channelData?.videoSummary?.recentAdVideos}
          />

          <EuiSpacer size="xl"/>
          <EuiSpacer size="xl"/>

          <ChannelDetailPlaylist
            title="최근 동영상"
            isAd={false}
            showChannelAvatar={false}
            videos={channelData?.videoSummary?.recentVideos}
          />

          <EuiSpacer size="xl"/>

          <ChannelDetailPlaylist
            title="최근 광고 동영상"
            isAd={true}
            showChannelAvatar={false}
            videos={channelData?.videoSummary?.recentAdVideos}
          />

          <EuiSpacer size="xl"/>
          <EuiSpacer size="m"/>

          <div style={{width: "600px"}}>
            <EuiTitle size="s">
              <h3>리뷰작성</h3>
            </EuiTitle>
            <EuiSpacer size="m"/>
            <ReviewWriteForm
              onSubmit={onSubmitReview}
            />
          </div>
        </EuiPageSection>
      </EuiPageBody>
    </>
  );
}

export default YoutubeChannelDetail;
