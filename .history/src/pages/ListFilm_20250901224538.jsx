import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/pages/listfilm.scss";
import "../styles/pages/home.scss";

import Footer from "../Components/Footer.jsx";
import { Link } from "react-router-dom";
export default function SearchResult() {
  const { keyword, catSlug } = useParams();
  const [movies, setMovies] = useState([]);
  console.log(keyword);
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        let url = "";
        if (keyword) {
          url = `https://phimapi.com/v1/api/tim-kiem?keyword=${keyword}&limit=64`;
        } else if (catSlug) {
          url = `https://phimapi.com/v1/api/the-loai/${catSlug}?&limit=64`;
        }

        if (!url) return;
        const res = await axios.get(url);
        setMovies(res.data.data.items || []);

        console.log(movies);
      } catch (err) {
        console.error("Lỗi API:", err);
      }
    };
    fetchMovies();
  }, [keyword, catSlug]);
  const [activeFilm, setActiveFilm] = useState(null);

  return (
    <>
      {" "}
      <div className="list-page">
        {keyword ? (
          <h2>Kết quả tìm kiếm cho: "{keyword}"</h2>
        ) : (
          <h2>Kết quả tìm kiếm cho: "{catSlug}"</h2>
        )}

        <button className="list-film-filter">Bo loc</button>
        <div className="list-film-grid">
          {movies.map((m) => (
            <div
              key={m._id}
              className="list-film-card"
              onMouseEnter={() => setActiveFilm(m)}
              onMouseLeave={() => setActiveFilm(null)}
            >
              <Link
                to={`/detail/${m.slug}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div
                  className="list-film-bg"
                  style={{
                    backgroundImage: `url(https://phimimg.com/${m.poster_url})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    marginBottom: "6px",
                    cursor: "pointer",
                    position: "relative",
                  }}
                ></div>
                <p className="list-film-name">{m.name}</p>
                <p className="list-film-origin">{m.origin_name}</p>
              </Link>
              {activeFilm && activeFilm._id === m._id && (
                <Link
                  to={`/detail/${activeFilm.slug}`}
                  style={{ textDecoration: "none" }}
                >
                  <div className="feature-popup">
                    <div className="popup-info">
                      <div
                        className="popup-bg"
                        style={{
                          backgroundImage: `url(https://phimimg.com/${activeFilm.thumb_url})`,
                        }}
                      ></div>
                      <div className="popup-name">
                        <h3>{activeFilm.name}</h3>
                        <h5>{activeFilm.origin_name}</h5>
                      </div>
                      <div className="popup-control">
                        <button className="watch">Xem ngay</button>
                        <button className="like">Thich</button>
                      </div>
                      <div className="popup-detail">
                        <p>
                          {" "}
                          {activeFilm.tmdb.vote_average} - {activeFilm.year} -{" "}
                          {activeFilm.time}
                        </p>
                        {activeFilm.category.map((cate) => (
                          <span key={cate.id}>{cate.name} </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
