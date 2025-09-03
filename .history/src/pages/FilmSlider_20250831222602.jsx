import React, { useState } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function FilmSlider({ title, films }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  const [activeFilm, setActiveFilm] = useState(null);

  return (
    <section className="feature-film-container">
      <p>{title}</p>
      <div className="feature-film-list">
        <Slider {...settings}>
          {films.map((film) => (
            <div
              key={film._id}
              className="feature-list"
              onMouseEnter={() => setActiveFilm(film)}
              onMouseLeave={() => setActiveFilm(null)}
              onClick={() => console.log("Click:", film.slug)} // hoặc navigate(`/detail/${film.slug}`)
              style={{ cursor: "pointer" }}
            >
              <div
                className="feature-film-bg"
                style={{
                  backgroundImage: `url(https://phimimg.com/${film.poster_url})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
              <div className="feature-film-info">
                <h4>{film.name}</h4>
                <h5>{film.origin_name}</h5>
              </div>

              {activeFilm && activeFilm._id === film._id && (
                <div className="feature-popup">
                  <div className="popup-info">
                    <div
                      className="popup-bg"
                      style={{
                        backgroundImage: `url(https://phimimg.com/${activeFilm.thumb_url})`,
                      }}
                    ></div>
                    <div className="popup-name">
                      <h2>{activeFilm.name}</h2>
                      <p>{activeFilm.origin_name}</p>
                    </div>
                    <div className="popup-detail">
                      <p>
                        {activeFilm.tmdb.vote_average} - {activeFilm.year} -{" "}
                        {activeFilm.time}
                      </p>
                      {activeFilm.category.map((cate) => (
                        <span key={cate.id}>{cate.name} </span>
                      ))}
                    </div>
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
