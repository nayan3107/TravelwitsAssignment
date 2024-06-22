import React, { useState, useMemo } from "react";
import ReactDOM from "react-dom";
import "./App.css";
import Filter from "./components/Filter"; // Make sure to import the Filter component
import SearchItem from "./components/SearchItem";
const moviesData = [
  { title: "The Matrix", rating: 7.5, category: "Action" },
  { title: "Focus", rating: 6.9, category: "Comedy" },
  { title: "The Lazarus Effect", rating: 6.4, category: "Thriller" },
  { title: "Everly", rating: 5.0, category: "Action" },
  { title: "Maps to the Stars", rating: 7.5, category: "Drama" },
];

const App = () => {
  const [search, setSearch] = useState("");
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const ratingsOptions = [
    "Any",
    ...Array.from({ length: 10 }, (_, i) => i + 1),
  ];
  const categoriesOptions = useMemo(
    () => ["Any", ...new Set(moviesData.map((movie) => movie.category))],
    []
  );

  const filteredMovies = useMemo(() => {
    if (!search) return [];
    return moviesData.filter((movie) => {
      const matchesSearch = movie.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesRating =
        selectedRatings.length === 0 ||
        selectedRatings.includes("Any") ||
        selectedRatings.some(
          (selectedRating) =>
            typeof selectedRating === "number" &&
            movie.rating >= selectedRating &&
            movie.rating < selectedRating + 1
        );
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes("Any") ||
        selectedCategories.includes(movie.category);
      return matchesSearch && matchesRating && matchesCategory;
    });
  }, [search, selectedRatings, selectedCategories]);

  return (
    <>
      <h1>Movie Search and Filter</h1>
      <div className="app-container">
        <div className="search-filter-container">
          <div style={{ marginRight: "3%" }}>
            <input
              type="text"
              placeholder="Enter movie name"
              value={search}
              className="input-box"
              onChange={(e) => setSearch(e.target.value)}
              style={{ paddingLeft: "5%" }}
            />
            <div>
              {filteredMovies.map((movie) => (
                <SearchItem
                  key={movie.title}
                  title={movie.title}
                  rating={movie.rating}
                  category={movie.category}
                />
              ))}
            </div>
          </div>
          <div className="dropdown-container">
            <Filter
              label="Ratings"
              options={ratingsOptions}
              selectedOptions={selectedRatings}
              setSelectedOptions={setSelectedRatings}
              className="rating-dropdown"
            />
            <Filter
              label="Genres"
              options={categoriesOptions}
              selectedOptions={selectedCategories}
              setSelectedOptions={setSelectedCategories}
              className="genre-dropdown"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
