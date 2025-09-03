import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function SearchResult() {
  const { keyword } = useParams(); // lấy keyword từ URL
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get(
          `https://phimapi.com/api/v1/movies?search=${keyword}`
        );
        setMovies(res.data.items || []);
      } catch (err) {
        console.error("Lỗi API:", err);
      }
    };
    fetchMovies();
  }, [keyword]);

  return (
    <div className="search-page">
      <h2>Kết quả tìm kiếm cho: "{keyword}"</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        {movies.map((m) => (
          <div key={m._id} className="bg-gray-800 text-white p-3 rounded">
            <img src={m.poster_url} alt={m.name} className="rounded" />
            <p className="mt-2">{m.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
