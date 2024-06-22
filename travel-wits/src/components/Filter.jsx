import React, { useState } from "react";
import "../App.css";
import Ratings from "./Ratings";
import chevronDown from "../assets/chevron-down.png";
import chevronUp from "../assets/chevron-up.svg";

const Filter = ({
  label,
  options,
  selectedOptions,
  setSelectedOptions,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (option) => {
    let newSelectedOptions;
    if (option === "Any") {
      newSelectedOptions = selectedOptions.includes("Any")
        ? selectedOptions.filter((item) => item !== "Any")
        : ["Any"];
    } else {
      newSelectedOptions = selectedOptions.includes(option)
        ? selectedOptions.filter((item) => item !== option)
        : [...selectedOptions.filter((item) => item !== "Any"), option];
    }
    setSelectedOptions(newSelectedOptions);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`filter-${className}`}>
      <label onClick={toggleDropdown} className="rating-label">
        <div style={{ margin: "0 5%" }}>{label}</div>
        <div style={{ margin: "0 5%" }}>
          {isOpen ? (
            <img key="chevron-up" src={chevronUp} alt="chevron-up" />
          ) : (
            <img key="chevron-down" src={chevronDown} alt="chevron-down" />
          )}
        </div>
      </label>
      {isOpen && (
        <div className="dropdown">
          {options.map((option) => (
            <div key={option} className="dropdown-item">
              <input
                type="checkbox"
                checked={selectedOptions.includes(option)}
                onChange={() => handleChange(option)}
              />
              {label === "Ratings" && option === "Any" ? (
                <div className="rating-option">Any rating</div>
              ) : label === "Ratings" ? (
                <Ratings option={option} />
              ) : (
                option
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Filter;
