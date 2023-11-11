import {
  EuiAvatar,
  EuiButton,
  EuiCard, EuiCheckboxGroup, EuiDescriptionList,
  EuiFieldText,
  EuiFilePicker,
  EuiFlexGroup,
  EuiFlexItem, EuiForm, EuiFormRow, EuiLink, EuiPageBody,
  EuiPageSection,
  EuiRange,
  EuiSelect,
  EuiSpacer,
  EuiStat, EuiSwitch, EuiText,
  EuiTitle,
  useGeneratedHtmlId
} from "@elastic/eui";
import React, {FormEvent, useRef, useState} from "react";
import {useSignupAdvertiser} from "../../api/apis";
import {useNavigate} from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const { mutate: signupMutate } = useSignupAdvertiser()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [repassword, setRepassword] = useState("")
  const [corpName, setCorpName] = useState("")
  const [name, setName] = useState("")
  const [position, setPosition] = useState("")
  const [phone, setPhone] = useState("")

  const emailRef = useRef<HTMLInputElement>(null);

  const checkboxes = [
    {
      id: "agree1",
      label: '(필수) 서비스 이용 약관에 동의합니다.',
    },
    {
      id: "agree2",
      label: '(선택) 마케팅 정보 및 혜택 안내 수신에 동의합니다.',
    },
    {
      id: "agree3",
      label: '(선택) 뉴스레터 수신에 동의합니다.',
    },
  ];

  const [checkboxIdToSelectedMap, setCheckboxIdToSelectedMap] = useState<{ [key: string]: boolean }>({
    "agree1": false,
    "agree2": false,
    "agree3": false,
  });

  const onCheckboxChange = (optionId: string) => {
    const newCheckboxIdToSelectedMap = {
      ...checkboxIdToSelectedMap,
      ...{
        [optionId]: !checkboxIdToSelectedMap[optionId],
      },
    };

    setCheckboxIdToSelectedMap(newCheckboxIdToSelectedMap);
  };

  const onClickSubmit = () => {
    if(!verifySubmitData()) {
      return
    }

    const { agree1, agree2, agree3 } = checkboxIdToSelectedMap
    const payload = {
      email,
      password,
      repassword,
      corpName,
      name,
      position,
      phone,
      agree1,
      agree2,
      agree3
    }
    console.log(agree1, agree2, agree3)

    signupMutate(payload, {
      onSuccess: (data) => {
        navigate("/welcome")
      }
    })
  }

  const verifySubmitData = () => {
    if(!email) {
      window.alert("이메일(아이디)를 입력해주세요")
      emailRef?.current?.focus()
      return false;
    }
    if(!password) {
      window.alert("비밀번호를 입력해주세요")
      return false;
    }
    if(!repassword) {
      window.alert("비밀번호를 한번 더 입력해주세요")
      return false;
    }
    if(password !== repassword) {
      window.alert("비밀번호 두 값이 일치하지 않습니다")
      return false;
    }
    if(!corpName) {
      window.alert("회사명을 입력해주세요")
      return false;
    }
    if(!name) {
      window.alert("담당자 이름을 입력해주세요")
      return false;
    }
    if(!position) {
      window.alert("직책을 입력해주세요")
      return false;
    }
    if(!phone) {
      window.alert("담당자 번호를 입력해주세요")
      return false;
    }
    if(!checkboxIdToSelectedMap["agree1"]) {
      window.alert("서비스 이용약관에 동의해야 가입이 가능합니다")
      return false
    }

    return true;
  }

  return (
    <EuiPageBody paddingSize="none" panelled>
      <EuiPageSection restrictWidth="400px">
        <EuiTitle>
          <h2>광고주/광고대행사 계정 가입</h2>
        </EuiTitle>

        <EuiSpacer size="xl"/>

        <EuiForm component="form">
          <EuiFormRow label="이메일(아이디)">
            <EuiFieldText
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
              placeholder="회사 이메일을 입력해주세요"
              inputRef={emailRef}
            />
          </EuiFormRow>

          <EuiFormRow label="비밀번호">
            <EuiFieldText name="password" value={password} onChange={(e) => {
              setPassword(e.target.value)
            }} type="password" placeholder="8자 이상 입력해주세요"/>
          </EuiFormRow>

          <EuiFormRow label="비밀번호 재입력">
            <EuiFieldText name="repassword" value={repassword} onChange={(e) => {
              setRepassword(e.target.value)
            }} type="password"/>
          </EuiFormRow>

          <EuiSpacer size="xl"/>

          <EuiFormRow label="회사명">
            <EuiFieldText name="corpName" value={corpName} onChange={(e) => {
              setCorpName(e.target.value)
            }} placeholder=""/>
          </EuiFormRow>

          <EuiFormRow label="담당자명">
            <EuiFieldText name="name" value={name} onChange={(e) => {
              setName(e.target.value)
            }}/>
          </EuiFormRow>

          <EuiFormRow label="직책">
            <EuiFieldText name="position" value={position} onChange={(e) => {
              setPosition(e.target.value)
            }} placeholder="(선택)"/>
          </EuiFormRow>

          <EuiFormRow label="담당자 번호">
            <EuiFieldText name="phone" value={phone} onChange={(e) => {
              setPhone(e.target.value)
            }} placeholder="- 없이 입력"/>
          </EuiFormRow>

          <EuiSpacer size="xl"/>

          <EuiCheckboxGroup
            options={checkboxes}
            idToSelectedMap={checkboxIdToSelectedMap}
            onChange={onCheckboxChange}
            legend={{
              children: undefined,
            }}
          />

          <EuiSpacer size="xl"/>

          <EuiButton fill onClick={onClickSubmit}>
            가입하기
          </EuiButton>
        </EuiForm>
        <EuiSpacer size="xl"/>
      </EuiPageSection>
    </EuiPageBody>
  )
}

export default Signup