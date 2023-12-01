import {EuiButton, EuiFlexGroup, EuiFlexItem, EuiFormRow, EuiSpacer, EuiTextArea} from "@elastic/eui";
import {NegativeStar, PositiveStar} from "./ChannelDetailReviews";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

export interface ReviewWriteFormData {
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

const ReviewWriteForm = ({ onSubmit }: { onSubmit?: (data: ReviewWriteFormData) => void }) => {
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

export default ReviewWriteForm;