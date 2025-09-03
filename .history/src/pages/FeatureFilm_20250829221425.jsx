import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function FeatureFilm({ featureFilm }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1 },
      },
    ],
  };
  const [activeFilm, setActiveFilm] = useState(null);

  return (
    <section className="feature-film-container">
      <p>Top 10 phim le moi nhat 2025</p>
      <div className="feature-film-list">
        <Slider {...settings}>
          {featureFilm.map((film) => (
            <div
              key={film._id}
              className="feature-list"
              onMouseEnter={() => setActiveFilm(film)}
              onMouseLeave={() => setActiveFilm(null)}
            >
              <div
                className="feature-film-bg"
                style={{
                  backgroundImage: `ur[](https://phimimg.com/${film.poster_url})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  transition: "all 0.4s ease",
                }}
              ></div>
              <div className="feature-film-info">
                <p>1</p>
                <div className="feature-film-info-detail">
                  <h4>{film.name}</h4>
                  <h5>{film.origin_name}</h5>
                  <div className="detail-eposide">
                    <span>Rating: {film.tmdb.vote_average}</span>
                    <span>{film.time}</span>
                    <span>{film.lang}</span>
                  </div>
                </div>
              </div>
              {activeFilm && activeFilm._id === film._id && (
                <div
                  className="feature-popup"
                  style={{
                    backgroundImage: `ur(https://phimimg.com/${activeFilm.poster_url})`,
                  }}
                >
                  <div className="popup-info">
                    <h2>{activeFilm.name}</h2>
                    <p>{activeFilm.origin_name}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
