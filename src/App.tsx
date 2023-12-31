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
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'
import "dayjs/locale/ko"
import CategoryDashBoard from "./page/CategoryDashBoard/CategoryDashBoard";
import CategoryVideos from "./page/CategoryVideos/CategoryVideos";
import Home from "./page/Home/Home";
import CategoryChannels from "./page/CategoryChannels/CategoryChannels";

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
          <Route path="/" element={<Home/>}/>
          <Route path="/channels/:channelId" element={<YoutubeChannelDetail/>}/>
          <Route path="/signin" element={<Signin />}/>
          <Route path="/signup" element={<Signup />}/>
          <Route path="/welcome" element={<SignupComplete />}/>
          <Route path="/categories/:categoryName" element={<CategoryDashBoard />}/>
          <Route path="/categories/:categoryName/videos" element={<CategoryVideos />}/>
          <Route path="/categories/:categoryName/channels" element={<CategoryChannels />}/>
        </Routes>
      </EuiPage>
    </BrowserRouter>
  );
}

export default App;
