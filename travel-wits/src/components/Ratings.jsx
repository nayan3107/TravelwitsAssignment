import React from "react";
import filledStar from "../assets/Star.svg";
import emptyStar from "../assets/empty-star.svg";

const Ratings = ({ option }) => {
  const totalStars = 10;
  const filledStars = typeof option === "number" ? option : 0;
  const emptyStars = totalStars - filledStars;

  return (
    <div className="stars">
      {[...Array(filledStars)].map((_, index) => (
        <img key={`filled-${index}`} src={filledStar} alt="Filled Star" />
      ))}
      {[...Array(emptyStars)].map((_, index) => (
        <img key={`empty-${index}`} src={emptyStar} alt="Empty Star" />
      ))}
    </div>
  );
};

export default Ratings;
