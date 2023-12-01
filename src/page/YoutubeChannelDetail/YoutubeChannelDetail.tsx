import React, {ReactNode, useEffect, useState} from "react";
import {
  EuiPage, EuiPageBody, EuiPageSection, EuiPageSidebar, EuiSideNav, EuiIcon, slugify, EuiHeader,
  EuiHeaderLogo,
  EuiHeaderSectionItem,
  EuiHeaderSectionItemButton,
  EuiAvatar,
  EuiMarkdownEditor,
  EuiHeaderSection,
  EuiFieldSearch,
  EuiFlexGroup,
  EuiFlexItem,
  EuiTitle,
  EuiStat,
  EuiSpacer,
  EuiCard,
  EuiDescriptionList,
  EuiTextArea,
  EuiDescribedFormGroup,
  EuiButton,
  EuiFormRow,
  EuiTextColor,
} from "@elastic/eui";
import {useWriteReview, useFetchChannel, useSearch, useFetchReviews} from "../../api/apis";
import _ from "lodash"
import {Link, useNavigate, useParams} from "react-router-dom";
import SideNav from "../../layout/SideNav";
import axios from "axios";
import VideoItem from "../../component/VideoItem";
import {parseCount} from "../../util/utils";
import ChannelSummaryStats from "./ChannelSummaryStats";
import ChannelDetailReviews, {NegativeStar, PositiveStar} from "./ChannelDetailReviews";
import ChannelHeader from "./ChannelHeader";

function YoutubeChannelDetail() {
  const navigate = useNavigate();
  const {channelId} = useParams()
  const [value, setValue] = useState("");
  const [youtubeChannelId, setYoutubeChannelId] = useState("")

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
      onSuccess: (data) => {
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

          <EuiTitle size="s">
            <h3>최근 동영상</h3>
          </EuiTitle>

          <EuiSpacer size="m"/>

          <EuiFlexGroup
            wrap
            gutterSize="m"
          >
            {channelData && channelData.videoSummary?.recentVideos?.map((item) => {
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
                      commentCount={item.commentCount}
                      viewCount={item.viewCount}
                      publishedAt={item.publishedAt?.toString() || ""}
                      showChannelAvatar={false}
                    />
                  </EuiFlexItem>
                </a>
              )
            })}
          </EuiFlexGroup>

          <EuiSpacer size="xl"/>

          <EuiFlexGroup
            gutterSize="xs"
          >
            <EuiTitle size="s">
              <h3>
                최근 광고 동영상
              </h3>
            </EuiTitle>

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
          </EuiFlexGroup>

          <EuiSpacer size="m"/>

          <EuiFlexGroup
            wrap
            gutterSize="m"
          >
            {channelData && channelData.videoSummary?.recentAdVideos?.map((item) => {
              return (
                <a
                  href={`https://www.youtube.com/watch?v=${item.videoKey}`}
                  target="_blank"
                >
                  <EuiFlexItem
                    grow={false}
                    onClick={() => {
                      navigate(`/channels/${channelId}`)
                    }}
                    style={{cursor: "pointer"}}
                  >
                    <VideoItem
                      channelThumbnail={""}
                      videoThumbnail={item.thumbnailUrl}
                      videoTitle={item.title}
                      viewCount={item.viewCount}
                      publishedAt={item.publishedAt?.toString() || ""}
                      showChannelAvatar={false}
                    />
                  </EuiFlexItem>
                </a>
              )
            })}
          </EuiFlexGroup>

          <EuiSpacer size="xl"/>
          <EuiSpacer size="m"/>

          <EuiTitle size="s">
            <h3>인기 동영상</h3>
          </EuiTitle>

          <EuiSpacer size="m"/>

          <EuiFlexGroup
            wrap
            gutterSize="m"
          >
            {channelData && channelData.videoSummary?.popularVideos?.map((item) => {
              return (
                <a
                  href={`https://www.youtube.com/watch?v=${item.videoKey}`}
                  target="_blank"
                >
                  <EuiFlexItem
                    grow={false}
                    onClick={() => {
                      navigate(`/channels/${channelId}`)
                    }}
                    style={{cursor: "pointer"}}
                  >
                    <VideoItem
                      channelThumbnail={""}
                      videoThumbnail={item.thumbnailUrl}
                      videoTitle={item.title}
                      viewCount={item.viewCount}
                      publishedAt={item.publishedAt?.toString() || ""}
                      showChannelAvatar={false}
                    />
                  </EuiFlexItem>
                </a>
              )
            })}
          </EuiFlexGroup>

          <EuiSpacer size="xl"/>

          <EuiFlexGroup
            gutterSize="xs"
          >
            <EuiTitle size="s">
              <h3>
                인기 광고 동영상
              </h3>
            </EuiTitle>
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
          </EuiFlexGroup>

          <EuiSpacer size="m"/>

          <EuiFlexGroup
            wrap
            gutterSize="m"
          >
            {channelData && channelData.videoSummary?.popularAdVideos?.map((item) => {
              return (
                <a
                  href={`https://www.youtube.com/watch?v=${item.videoKey}`}
                  target="_blank"
                >
                  <EuiFlexItem
                    grow={false}
                    onClick={() => {
                      navigate(`/channels/${channelId}`)
                    }}
                    style={{cursor: "pointer"}}
                  >
                    <VideoItem
                      channelThumbnail={""}
                      videoThumbnail={item.thumbnailUrl}
                      videoTitle={item.title}
                      viewCount={item.viewCount}
                      publishedAt={item.publishedAt?.toString() || ""}
                      showChannelAvatar={false}
                    />
                  </EuiFlexItem>
                </a>
              )
            })}
          </EuiFlexGroup>

          <EuiSpacer size="xl"/>
          <EuiSpacer size="xl"/>

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

interface ReviewWriteFormData {
  summary: string
  text1?: string
  score1?: number
  text2?: string
  score2?: number
  text3?: string
  score3?: number
  text4?: string
  score4?: number
}

const ReviewWriteForm = ({
                           onSubmit
                         }: {
  onSubmit?: (data: ReviewWriteFormData) => void
}) => {
  const navigate = useNavigate();
  const [summary, setSummary] = useState("")
  const [text1, setText1] = useState("")
  const [score1, setScore1] = useState<number | undefined>(undefined)
  const [text2, setText2] = useState("")
  const [score2, setScore2] = useState<number | undefined>(undefined)
  const [text3, setText3] = useState("")
  const [score3, setScore3] = useState<number | undefined>(undefined)
  const [text4, setText4] = useState("")
  const [score4, setScore4] = useState<number | undefined>(undefined)

  const onClick = () => {
    if (!onSubmit)
      return

    onSubmit({summary, text1, text2, text3, text4, score1, score2, score3, score4})
  }

  const onFocusTextArea = () => {
    const hasAuth = !!axios.defaults.headers.Authorization
    if (!hasAuth) {
      window.alert("로그인 후 리뷰를 작성할 수 있습니다")
      navigate("/signin")
    }
  }

  return (
    <>
      <EuiFormRow label="인플루언서 종합평가" fullWidth>
        <EuiTextArea
          placeholder=""
          aria-label=""
          value={summary}
          onChange={(e) => {
            setSummary(e.target.value)
          }}
          onFocus={onFocusTextArea}
          fullWidth
          compressed
        />
      </EuiFormRow>
      <EuiFormRow
        label={
          <>
            커뮤니케이션
            <span style={{"verticalAlign": "text-bottom", "marginLeft": "8px"}}>
            {[1, 2, 3, 4, 5].map((i) => {
              const value = !!score1 && score1 >= i
              const onClick = () => {
                setScore1(i)
              }
              return value ? <PositiveStar onClick={onClick}/> : <NegativeStar onClick={onClick}/>
            })}
          </span>
          </>
        } fullWidth>
        <EuiTextArea
          placeholder=""
          aria-label=""
          value={text1}
          onChange={(e) => {
            setText1(e.target.value)
          }}
          onFocus={onFocusTextArea}
          fullWidth
          compressed
        />
      </EuiFormRow>
      <EuiFormRow label={
        <>
          제품 이해도
          <span style={{"verticalAlign": "text-bottom", "marginLeft": "8px"}}>
            {[1, 2, 3, 4, 5].map((i) => {
              const value = !!score2 && score2 >= i
              const onClick = () => {
                setScore2(i)
              }
              return value ? <PositiveStar onClick={onClick}/> : <NegativeStar onClick={onClick}/>
            })}
          </span>
        </>
      } fullWidth>
        <EuiTextArea
          placeholder=""
          aria-label=""
          value={text2}
          onChange={(e) => {
            setText2(e.target.value)
          }}
          onFocus={onFocusTextArea}
          fullWidth
          compressed
        />
      </EuiFormRow>
      <EuiFormRow label={
        <>
          피드백 수용도
          <span style={{"verticalAlign": "text-bottom", "marginLeft": "8px"}}>
            {[1, 2, 3, 4, 5].map((i) => {
              const value = !!score3 && score3 >= i
              const onClick = () => {
                setScore3(i)
              }
              return value ? <PositiveStar onClick={onClick}/> : <NegativeStar onClick={onClick}/>
            })}
          </span>
        </>
      } fullWidth>
        <EuiTextArea
          placeholder=""
          aria-label=""
          value={text3}
          onChange={(e) => {
            setText3(e.target.value)
          }}
          onFocus={onFocusTextArea}
          fullWidth
          compressed
        />
      </EuiFormRow>
      <EuiFormRow label={
        <>
          광고효율
          <span style={{"verticalAlign": "text-bottom", "marginLeft": "8px"}}>
            {[1, 2, 3, 4, 5].map((i) => {
              const value = !!score4 && score4 >= i
              const onClick = () => {
                setScore4(i)
              }
              return value ? <PositiveStar onClick={onClick}/> : <NegativeStar onClick={onClick}/>
            })}
          </span>
        </>
      } fullWidth>
        <EuiTextArea
          placeholder=""
          aria-label=""
          value={text4}
          onChange={(e) => {
            setText4(e.target.value)
          }}
          onFocus={onFocusTextArea}
          fullWidth
          compressed
        />
      </EuiFormRow>
      <EuiSpacer/>
      <EuiFlexGroup
        responsive={false}
        gutterSize="m"
        alignItems="center"
        justifyContent="flexEnd"
      >
        <EuiFlexItem grow={false}>
          채널과의 광고 협업에 대한 리뷰를 객관적인 시각에서 적어주세요
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiButton
            color={undefined}
            fill
            onClick={onClick}
          >
            작성
          </EuiButton>
        </EuiFlexItem>
      </EuiFlexGroup>
    </>
  )
}
export default YoutubeChannelDetail;
