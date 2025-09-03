import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function FeatureFilm({ featureFilm }) {
  // Cấu hình slider
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1, // Hiển thị 1 slide (mỗi slide chứa 5 phim)
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  // Chia mảng featureFilm thành các nhóm 5 phim
  const chunkArray = (array, size) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };

  const filmChunks = chunkArray(featureFilm, 5);

  return (
    <section className="feature-film-container">
      <p>Top 10 phim le moi nhat 2025</p>
      <div className="feature-film-list">
        <Slider {...settings}>
          {filmChunks.map((chunk, index) => (
            <div key={index} className="feature-slide">
              {chunk.map((film) => (
                <div key={film.id} className="feature-list">
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
                    <p>{index * 5 + chunk.indexOf(film) + 1}</p>{" "}
                    {/* Số thứ tự */}
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
                </div>
              ))}
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
