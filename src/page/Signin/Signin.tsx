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

const Signin = () => {
  const navigate = useNavigate();
  const {mutate: signinMutate} = useSignin()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const onClickSignin = () => {
    if (!verifySubmitData()) {
      return
    }
    const payload = {
      email,
      password
    }

    signinMutate(payload, {
      onSuccess: (data) => {
        navigate("/dashboard")
      }
    })
  }

  const verifySubmitData = () => {
    if (!email) {
      window.alert("이메일을 입력해주세요")
      emailRef?.current?.focus()
      return false
    }
    if (!password) {
      window.alert("비밀번호를 입력해주세요")
      passwordRef?.current?.focus()
      return false
    }
    return true
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onClickSignin()
      e.preventDefault()
      e.stopPropagation()
    }
  }

  return (
    <EuiPageBody paddingSize="none" panelled>
      <EuiPageSection restrictWidth="400px">
        <EuiTitle>
          <h2>로그인</h2>
        </EuiTitle>

        <EuiSpacer size="s"/>

        로그인 후 서비스 이용이 가능합니다.

        <EuiSpacer size="xl"/>

        <EuiForm component="form">
          <EuiFormRow label="이메일(아이디)">
            <EuiFieldText
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
              placeholder="example@gmail.com"
              inputRef={emailRef}
            />
          </EuiFormRow>

          <EuiFormRow label="비밀번호">
            <EuiFieldText
              name="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
              type="password"
              placeholder="********"
              inputRef={passwordRef}
              onKeyDown={onKeyDown}
            />
          </EuiFormRow>

          <EuiSpacer/>

          <EuiButton fill onClick={onClickSignin}>
            로그인
          </EuiButton>
        </EuiForm>

        <EuiSpacer size="xl"/>


        <EuiFlexGroup
          alignItems="center"
        >
          <EuiFlexItem>
            아직 계정이 없으신가요?
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiButtonEmpty href="/signup">
              가입하기
            </EuiButtonEmpty>
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiPageSection>
    </EuiPageBody>
  )
}

export default Signin