import './App.scss';
import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import YoutubeChannelDetail from "./page/YoutubeChannelDetail/YoutubeChannelDetail";
import Header from "./layout/Header";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<YoutubeChannelDetail/>}/>
          <Route path="/channels/:channelId" element={<YoutubeChannelDetail/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
