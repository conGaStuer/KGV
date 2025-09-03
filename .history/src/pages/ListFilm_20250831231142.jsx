import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function SearchResult() {
  const { keyword } = useParams();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async (query) => {
      try {
        console.log("Đang search:", query);

        const response = await axios.get(
          `https://phimapi.com/v1/api/tim-kiem?keyword=${encodeURIComponent(
            query
          )}`
        );

        console.log("Kết quả API:", response.data);

        setMovies(response.data.data?.items || []); // tùy cấu trúc JSON
      } catch (error) {
        console.error("Lỗi khi search:", error);
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
