import { useState, useEffect } from "react";
import NavBackground from "./NavBackground";

const Navbar = ({ data, setFilteredData }) => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    const filtered = data.filter(
      (job) =>
        job.title.toLowerCase().includes(value.toLowerCase()) ||
        job.company.toLowerCase().includes(value.toLowerCase()) ||
        job.description.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredData(filtered);
  };

  useEffect(() => {
    let darkModeBtn = document.getElementById("dark-mode-icon");
  
  const toggleDarkMode = () => {
    document.body.classList.toggle("dark-mode");
    const isDarkMode = document.body.classList.contains("dark-mode");
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    setDarkMode(isDarkMode);
  };

  darkModeBtn.addEventListener("click", toggleDarkMode);
  
  // Set initial theme
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
  }

  return () => darkModeBtn.removeEventListener("click", toggleDarkMode);
  }, []);

  return (
    <div>
      <NavBackground />
      {/*header design start*/}
      <header className="header">
        <a href="/" className="logo">
          Lokerin.
        </a>
        <nav className="navbar">
          <div className="navbar-icon">
            <button
              className="icon"
              id="dark-mode-icon"
              onClick={() => setDarkMode(!darkMode)}
            >
              <i className="fas fa-moon" />
            </button>
            <div className={`search-container ${isFocused ? "focused" : ""}`}>
              {/* <Search className="search-icon" size={20} /> */}
              <input
                type="text"
                className="search-input"
                placeholder="Search jobs..."
                value={searchTerm}
                onChange={handleSearch}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              />
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;