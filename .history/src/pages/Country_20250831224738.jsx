import React from "react";
import { Link } from "react-router-dom";

export default function Countries({ countryMovies }) {
  // Cấu hình danh sách quốc gia
  const countryConfig = [
    { key: "han_quoc", label: "Phim Hàn Quốc mới" },
    { key: "trung_quoc", label: "Phim Trung Quốc mới" },
    { key: "au_my", label: "Phim Au My mới" },
  ];

  return (
    <div className="countries">
      <div className="country">
        {countryConfig.map((c) => (
          <div key={c.key} className="country-side">
            {/* Tiêu đề */}
            <div className="country-tag">
              <p>{c.label}</p>
              <span>Xem toàn bộ</span>
            </div>

            {/* Danh sách phim */}
            <div className="country-list-film">
              {countryMovies[c.key]?.slice(0, 3).map((m) => (
                <div key={m._id} className="country-film">
                  <Link to={`/detail/${m.slug}`}>
                    <div
                      className="film-bg"
                      style={{
                        backgroundImage: `url(https://phimimg.com/${m.thumb_url})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        transition: "all 0.4s ease",
                      }}
                    />
                    <div className="film-info">
                      <h4>{m.name}</h4>
                      <h5>{m.origin_name}</h5>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
