import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faSearch,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";

import { useNavigate } from "react-router-dom";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";

export default function NavBar() {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const handleSearch = (e) => {
    if (e.key === "Enter" && keyword.trim() !== "") {
      navigate(`/search/${keyword}`); // chuyển sang trang search
    }
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
          <button>Sign in</button>
          <span>
            <FontAwesomeIcon icon={faFacebook} />
          </span>
        </div>
      </nav>
    </div>
  );
}
