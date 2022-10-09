import React, { useState } from "react"
import { motion } from "framer-motion"
import client from "../axios/client"
import Loading from "./Loading"
import ReactSpeedometer from "react-d3-speedometer"

interface ISpeed {
  download: number
  upload: number
}

const SpeedTest = () => {
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
    <>
      <div className="flex justify-center">
        <div className="w-full rounded-xl">
          <div className="flex justify-center">
            <div className="">
              <h1 className="text-white text-center text-3xl md:text-5xl opacity-75 font-bold leading-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-pink-500 to-purple-500">
                  Internet Speed Test
                </span>
              </h1>
              <p className="text-white leading-normal text-base md:text-2xl mb-8 text-center">
                {isLoading
                  ? "Now Checking..."
                  : "Check your internet speed test here"}
              </p>
            </div>
          </div>
          <div className="flex justify-center">
            {isLoading ? (
              <Loading />
            ) : (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={runSpeedTestHandler}
                className="bg-gradient-to-r from-purple-800 to-green-500 text-white font-bold px-4 w-56 h-56 rounded-full hover:from-pink-500 hover:to-green-500"
              >
                <span className="text-2xl text-center">START</span>
              </motion.button>
            )}
          </div>
          {!isLoading && netSpeed && (
            <div className="md:flex md:justify-evenly item-center">
              <div className="flex justify-center">
                <ReactSpeedometer
                  value={netSpeed?.download}
                  maxValue={100}
                  startColor="red"
                  endColor="green"
                  currentValueText={`Download Speed : ${netSpeed?.download} MBPS`}
                  textColor="#fff"
                />
              </div>
              <div className="flex justify-center">
                <ReactSpeedometer
                  value={netSpeed?.upload}
                  maxValue={100}
                  startColor="red"
                  endColor="green"
                  currentValueText={`Upload Speed : ${netSpeed?.upload} MBPS`}
                  textColor="#fff"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default SpeedTest
