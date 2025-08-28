import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/pages/home.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlay,
  faClapperboard,
  faHeart,
  faPlay,
  faSearch,
  faUser,
  faUserGroup,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import { faCirclePlay as faCirclePlayRegular } from "@fortawesome/free-regular-svg-icons";

import { faFacebook } from "@fortawesome/free-brands-svg-icons";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [bg, setBg] = useState("");
  const [detail, setDetail] = useState(null);
  const handleChangeBg = (movie) => {
    const img = new Image();
    img.src = movie.thumb_url;
    img.onload = () => {
      setBg(movie.thumb_url);
      setSelectedMovie(movie);
    };
    console.log(selectedMovie);
  };

  useEffect(() => {
    axios
      .get("https://phimapi.com/danh-sach/phim-moi-cap-nhat?page=1")
      .then((res) => {
        setMovies(res.data.items);
        if (res.data.items.length > 0) {
          const firstMovie = res.data.items[0];
          setBg(firstMovie.thumb_url);
          setSelectedMovie(firstMovie);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div
      className="home-container"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "all 0.4s ease",
      }}
    >
      <div className="home-landing">
        <nav>
          <div className="nav-search">
            <span>
              <FontAwesomeIcon icon={faSearch} />
            </span>
            <input type="text" placeholder="Search movies" />
          </div>
          <div className="nav-right">
            <button>Sign in</button>
            <span>
              <FontAwesomeIcon icon={faFacebook} />
            </span>
          </div>
        </nav>

        <div className="home-thumb">
          <div className="thumb-info">
            <h3>{selectedMovie?.name}</h3>
            <div className="info-detail">
              <span>{selectedMovie?.year}</span>
              <button>
                <FontAwesomeIcon icon={faHeart} className="icon" /> Watch Later
              </button>
              <button>
                <FontAwesomeIcon icon={faUserGroup} className="icon" />
                Invite Friends
              </button>
            </div>
          </div>

          <div className="thumb-list">
            <div className="list-movie">
              {movies.slice(0, 7).map((movie) => (
                <div
                  key={movie.id}
                  className="card"
                  onMouseEnter={() => {
                    handleChangeBg(movie);
                    setDetail(movie.id); // chỉ đặt ID tương ứng
                  }}
                  onMouseLeave={() => setDetail(null)}
                >
                  <Link to={`detail/${movie.slug}`}>
                    <div
                      className="movie-card"
                      style={{
                        backgroundImage: `url(${movie.poster_url})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        marginBottom: "6px",
                        cursor: "pointer",
                        position: "relative",
                      }}
                    >
                      {/* 👉 Chỉ render nếu đúng ID đang hover */}
                      {detail === movie.id && (
                        <div className="movie-details">
                          <p className="movie-name">{movie.name}</p>
                        </div>
                      )}
                    </div>

                    <span
                      style={{
                        fontSize: "12px",
                        color: "white",
                      }}
                    >
                      {movie.name}
                    </span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="type-list">1111</div>
    </div>
  );
}
