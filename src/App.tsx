import './App.scss';
import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import YoutubeChannelDetail from "./page/YoutubeChannelDetail/YoutubeChannelDetail";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<YoutubeChannelDetail/>} />
          <Route path="/channels/:channelId" element={<YoutubeChannelDetail/>} />
        </Routes>
      </BrowserRouter>
    </div>
);
}

export default App;
