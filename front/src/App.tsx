import React, { useState } from "react"
import { motion } from "framer-motion"
import client from "./axios/client"
import ReactSpeedometer from "react-d3-speedometer"

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
      .get(`checkspeed/`)
      .then((res) => {
        setNetSpeed(res.data)
        setIsLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setIsLoading(false)
      })
  }

  return (
    <div className="flex justify-center">
      <div className="backdrop-blur-sm bg-white/30 w-2/3 my-30 py-20 rounded-xl">
        <div className="flex justify-center">
          <h1 className="text-2xl md:text-4xl m-10 font-bold">
            Internet Speed Test
          </h1>
        </div>
        <div className="flex justify-center">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={runSpeedTestHandler}
            className="bg-gradient-to-tr from-blue-400 to-green-300 text-white font-bold py-2 px-4 border-b-4 w-56 h-56 rounded-full"
          >
            <span className="text-2xl text-center">
              {isLoading ? "Loading.." : "START"}
            </span>
          </motion.button>
        </div>
        {!isLoading && netSpeed && (
          <div className="flex justify-evenly">
            <ReactSpeedometer
              value={netSpeed?.download}
              maxValue={100}
              startColor="red"
              endColor="green"
              currentValueText={`Download Speed : ${netSpeed?.download} MBPS`}
              textColor="#fff"
            />
            <ReactSpeedometer
              value={netSpeed?.upload}
              maxValue={100}
              startColor="red"
              endColor="green"
              currentValueText={`Upload Speed : ${netSpeed?.upload} MBPS`}
              textColor="#fff"
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default App
