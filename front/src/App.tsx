import React, { useState } from "react"
import Nav from "./components/Nav"
import SpeedTest from "./components/SpeedTest"

const video = require("./assets/video/future.mp4")

const App = () => {
  return (
    <>
      <div className="main">
        <div className="overlay"></div>
        <video src={video} autoPlay loop muted />
        <div className="content">
          <SpeedTest />
        </div>
      </div>
    </>
  )
}

export default App
