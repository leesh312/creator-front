import './App.scss';
import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import YoutubeChannelDetail from "./page/YoutubeChannelDetail/YoutubeChannelDetail";
import Header from "./layout/Header";
import Join from "./page/Join/Join";
import SideNav from "./layout/SideNav/SideNav";
import {EuiPage} from "@elastic/eui";
import SignupComplete from "./page/SignupComplete/SignupComplete";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <EuiPage
        paddingSize="none"
        restrictWidth
        grow
      >
        <SideNav />
        <Routes>
          <Route path="/" element={<YoutubeChannelDetail/>}/>
          <Route path="/channels/:channelId" element={<YoutubeChannelDetail/>}/>
          <Route path="/hello" element={<Join />}/>
          <Route path="/welcome" element={<SignupComplete />}/>
        </Routes>
      </EuiPage>
    </BrowserRouter>
  );
}

export default App;
