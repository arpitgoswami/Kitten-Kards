import React, { useRef } from "react";

function Card({ onClick }) {
  const cards = ["cat", "defuse", "shuffle", "explode"];
  const cardsEmoji = ["🐱", "💣", "🔄", "💥"];

  const cardRef = useRef();
  const emojiRef = useRef();
  const questionRef = useRef();

  const handleClick = () => {
    if (cardRef.current.style.cursor != "not-allowed") {
      cardRef.current.style.cursor = "not-allowed";
      cardRef.current.style.background = "#00ADB5";
      emojiRef.current.style.display = "block";
      questionRef.current.style.display = "none";
      cardRef.current.style.opacity = "0.7";
      onClick(cardRef.current.innerText);
    } else {
      console.log("Disabled Card");
    }
  };

  return (
    <div
      ref={cardRef}
      onClick={handleClick}
      className="duration-500 font-normal text-center bg-[#393E46] w-[12rem] py-24 rounded-md text-[#222831] mb-4 opacity-100 cursor-pointer hover:opacity-70"
    >
      <div id="emoji" ref={emojiRef}>
        {cardsEmoji[Math.floor(Math.random() * cards.length)]}
      </div>

      <div id="question" ref={questionRef}>
        ❔
      </div>
    </div>
  );
}

export default Card;
