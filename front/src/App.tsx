import React, { useState } from "react"
import "./App.css"
import axios from "axios"

const client = axios.create({
  baseURL: "http://localhost:8000/"
})

interface ISpeed {
  download: number
  upload: number
}

function App() {
  const [netSpeed, setNetSpeed] = useState<ISpeed>()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const runSpeedTestHandler = () => {
    setIsLoading(true)
    client
      .get("api/checkspeed/")
      .then((res) => {
        setNetSpeed(res.data)
        setIsLoading(false)
      })
      .catch((error) => console.log(error))
  }
  console.log(netSpeed)
  console.log(isLoading)

  return (
    <div className="App">
      <h1>Internet Speed Test</h1>
      <button onClick={runSpeedTestHandler}>Run Speed Test</button>
      {isLoading && <p>Loading...</p>}
      {!isLoading && netSpeed && (
        <>
          <p>Download: {netSpeed?.download} mbps</p>
          <p>Upload: {netSpeed?.upload} mbps</p>
        </>
      )}
    </div>
  )
}

export default App
