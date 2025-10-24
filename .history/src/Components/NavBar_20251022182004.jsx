import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "../styles/pages/navbar.scss";

import { useNavigate } from "react-router-dom";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";

export default function NavBar() {
  const [keyword, setKeyword] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.key === "Enter" && keyword.trim() !== "") {
      navigate(`/search/${keyword}`); // chuyển sang trang search
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };
  return (
    <div>
      <nav>
        <div className="nav-search">
          <span>
            <FontAwesomeIcon icon={faSearch} />
          </span>
          <input
            type="text"
            placeholder="Search movies"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={handleSearch}
          />
        </div>
        <div className="nav-right">
          {user ? (
            <div className="user">
              <span style={{ color: "white" }}>👋 {user.username}</span>
              <button onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <button onClick={() => navigate("/login")}>Sign in</button>
          )}
          <span>
            <FontAwesomeIcon icon={faFacebook} />
          </span>
        </div>
      </nav>
    </div>
  );
}
