import React, { useEffect, useState } from "react";
import "../assets/css/cake.css";
import { CakeSVG, confetti } from "../assets";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Cake() {
  const [candlesBlownOut, setCandlesBlownOut] = useState(false);
  const [micPermissionGranted, setMicPermissionGranted] = useState(false);

  useEffect(() => {
    let audioContext;
    let analyser;
    let dataArray;
    let blowStartTime = null;

    async function initBlowDetection() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        audioContext = new (window.AudioContext || window.AudioContext)();
        analyser = audioContext.createAnalyser();
        const source = audioContext.createMediaStreamSource(stream);

        analyser.fftSize = 512;
        const bufferLength = analyser.frequencyBinCount;
        dataArray = new Uint8Array(bufferLength);
        source.connect(analyser);

        detectBlow();
      } catch (error) {
        console.error("Microphone access denied:", error);
      }
    }

    function detectBlow() {
      if (!analyser || !dataArray) return;
      analyser.getByteFrequencyData(dataArray);
      const lowFrequencyValues = dataArray.slice(0, 15);
      const averageLowFrequency =
        lowFrequencyValues.reduce((sum, value) => sum + value, 0) /
        lowFrequencyValues.length;

      const blowThreshold = 100;
      const requiredDuration = 1500;

      if (averageLowFrequency > blowThreshold) {
        if (!blowStartTime) {
          blowStartTime = performance.now();
        } else if (performance.now() - blowStartTime > requiredDuration) {
          setCandlesBlownOut(true);
        }
      } else {
        if (blowStartTime && performance.now() - blowStartTime > 200) {
          blowStartTime = null;
        }
      }

      requestAnimationFrame(detectBlow);
    }

    setTimeout(() => {
      initBlowDetection();
      setMicPermissionGranted(true);
    }, 10000);

    return () => {
      if (audioContext) {
        audioContext.close();
      }
    };
  }, []);

  return (
    <>
      <div className="bg-black/80 h-screen w-screen flex items-center justify-center overflow-hidden relative">
        {!candlesBlownOut && (
          <div className="absolute top-8 text-center z-20">
            <h1 className="text-white text-xl font-semibold">🎙️ Tiup lilinnya</h1>
          </div>
        )}
        {candlesBlownOut && (
          <div
            className="absolute inset-0 bg-cover bg-center z-50"
            style={{
              backgroundImage: `url(${confetti})`,
            }}
          />
        )}
        {candlesBlownOut && (
          <motion.div
            className="absolute top-20 text-white text-3xl font-bold z-50 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div>
              <p className="text-4xl">Happy Birthday</p>
              <p className="text-4xl mt-2">Kal</p>
            </div>
          </motion.div>
        )}
        <div className="relative z-10">
          <div className="absolute -top-48 left-1/2 transform -translate-x-1/2">
            <div className="candle">
              {!candlesBlownOut && (
                <>
                  <div className="flame"></div>
                  <div className="flame"></div>
                  <div className="flame"></div>
                  <div className="flame"></div>
                  <div className="flame"></div>
                </>
              )}
            </div>
          </div>
          <CakeSVG />
        </div>
      </div>
    </>
  );
}

export default Cake;
