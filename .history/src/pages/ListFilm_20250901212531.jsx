import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

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
          <div key={m._id} className="film-card">
            <img src={m.poster_url} alt={m.name} />
            <p className="mt-2">{m.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
