// SearchItem.jsx
import React from "react";
import filledStar from "../assets/Star.svg";
import halfStar from "../assets/half-star.svg";
import emptyStar from "../assets/empty-star.svg";
import "../App.css";
const SearchItem = ({ title, rating, category }) => {
  const renderStars = () => {
    const totalStars = 10;
    const filledStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = totalStars - filledStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="stars">
        {[...Array(filledStars)].map((_, index) => (
          <img key={`filled-${index}`} src={filledStar} alt="Filled Star" />
        ))}
        {hasHalfStar && <img src={halfStar} alt="Half Star" />}
        {[...Array(emptyStars)].map((_, index) => (
          <img key={`empty-${index}`} src={emptyStar} alt="Empty Star" />
        ))}
      </div>
    );
  };

  return (
    <div className="search-item">
      <div className="title-category">
        <div className="movie-title">{title}</div>
        <div className="movie-category">{category}</div>
      </div>

      <div className="movie-rating">{renderStars()}</div>
    </div>
  );
};

export default SearchItem;
