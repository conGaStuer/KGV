import React from "react";

export default function FeatureFilm({ featureFilm }) {
  return (
    <section className="feature-film-container">
      <p>Top 10 phim le moi nhat 2025</p>
      <div className="feature-film-list">
        {featureFilm.slice(0, 5).map((film) => (
          <div className="feature-list">
            <div className="feature-film-bg"></div>
            <div className="feature-film-info">
              <p>1</p>
              <div className="feature-film-info-detail">
                <h4>{film.name}</h4>
                <h5>{origin.origin_name}</h5>
                <div className="detail-eposide">
                  <span>{film.tmdb.vote_average}</span>
                  <span>{film.time}</span>
                  <span>{film.lang}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
