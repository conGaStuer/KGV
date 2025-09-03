import React from "react";

export default function CartoonFilm({ horrorFilm }) {
  return (
    <section className="cartoon-film-container">
      <p>Đừng xem , đái đóoooooo</p>
      <div className="cartoon-film-list">
        {horrorFilm.slice(0, 3).map((cartoon) => (
          <div className="cartoon-film-card">
            <div
              className="background"
              style={{
                backgroundImage: `url(https://phimimg.com/${cartoon.thumb_url})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                transition: "all 0.4s ease",
              }}
            ></div>

            <div className="content">
              <div
                className="poster"
                style={{
                  backgroundImage: `url(https://phimimg.com/${cartoon.poster_url})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  transition: "all 0.4s ease",
                }}
              ></div>
              <div className="cartoon-film-info-detail">
                <div className="title">{cartoon.name}</div>
                <div className="subtitle">{cartoon.origin_name}</div>
                <div className="info">
                  {" "}
                  <span>Rating: {cartoon.tmdb.vote_average}</span>
                  <span>{cartoon.time}</span>
                  <span>{cartoon.lang}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
