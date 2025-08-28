import React from "react";

export default function Countries({ countryMovies }) {
  // Cấu hình danh sách quốc gia
  const countryConfig = [
    { key: "han_quoc", label: "Phim Hàn Quốc mới" },
    { key: "trung", label: "Phim Trung Quốc mới" },
    { key: "viet_nam", label: "Phim Việt Nam mới" },
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
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
