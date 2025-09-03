import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faUserGroup,
  faPlus,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/pages/moviecard.scss";
export default function MovieCard() {
  const { id } = useParams(); // slug
  const [movie, setMovie] = useState(null);
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    axios
      .get(`https://phimapi.com/phim/${id}`)
      .then((res) => {
        setMovie(res.data.movie);
        setEpisodes(res.data.episodes);
      })
      .catch((err) => console.log(err));
  }, [id]);

  if (!movie) return <p>Đang tải...</p>;

  return (
    <div className="home-landingg">
      <div
        className="thumbnail"
        style={{
          height: "400px",
          width: "100%",
          backgroundImage: `url(${movie.thumb_url})`,
          backgroundSize: "cover",
          backgroundPosition: "center 20%",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      <div className="home-thumbb">
        <div className="thumb-info">
          <h3>{movie.name}</h3>
          <div className="info-detail">
            <span>{movie.year}</span>
            <button>
              <FontAwesomeIcon icon={faHeart} className="icon" /> Watch Later
            </button>
            <button>
              <FontAwesomeIcon icon={faUserGroup} className="icon" /> Invite
              Friends
            </button>
          </div>
        </div>

        <div className="thumb-list">
          <div className="list-movie">
            <div className="movie-poster-card">
              <div
                className="poster-image"
                style={{
                  backgroundImage: `url(${movie.poster_url})`,
                }}
              ></div>

              <div className="poster-detail">
                <p className="detail-name">{movie.name}</p>
                <p className="detail-origin">{movie.origin_name}</p>
                <p>
                  <span className="badge">{movie.time}</span>
                  <span className="badge">{movie.year}</span>
                  <span className="badge">Phần 1</span>
                  <span className="badge">Tập 8</span>
                </p>
                <p>
                  Thể loại:{" "}
                  <span className="highlight">Hành Động, Hoạt Hình</span>{" "}
                </p>
                <p className="highlight highlight2">Đã chiếu: 8/12</p>
                <div className="texture">
                  <p>
                    Giới thiệu: <span className="text">Lorem ipsum...</span>{" "}
                  </p>
                  <p>
                    Thời lượng: <span className="text">Lorem ipsum...</span>
                  </p>
                  <p>
                    Quốc gia: <span className="text">Lorem ipsum...</span>
                  </p>
                  <p>
                    Networks: <span className="text">Lorem ipsum...</span>
                  </p>
                  <p>
                    Sản xuất: <span className="text">Lorem ipsum...</span>
                  </p>
                  <p>
                    Đạo diễn: <span className="text">Lorem ipsum...</span>
                  </p>
                </div>
              </div>

              <div className="poster-actors">
                <p>dien vien</p>
              </div>
            </div>
            <div className="list-ep">
              <div className="list-control">
                <button className="btn-play">▶ Xem Ngay</button>

                <div className="control-item">
                  <i className="icon">♥</i>
                  <span>Yêu thích</span>
                </div>

                <div className="control-item">
                  <i className="icon">＋</i>
                  <span>Thêm vào</span>
                </div>

                <div className="control-item">
                  <i className="icon">✈</i>
                  <span>Chia sẻ</span>
                </div>

                <div className="control-item">
                  <i className="icon">💬</i>
                  <span>Bình luận</span>
                </div>

                <div className="rating">
                  <span className="rating-score">9.0</span>
                  <span className="rating-text">Đánh giá</span>
                </div>
              </div>

              {episodes.map((server) => (
                <div key={server.server_name} className="episode-list">
                  <h4 style={{ color: "white", marginBottom: "20px" }}>
                    {server.server_name}
                  </h4>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "6px",
                      marginBottom: "12px",
                    }}
                  >
                    {server.server_data.map((ep) => (
                      <Link
                        key={ep.slug}
                        to={`/watch/${movie.slug}/${ep.slug}`}
                        style={{
                          width: "150px",
                          height: "52px",
                          backgroundColor: "#282b3a",
                          color: "white",
                          borderRadius: "6px",
                          fontSize: "14px",
                          textDecoration: "none",
                          margin: "3px",
                          display: "flex", // bật flexbox
                          alignItems: "center", // căn giữa theo chiều dọc
                          justifyContent: "center",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.color = "rgba(255, 47, 47, 1)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.color = "white")
                        }
                      >
                        {ep.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
