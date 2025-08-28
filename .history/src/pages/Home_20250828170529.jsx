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
  const [cate, setCate] = useState([]);
  const colors = [
    "#e5322d",
    "#007bff",
    "#28a745",
    "#ff9800",
    "#9c27b0",
    "#00bcd4",
    "grey",
  ];
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
    const fetchData = async () => {
      try {
        const movieRes = await axios.get(
          "https://phimapi.com/danh-sach/phim-moi-cap-nhat?page=1"
        );
        const movies = movieRes.data.items;
        setMovies(movies);

        if (movies.length > 0) {
          const firstMovie = movies[0];
          setBg(firstMovie.thumb_url);
          setSelectedMovie(firstMovie);
        }

        const cateRes = await axios.get("https://phimapi.com/the-loai/");
        setCate(cateRes.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log("Cate updated:", cate);
  }, [cate]);
  const [countryMovies, setCountryMovies] = useState({
    han_quoc:[],
    trung_quoc :[], 
    viet_nam:[],
    
  })
  useEffect(() => {
    const fetchData = () => {
      try {
        const [hanRes,trungRes,vietRes ] = await Promise.all([
          axios.get("https://phimapi.com/v1/api/quoc-gia/han-quoc?page=1"),
          axios.get("https://phimapi.com/v1/api/quoc-gia/trung-quoc?page=1"),
          axios.get("https://phimapi.com/v1/api/quoc-gia/viet-nam?page=1"),
        ])
        setCountryMovies({
          han_quoc : hanRes.data.data.items,
          trung : hanRes.data.data.items,
          viet_nam : hanRes.data.data.items
        })
      } catch (error) {
        console.error("Lỗi fetch API:", error);
      }
    }
    fetchData();
  },[]) 
  return (
    <>
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
                  <FontAwesomeIcon icon={faHeart} className="icon" /> Watch
                  Later
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
      </div>

      <div className="type-list">
        <h4>Categories</h4>
        <div className="type">
          {cate.slice(0, 7).map((cat, index) => (
            <div
              key={cat.id}
              className="cate-card"
              onMouseEnter={() => {}}
              style={{ backgroundColor: colors[index % colors.length] }} //doi mau
            >
              <Link
                to={`detail/${cat.slug}`}
                style={{
                  textDecoration: "none",
                }}
              >
                <p
                  className="type-name"
                  style={{
                    textDecoration: "none",
                    color: "white",
                    fontWeight: "700",
                    fontSize: "20px",
                    letterSpacing: "1px",
                  }}
                >
                  {cat.name}
                </p>
              </Link>
            </div>
          ))}
          <div className="cate-card">
            <Link
              style={{
                textDecoration: "none",
              }}
            >
              <p
                className="type-name"
                style={{
                  textDecoration: "none",
                  color: "white",
                  fontWeight: "700",
                  fontSize: "20px",
                  letterSpacing: "1px",
                }}
              >
                +18 muc khac
              </p>
            </Link>
          </div>
        </div>
      </div>
      <div className="countries">
        <div className="country">
          <div>
            <p>Phim Han Quoc moi</p>
            <span>Xem toan bo </span>
          </div>
          <div className="country-list-film">
            <div className="country-film">
              <div className="film-bg">
                <h4>film name</h4>
                <h5>film origin name</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
