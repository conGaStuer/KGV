import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
export default function CartoonFilm({ cartoonFilm }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
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
    <section className="cartoon-film-container">
      <p>Kho Tàng Anime Mới Nhất</p>
      <div className="cartoon-film-list">
        <Slider {...settings}>
          {cartoonFilm.map((cartoon) => (
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
        </Slider>
      </div>
    </section>
  );
}
