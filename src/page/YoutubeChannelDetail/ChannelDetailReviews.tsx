import {
  EuiBadge,
  EuiCard,
  EuiDescriptionList,
  EuiFlexGroup,
  EuiFlexItem,
  EuiIcon,
  EuiSpacer,
  EuiTextColor,
  EuiTitle
} from "@elastic/eui";
import React, {ReactNode} from "react";
import {Dot} from "../../component/VideoItem";
import {Link} from "react-router-dom";

export const ChannelDetailReviews = ({ reviews } : { reviews?: Review[] }) => {
  return (
    <>
      <EuiTitle size="s">
        <h3>
          광고주의 리뷰
        </h3>
      </EuiTitle>

      <EuiSpacer size="l"/>

      {reviews?.map((review) => (
        <>
          <EuiCard
            textAlign="left"
            title={review.evalSummary || ""}
            titleSize="xs"
            paddingSize="m"
          >
            <EuiFlexGroup>
              <EuiFlexItem
                grow
              >
                <EuiTextColor color="subdued">
                  2023/04 협업
                  <Dot />
                  PPL
                </EuiTextColor>
              </EuiFlexItem>
              <EuiFlexItem
                grow={false}
              >
                <EuiBadge color="hollow">
                  채널 추천
                </EuiBadge>
              </EuiFlexItem>
            </EuiFlexGroup>
            <EuiSpacer/>
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
      {reviews !== undefined && reviews.length === 0 && (
        <>
          <EuiSpacer size="m"/>
          <div>등록된 리뷰가 없습니다</div>
          <EuiSpacer size="xl"/>
        </>
      )}
    </>
  )
}

export const PositiveStar = ({onClick}: { onClick?: VoidFunction }) => (
  <EuiIcon type="starFilled" onClick={onClick} style={{"color": "#fec514"}}/>)
export const NegativeStar = ({onClick}: { onClick?: VoidFunction }) => (
  <EuiIcon type="starFilled" onClick={onClick} style={{"color": "#abb4c4"}}/>)


const renderStars = (score?: number, onClick?: VoidFunction) => {
  return [1, 2, 3, 4, 5].map((i) => {
    const value = !!score && score >= i
    return value ? <PositiveStar onClick={onClick}/> : <NegativeStar onClick={onClick}/>
  })
}

const createReviewValues = (review: Review): Array<{
  title: NonNullable<ReactNode>;
  description: NonNullable<ReactNode>;
}> => {
  return [
    {
      title: '커뮤니케이션',
      description: <>
        <div>
          {renderStars(review.evalScore1)}
        </div>
        {!!review.evalText1 && (
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
          {renderStars(review.evalScore2)}
        </div>
        {!!review.evalText2 && (
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
          {renderStars(review.evalScore3)}
        </div>
        {!!review.evalText3 && (
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
          {renderStars(review.evalScore4)}
        </div>
        {!!review.evalText4 && (
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

export default ChannelDetailReviews