import React from "react";
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

  return (
    <section className="feature-film-container">
      <p>Top 10 phim lẻ mới nhất 2025</p>
      <div className="feature-film-list">
        <Slider {...settings}>
          {featureFilm.map((film, index) => (
            <div className="feature-list" key={film._id || film.id || index}>
              <div
                className="feature-film-bg"
                style={{
                  backgroundImage: `url(https://phimimg.com/${film.poster_url})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  transition: "all 0.4s ease",
                  borderRadius: "8px",
                  height: "250px",
                }}
              ></div>
              <div className="feature-film-info">
                <p>{index + 1}</p>
                <div className="feature-film-info-detail">
                  <h4>{film.name}</h4>
                  <h5>{film.origin_name}</h5>
                  <div className="detail-eposide">
                    <span>
                      Rating:{" "}
                      {film.tmdb?.vote_average ? film.tmdb.vote_average : "N/A"}
                    </span>
                    <span>{film.time || "Updating..."}</span>
                    <span>{film.lang || "Vietsub"}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
