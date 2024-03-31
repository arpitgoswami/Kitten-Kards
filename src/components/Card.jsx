import React, { useRef } from "react";

function Card({ onClick }) {
  const cards = ["cat", "defuse", "shuffle", "explode"];
  const cardRef = useRef();

  const handleClick = () => {
    if (cardRef.current.style.cursor != "not-allowed") {
      cardRef.current.style.cursor = "not-allowed";
      cardRef.current.style.background = "#393E46";
      cardRef.current.style.color = "transparent";
      onClick(cardRef.current.innerText);
    } else {
      console.log("Disabled Card");
    }
  };

  return (
    <div
      ref={cardRef}
      onClick={handleClick}
      className="duration-500 font-normal text-center bg-[#00ADB5] w-[12rem] py-28 rounded-md text-[#222831] mb-4 opacity-100 cursor-pointer hover:opacity-70"
    >
      {cards[Math.floor(Math.random() * cards.length)]}
    </div>
  );
}

export default Card;
