import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/pages/home.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faSearch,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import Countries from "./Country.jsx";
import CartoonFilm from "./CartoonFilm.jsx";

import HorrorFilm from "./HorrorFilm.jsx";
import ListFilm from "./HorrorFilm.jsx";

import FilmSlider from "./FilmSlider.jsx";

import Footer from "../Components/Footer.jsx";
export default function Home() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [bg, setBg] = useState("");
  const [detail, setDetail] = useState(null);
  const [cate, setCate] = useState([]);
  const colors = [
    "#4a90e2",
    "#8e99f3",
    "#32d3a6",
    "#a16bd5",
    "#f4a261",
    "#e76f51",
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
    han_quoc: [],
    trung_quoc: [],
    au_my: [],
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [hanRes, trungRes, myRes] = await Promise.all([
          axios.get("https://phimapi.com/v1/api/quoc-gia/han-quoc?page=1"),
          axios.get("https://phimapi.com/v1/api/quoc-gia/trung-quoc?page=1"),
          axios.get("https://phimapi.com/v1/api/quoc-gia/au-my?page=1"),
        ]);
        setCountryMovies({
          han_quoc: hanRes.data.data.items,
          trung_quoc: trungRes.data.data.items,
          au_my: myRes.data.data.items,
        });
      } catch (error) {
        console.error("Lỗi fetch API:", error);
      }
    };

    fetchData();
  }, []);
  const [featureFilm, setFeatureFilm] = useState([]);
  const [cartoonFilm, setCartoonFilm] = useState([]);
  const [tvShow, setTvShow] = useState([]);
  const [actionFilm, setActionFilm] = useState([]);
  const [schoolFilm, setSchoolFilm] = useState([]);
  const [horrorFilm, setHorrorFilm] = useState([]);
  const [fictionFilm, setFictionFilm] = useState([]);
  const [voiceOverFilm, setVoiceOverFilm] = useState([]);

  //feature get API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const featureFilmRes = await axios.get(
          "https://phimapi.com/v1/api/danh-sach/phim-le?year=2025"
        );
        const films = featureFilmRes.data.data.items;
        setFeatureFilm(films);
        console.log(films);
      } catch (error) {
        console.error("Lỗi fetch API:", error);
      }
    };
    fetchData();
  }, []);
  //cartoon get API

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cartoonFilmRes = await axios.get(
          "https://phimapi.com/v1/api/danh-sach/hoat-hinh"
        );
        const films = cartoonFilmRes.data.data.items;
        setCartoonFilm(films);
        console.log(films);
      } catch (error) {
        console.error("Lỗi fetch API:", error);
      }
    };
    fetchData();
  }, []);
  //tv show api
  useEffect(() => {
    const fetchData = async () => {
      try {
        const tvShowRes = await axios.get(
          "https://phimapi.com/v1/api/danh-sach/tv-shows"
        );
        const films = tvShowRes.data.data.items;
        setTvShow(films);
        console.log(films);
      } catch (error) {
        console.error("Lỗi fetch API:", error);
      }
    };
    fetchData();
  }, []);
  //action film api
  useEffect(() => {
    const fetchData = async () => {
      try {
        const actionFilmRes = await axios.get(
          "https://phimapi.com/v1/api/the-loai/hanh-dong?year=2025"
        );
        const films = actionFilmRes.data.data.items;
        setActionFilm(films);
        console.log(films);
      } catch (error) {
        console.error("Lỗi fetch API:", error);
      }
    };
    fetchData();
  }, []);

  //school film api
  useEffect(() => {
    const fetchData = async () => {
      try {
        const schoolFilmRes = await axios.get(
          "https://phimapi.com/v1/api/the-loai/hoc-duong?year=2025"
        );
        const films = schoolFilmRes.data.data.items;
        setSchoolFilm(films);
        console.log(films);
      } catch (error) {
        console.error("Lỗi fetch API:", error);
      }
    };
    fetchData();
  }, []);

  //horror film api
  useEffect(() => {
    const fetchData = async () => {
      try {
        const horrorFilmRes = await axios.get(
          "https://phimapi.com/v1/api/the-loai/kinh-di?year=2025"
        );
        const films = horrorFilmRes.data.data.items;
        setHorrorFilm(films);
        console.log(films);
      } catch (error) {
        console.error("Lỗi fetch API:", error);
      }
    };
    fetchData();
  }, []);

  //fiction film api
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fictionFilmRes = await axios.get(
          "https://phimapi.com/v1/api/the-loai/vien-tuong?year=2025"
        );
        const films = fictionFilmRes.data.data.items;
        setFictionFilm(films);
        console.log(films);
      } catch (error) {
        console.error("Lỗi fetch API:", error);
      }
    };
    fetchData();
  }, []);

  //voiceover film api
  useEffect(() => {
    const fetchData = async () => {
      try {
        const voiceOverFilmRes = await axios.get(
          "https://phimapi.com/v1/api/danh-sach/phim-long-tieng?year=2025"
        );
        const films = voiceOverFilmRes.data.data.items;
        setVoiceOverFilm(films);
        console.log(films);
      } catch (error) {
        console.error("Lỗi fetch API:", error);
      }
    };
    fetchData();
  }, []);
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const handleSearch = (e) => {
    if (e.key === "Enter" && keyword.trim() !== "") {
      navigate(`/search/${keyword}`); // chuyển sang trang search
    }
  };

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
        <div className="type">
          {cate.slice(0, 7).map((cat, index) => (
            <Link
              to={`detail/${cat.slug}`}
              style={{
                textDecoration: "none",
              }}
              component={ListFilm}
            >
              <div
                key={cat.id}
                className="cate-card"
                onMouseEnter={() => {}}
                style={{
                  backgroundImage: `url('../assets/wave.png')`,
                  backgroundColor: colors[index % colors.length],
                  backgroundBlendMode: "overlay",
                  backgroundSize: "cover", // Đảm bảo hình ảnh phủ toàn bộ
                  backgroundPosition: "center", // Căn giữa hình ảnh
                  backgroundRepeat: "no-repeat", // Không lặp lại hình ảnh
                }} //doi mau
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
              </div>
            </Link>
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
      <Countries countryMovies={countryMovies} />
      <FilmSlider title="Top 10 phim lẻ mới nhất 2025" films={featureFilm} />
      <CartoonFilm title="Anime mới nhất 2025" films={cartoonFilm} />
      <FilmSlider title="Top 10 TV Show mới nhất 2025" films={tvShow} />

      <FilmSlider title="Phim Hành Động 2025" films={actionFilm} />
      <FilmSlider title="Phim Học Đường 2025" films={schoolFilm} />
      <CartoonFilm title="Anime mới nhất 2025" films={horrorFilm} />
      <FilmSlider title="Phim Viễn Tưởng 2025" films={fictionFilm} />
      <FilmSlider title="Phim Lồng Tiếng 2025" films={voiceOverFilm} />
      <Footer />
    </>
  );
}
