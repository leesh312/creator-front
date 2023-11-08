import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import {EuiProvider} from '@elastic/eui';
import axios from "axios";
import {QueryClient, QueryClientProvider} from "react-query";


const initAxios = () => {
  axios.defaults.baseURL = `${process.env.REACT_APP_SERVER}`
  axios.interceptors.response.use(async (res) => {
      if (res.headers.authorization) {
        // const newAccessToken = res?.headers?.authorization;
        // LoginAuthHelper.setToken(newAccessToken)
      }
      return res
    },
    (error) => {
      if (error.response?.status === 401) {
        window.alert("인증이 만료되었습니다.")
        // LoginAuthHelper.removeToken()
        window.location.href = "/"
        return Promise.resolve()
      }

      if (error.response?.data) {
        // TODO 요청 시 호출자가 에러를 처리한다고 설정하면 별도의 처리를 하지 않고 reject하기
        //  console.log("error.request", )

        const message = error.response?.data?.message
        if (message) {
          window.alert(message)
        }
      }
      return Promise.reject(error)
    })
  // LoginAuthHelper.initFromLocalStorage()
}

initAxios()

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    }
  }
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <EuiProvider colorMode="light">
      <QueryClientProvider client={queryClient}>
      <App />
      </QueryClientProvider>
    </EuiProvider>
  </React.StrictMode>
);
