import './App.scss';
import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import YoutubeChannelDetail from "./page/YoutubeChannelDetail/YoutubeChannelDetail";
import Header from "./layout/Header";
import Signup from "./page/Signup/Signup";
import SideNav from "./layout/SideNav";
import {EuiPage} from "@elastic/eui";
import SignupComplete from "./page/SignupComplete/SignupComplete";
import Signin from "./page/Signin/Signin";
import Dashboard from "./page/Dashboard/Dashboard";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'
import "dayjs/locale/ko"
import CategoryDashBoard from "./page/CategoryDashBoard/CategoryDashBoard";

dayjs.extend(relativeTime)
dayjs.locale("ko")

function App() {
  return (
    <BrowserRouter>
      <Header />
      <EuiPage
        paddingSize="none"
        restrictWidth="1480px"
        grow
      >
        <SideNav />
        <Routes>
          <Route path="/" element={<Dashboard/>}/>
          <Route path="/channels/:channelId" element={<YoutubeChannelDetail/>}/>
          <Route path="/signin" element={<Signin />}/>
          <Route path="/signup" element={<Signup />}/>
          <Route path="/welcome" element={<SignupComplete />}/>
          <Route path="/dashboard" element={<Dashboard />}/>
          <Route path="/categories/:categoryName" element={<CategoryDashBoard />}/>
        </Routes>
      </EuiPage>
    </BrowserRouter>
  );
}

export default App;
