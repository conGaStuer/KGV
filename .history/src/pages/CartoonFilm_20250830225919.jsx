import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function CartoonFilm({ cartoonFilm }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // mặc định hiển thị 3 phim
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 },
      },
    ],
  };
  const [activeFilm, setActiveFilm] = useState(null);

  return (
    <section className="cartoon-film-container">
      <p>Kho Tàng Anime Mới Nhất</p>
      <div className="cartoon-film-list">
        <Slider {...settings}>
          {cartoonFilm.map((cartoon) => (
            <div
              key={cartoon._id}
              className="cartoon-film-card"
              onMouseEnter={() => setActiveFilm(cartoon)}
              onMouseLeave={() => setActiveFilm(null)}
            >
              <div
                className="background"
                style={{
                  backgroundImage: `url(https://phimimg.com/${cartoon.thumb_url})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  transition: "all 0.4s ease",
                }}
              />
              <div className="content">
                <div
                  className="poster"
                  style={{
                    backgroundImage: `url(https://phimimg.com/${cartoon.poster_url})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    transition: "all 0.4s ease",
                  }}
                />
                <div className="cartoon-film-info-detail">
                  <div className="title">{cartoon.name}</div>
                  <div className="subtitle">{cartoon.origin_name}</div>
                  <div className="info">
                    <span>Rating: {cartoon.tmdb.vote_average}</span>
                    <span>{cartoon.time}</span>
                    <span>{cartoon.lang}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {activeFilm && activeFilm._id === cartoon._id && (
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
                <div className="popup-control">
                  <button className="watch">Xem ngay</button>
                  <button className="like">Thich</button>
                </div>
                <div className="popup-detail">
                  <p>
                    {" "}
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
        </Slider>
      </div>
    </section>
  );
}
