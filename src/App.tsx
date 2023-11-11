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

function App() {
  return (
    <BrowserRouter>
      <Header />
      <EuiPage
        paddingSize="none"
        restrictWidth="1680px"
        grow
      >
        <SideNav />
        <Routes>
          <Route path="/" element={<YoutubeChannelDetail/>}/>
          <Route path="/channels/:channelId" element={<YoutubeChannelDetail/>}/>
          <Route path="/signin" element={<Signin />}/>
          <Route path="/signup" element={<Signup />}/>
          <Route path="/welcome" element={<SignupComplete />}/>
          <Route path="/dashboard" element={<Dashboard />}/>
        </Routes>
      </EuiPage>
    </BrowserRouter>
  );
}

export default App;
