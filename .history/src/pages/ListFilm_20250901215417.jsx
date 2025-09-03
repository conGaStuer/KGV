import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/pages/listfilm.scss";
import { Link } from "react-router-dom";
export default function SearchResult() {
  const { keyword } = useParams();
  const [movies, setMovies] = useState([]);
  console.log(keyword);
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get(
          `https://phimapi.com/v1/api/tim-kiem?keyword=${keyword}`
        );
        setMovies(res.data.data.items || []);
        console.log(movies);
      } catch (err) {
        console.error("Lỗi API:", err);
      }
    };
    fetchMovies();
  }, [keyword]);

  return (
    <div className="list-page">
      <h2>Kết quả tìm kiếm cho: "{keyword}"</h2>
      <button>Bo loc</button>
      <div className="list-film-grid">
        {movies.map((m) => (
          <div key={m._id} className="list-film-card">
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
          </div>
        ))}
      </div>
    </div>
  );
}
