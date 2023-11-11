import {EuiCallOut, EuiLink, EuiPageBody, EuiPageSection, EuiSpacer, EuiTitle} from "@elastic/eui";
import React from "react";

const SignupComplete = () => {
  return (
    <EuiPageBody paddingSize="none" panelled>
      <EuiPageSection restrictWidth="400px">
        <EuiTitle>
          <h2>가입 완료 🎉</h2>
        </EuiTitle>
        <EuiSpacer size="xl"/>

        <EuiCallOut title="가입 후 인증 필요" color="success" iconType="user">
          <p>
            가입 시 적으신 메일로 인증 메일을 보냈습니다. <br/>
            이메일 인증을 완료해주세요.
          </p>
        </EuiCallOut>
      </EuiPageSection>
    </EuiPageBody>
  )
}

export default SignupComplete