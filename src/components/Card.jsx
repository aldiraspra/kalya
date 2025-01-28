import { motion } from "framer-motion";
import React, { useRef, useState } from "react";
import "../assets/css/card.css";
import { Link } from 'react-router-dom'; 

function Card() {
  const [cardClass, setCardClass] = useState("");
  const [isCardOpened, setIsCardOpened] = useState(false);
  const timerRef = useRef(null);

  const toggleCard = () => {
    if (cardClass === "" || cardClass === "close-half") {
      setCardClass("open-half");
      setIsCardOpened(true); 
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setCardClass("open-fully");
        timerRef.current = null;
      }, 1000);
    } else {
      setCardClass("close-half");
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setCardClass("");
        timerRef.current = null;
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center overflow-clip">
    <div className="w-[400px]  h-screen flex flex-col items-center justify-center">
      <motion.div  initial={{ opacity: 0, visibility: "hidden" }}
          animate={{ opacity: 1, visibility: "visible" }}
          transition={{duration: 1.2}}>
      <div id="card" className={`${cardClass}`} onClick={toggleCard}>     
        <div id="card-inside">
          <div className="wrap">
            <p>Hello, Kal.</p>
            <p>I've never been good at telling people how I feel, but here I am trying for you.</p>
            <p>
              Happiest Birthday yah. <br />
              I'm wishing you every happiness.
            </p>
            <p>
             Terima kasih utk semua yang udah kamu lakukan untuk aku.
            </p>
            <p>
            May we always be together in the years to come.
            </p>
            <p className="signed">Al Diras</p>
          </div>
        </div>

        <div id="card-front">
          <div className="wrap">
            <h1>untuk kalya</h1>
          </div>
        </div>
    </div>

      </motion.div>

    {/* prone to bugs */}
      {isCardOpened && (
        <motion.div className="-mt-[3rem]" initial={{ opacity: 0, visibility: "hidden" }}
        animate={{ opacity: 1, visibility: "visible" }}
        transition={{duration: 1.2}}> 
        <Link to ='/birthday-video'>
        <p className="-mt-[4rem] px-7 py-3 bg-customBlue text-white font-medium text-base rounded-full hover:bg-blue-600">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          />
        </svg>
          </p>
        </Link>
            
        </motion.div>
         
        )}

    </div>
    
    </div>
    
  );
}

export default Card;