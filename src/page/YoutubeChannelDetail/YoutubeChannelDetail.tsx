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
} from "@elastic/eui";
import {useWriteReview, useFetchChannel, useSearch, useFetchReviews} from "../../api/apis";
import _ from "lodash"
import {useNavigate, useParams} from "react-router-dom";
import SideNav from "../../layout/SideNav/SideNav";

const PositiveStar = ({ onClick } : { onClick?: VoidFunction}) => (<EuiIcon type="starFilled" onClick={onClick} style={{"color": "#fec514"}}/>)
const NegativeStar = ({ onClick } : { onClick?: VoidFunction}) => (<EuiIcon type="starFilled" onClick={onClick} style={{"color": "#abb4c4"}}/>)

function YoutubeChannelDetail() {
  const navigate = useNavigate();
  const {channelId} = useParams()
  const [value, setValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("")
  const [youtubeChannelId, setYoutubeChannelId] = useState("")
  const { data: searchResult } = useSearch(searchQuery)
  const { data: channelData } = useFetchChannel(youtubeChannelId)
  const { mutate: writeReviewMutate } = useWriteReview()
  const { data: reviews } = useFetchReviews(channelId)

  console.log("channelData", searchResult)
  console.log("reviews", reviews)

  useEffect(() => {
    if (searchResult && searchResult.items.length === 1) {
      const item = searchResult.items[0]
      navigate(`/channels/${item.channelId}`)
    }
  }, [searchResult])

  const onChangeSearchbar = (e: string) => {
    setSearchQuery(e)
  }

  const onSubmitReview = (data: ReviewWriteFormData) => {
    const { summary, text1, score1, text2, score2, text3, score3, text4, score4, } = data;
    const somethingWritten = !!summary || !!text1 || !!text2 || !!text3 || !!text4 || !!score1 || !!score2 || !!score3 || !!score4
    if (!somethingWritten) {
      window.alert("내용을 하나라도 작성해주세요")
      return
    }

    const payload: WriteReviewRequest = {
      target: 1,
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

    writeReviewMutate(payload)
  }

  const renderStars = (score?: number, onClick?: VoidFunction) => {
    return [1, 2, 3, 4, 5].map((i) => {
      const value = !!score && score >= i
      return value ? <PositiveStar onClick={onClick} /> : <NegativeStar onClick={onClick} />
    })
  }

  const createReviewValues = (review: Review) : Array<{
    title: NonNullable<ReactNode>;
    description: NonNullable<ReactNode>;
  }> => {

    return [
      {
        title: '커뮤니케이션',
        description: <>
          <div>
            { renderStars(review.evalScore1) }
          </div>
          { !!review.evalText1 && (
            <>
              <EuiSpacer size="s"/>
              <div>
                {review.evalText1}
              </div>
            </>
          )}
        </>,
      },
      {
        title: '제품 이해도',
        description: <>
          <div>
            { renderStars(review.evalScore2) }
          </div>
          { !!review.evalText2 && (
            <>
              <EuiSpacer size="s"/>
              <div>
                {review.evalText2}
              </div>
            </>
          )}
        </>,
      },
      {
        title: '피드백 수용도',
        description: <>
          <div>
            { renderStars(review.evalScore3) }
          </div>
          { !!review.evalText3 && (
            <>
              <EuiSpacer size="s"/>
              <div>
                {review.evalText3}
              </div>
            </>
          )}
        </>,
      },
      {
        title: '광고효율',
        description: <>
          <div>
            { renderStars(review.evalScore4) }
          </div>
          { !!review.evalText4 && (
            <>
              <EuiSpacer size="s"/>
              <div>
                {review.evalText4}
              </div>
            </>
          )}
        </>,
      },
    ]
  }
  return (
    <div className="App">
      <EuiHeader
      >
        <EuiHeaderSection
          grow
        >
          <EuiHeaderSectionItem>
            <EuiHeaderLogo>Creators Club</EuiHeaderLogo>
          </EuiHeaderSectionItem>
          <EuiHeaderSectionItem
          >
            <EuiFieldSearch
              placeholder="인플루언서/분야 검색"
              isClearable
              aria-label="Use aria labels when no actual label is in use"
              fullWidth
              onSearch={onChangeSearchbar}
            />
          </EuiHeaderSectionItem>

        </EuiHeaderSection>
        <EuiHeaderSectionItem>

          <EuiHeaderSectionItemButton disabled aria-label="Sitewide search">
            <EuiIcon type="search" size="m"/>
          </EuiHeaderSectionItemButton>

          <EuiHeaderSectionItemButton disabled aria-label="Account menu">
            <EuiAvatar isDisabled name="John Username" size="s"/>
          </EuiHeaderSectionItemButton>

          <EuiHeaderSectionItemButton
            disabled
            aria-label="Apps menu with 1 new app"
            notification="1"
          >
            <EuiIcon type="apps" size="m"/>
          </EuiHeaderSectionItemButton>
        </EuiHeaderSectionItem>
      </EuiHeader>
      <EuiPage
        paddingSize="none"
        restrictWidth
        grow
      >
        <SideNav />
        <EuiPageBody paddingSize="none" panelled>
          <EuiPageSection>
            <EuiFlexGroup>
              <EuiFlexItem
                grow={false}
              >
                <EuiAvatar
                  size="xl"
                  name=""
                  imageUrl={channelData?.snippet?.thumbnails?.medium?.url || ""}
                />
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiTitle size="m">
                  <h3>{channelData?.snippet?.title}</h3>
                </EuiTitle>
              </EuiFlexItem>
              <EuiFlexItem>
              </EuiFlexItem>
            </EuiFlexGroup>
            <EuiSpacer />
            <EuiFlexGroup>
              <EuiFlexItem>
                <EuiStat
                  title={channelData?.statistics?.subscriberCount || "0"}
                  description="구독자 수"
                  textAlign="left"
                />
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiStat
                  title={channelData?.statistics?.videoCount || "0"}
                  description="동영상"
                  textAlign="left"
                />
              </EuiFlexItem>
            </EuiFlexGroup>

            <EuiSpacer size="xl"/>

            <EuiTitle size="xs">
              <h3>리뷰</h3>
            </EuiTitle>
            <EuiSpacer size="xs" />
            { reviews?.map((review) => (
              <>
                <EuiCard
                  textAlign="left"
                  title={""}
                  titleSize="xs"
                  hasBorder
                >
                  { !!review.evalSummary && (
                    <>
                      {review.evalSummary}
                      <EuiSpacer />
                    </>
                  )}
                  <EuiDescriptionList
                    type="column"
                    align={"left"}
                    compressed
                    listItems={createReviewValues(review)}
                  />
                </EuiCard>
                <EuiSpacer/>
              </>
            ))}
            <EuiTitle size="s">
              <h3>리뷰작성</h3>
            </EuiTitle>
            <EuiSpacer size="m" />
            <ReviewWriteForm
              onSubmit={onSubmitReview}
            />
          </EuiPageSection>
        </EuiPageBody>
      </EuiPage>
    </div>
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

const ReviewWriteForm = ({ onSubmit } : { onSubmit?: (data: ReviewWriteFormData) => void}) => {
  const [ summary, setSummary ] = useState("")
  const [ text1, setText1 ] = useState("")
  const [ score1, setScore1 ] = useState<number | undefined>(undefined)
  const [ text2, setText2 ] = useState("")
  const [ score2, setScore2 ] = useState<number | undefined>(undefined)
  const [ text3, setText3 ] = useState("")
  const [ score3, setScore3 ] = useState<number | undefined>(undefined)
  const [ text4, setText4 ] = useState("")
  const [ score4, setScore4 ] = useState<number | undefined>(undefined)

  const onClick = () => {
    if (!onSubmit)
      return

    onSubmit({ summary, text1, text2, text3, text4, score1, score2, score3, score4})
  }

  return (
    <>
      <EuiFormRow label="인플루언서 종합평가" fullWidth>
        <EuiTextArea
          placeholder=""
          aria-label=""
          value={summary}
          onChange={(e) => { setSummary(e.target.value)}}
          fullWidth
          compressed
        />
      </EuiFormRow>
      <EuiFormRow label={
        <>
          커뮤니케이션
          <span style={{ "verticalAlign": "text-bottom", "marginLeft": "8px" }}>
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
          fullWidth
          compressed
        />
      </EuiFormRow>
      <EuiFormRow label={
        <>
          제품 이해도
          <span style={{ "verticalAlign": "text-bottom", "marginLeft": "8px" }}>
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
          fullWidth
          compressed
        />
      </EuiFormRow>
      <EuiFormRow label={
        <>
          피드백 수용도
          <span style={{ "verticalAlign": "text-bottom", "marginLeft": "8px" }}>
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
          fullWidth
          compressed
        />
      </EuiFormRow>
      <EuiFormRow label={
        <>
          광고효율
          <span style={{ "verticalAlign": "text-bottom", "marginLeft": "8px" }}>
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
          fullWidth
          compressed
        />
      </EuiFormRow>
      <EuiSpacer />
      <EuiFlexGroup
        responsive={false}
        gutterSize="s"
        alignItems="center"
        justifyContent="flexEnd"
      >
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