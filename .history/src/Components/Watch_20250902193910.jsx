import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Hls from "hls.js";
import "../styles/pages/watch.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateLeft, faRotateRight } from "@fortawesome/free-solid-svg-icons";
export default function Watch() {
  const { id, ep } = useParams();
  const [videoSrc, setVideoSrc] = useState(null);
  const videoRef = useRef(null);
  const [movie, setMovie] = useState(null); // 👈 lưu thông tin phim
  const skipTime = (seconds) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
    }
  };

  useEffect(() => {
    axios
      .get(`https://phimapi.com/phim/${id}`)
      .then((res) => {
        const { movie, episodes } = res.data;
        setMovie(movie);
        let found = null;
        for (const server of episodes) {
          for (const episode of server.server_data) {
            if (episode.slug === ep) {
              found = episode.link_m3u8; // 👈 dùng link_m3u8 thay vì link_embed
              break;
            }
          }
          if (found) break;
        }
        setVideoSrc(found);
      })
      .catch((err) => console.error("API error:", err));
  }, [id, ep]);

  useEffect(() => {
    if (videoSrc && videoRef.current) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(videoSrc);
        hls.attachMedia(videoRef.current);
        return () => hls.destroy(); // cleanup
      } else if (
        videoRef.current.canPlayType("application/vnd.apple.mpegurl")
      ) {
        videoRef.current.src = videoSrc;
      }
    }
  }, [videoSrc]);
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

  return (
    <div className="watch-page">
      <div style={{ width: "100%", margin: "0 auto" }}>
        {!videoSrc ? (
          <p>Đang tải video...</p>
        ) : (
          <div className="video-container">
            <h2 style={{ color: "white", marginBottom: "10px" }}>
              {movie?.name} {/* 👈 hiện tên phim */}
            </h2>
            <video
              ref={videoRef}
              className="video"
              controls
              style={{
                width: "100%",
                maxHeight: "660px",
                backgroundColor: "#000",
                borderRadius: "8px",
              }}
            />
            <FontAwesomeIcon
              icon={faRotateLeft}
              onClick={() => skipTime(-10)}
              style={{
                position: "absolute",
                bottom: "-28px",
                left: "140px",
                background: "rgba(0,0,0,0.5)",
                color: "white",
                border: "none",
                borderRadius: "50%",
                fontSize: "18px",
                cursor: "pointer",
              }}
            />
            <span
              style={{
                color: "white",
              }}
            >
              {" "}
              -10s
            </span>
            <FontAwesomeIcon
              icon={faRotateRight}
              onClick={() => skipTime(10)}
              style={{
                position: "absolute",
                bottom: "-28px",
                left: "170px",
                background: "rgba(0,0,0,0.5)",
                color: "white",
                border: "none",
                borderRadius: "50%",
                fontSize: "18px",
                cursor: "pointer",
              }}
            />
            <span
              style={{
                color: "white",
                position: "absolute",
                bottom: "-28px",
                left: "170px",
              }}
            >
              {" "}
              +10s
            </span>
            <div className="watch-controls">
              <div className="control-item">
                <i className="icon">♥</i>
                <span>Yêu thích</span>
              </div>

              <div className="control-item">
                <i className="icon">＋</i>
                <span>Thêm vào</span>
              </div>

              <div className="control-item toggle">
                <span>Chuyển tập</span>
                <button className="switch on">ON</button>
              </div>

              <div className="control-item toggle">
                <span>Rạp phim</span>
                <button className="switch off">OFF</button>
              </div>

              <div className="control-item">
                <i className="icon">✈</i>
                <span>Chia sẻ</span>
              </div>

              <div className="control-item">
                <i className="icon">📡</i>
                <span>Xem chung</span>
              </div>

              <div className="control-item report">
                <i className="icon">🚩</i>
                <span>Báo lỗi</span>
              </div>
            </div>
            <div className="movie-info">
              <div
                className="poster"
                style={{
                  backgroundImage: `url(${movie.poster_url})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center 20%",
                  backgroundRepeat: "no-repeat",
                }}
              ></div>

              <div className="details">
                <h2 className="title">Thanh Gươm Diệt Quỷ</h2>
                <p className="subtitle">Demon Slayer</p>

                <div className="tags">
                  <span className="imdb">
                    IMDb <b>8.6</b>
                  </span>
                  <span className="age">T18</span>
                  <span className="year">2019</span>
                  <span className="season">Phần 5</span>
                  <span className="episode">Tập 8</span>
                </div>

                <div className="genres">
                  <span>Hành Động</span>
                  <span>Hoạt Hình</span>
                  <span>Kỳ Ảo</span>
                  <span>Phiêu Lưu</span>
                </div>

                <div className="status">
                  <span>✔ Đã hoàn thành: 8 / 8 tập</span>
                </div>

                <p className="description">
                  Demon Slayer: Kimetsu no Yaiba là một bộ truyện tranh Nhật
                  Bản...
                </p>

                <Link to="" className="more-info">
                  <p> Thông tin phim ›</p>
                  <span style={{ color: "white" }}>{movie.content}</span>
                </Link>
              </div>
            </div>
            <div className="right-controls">
              <div className="control-item">
                <i className="icon">⭐</i>
                <span>Đánh giá</span>
              </div>

              <div className="control-item">
                <i className="icon">💬</i>
                <span>Bình luận</span>
              </div>

              <div className="rating-box">
                <span className="score">9.0</span>
                <Link href="#">Đánh giá</Link>
              </div>
            </div>
            {episodes.map((server) => (
              <div key={server.server_name} className="episode-list">
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "6px",
                    marginBottom: "12px",
                    paddingLeft: "15px",
                    paddingBottom: "35px",
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
                        (e.currentTarget.style.color =
                          "   rgba(254, 207, 89, 1)")
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
            <div className="page-container">
              {/* LEFT - Comment Section */}
              <div className="comment-section">
                {/* Header */}
                <div className="comment-header">
                  <h3>Bình luận (16)</h3>
                  <div className="tabs">
                    <button className="active">Bình luận</button>
                    <button>Đánh giá</button>
                  </div>
                </div>

                {/* Comment Box */}
                <div className="comment-box">
                  <textarea placeholder="Viết bình luận"></textarea>
                  <div className="comment-actions">
                    <div className="spoiler-toggle">
                      <input type="checkbox" id="spoiler" />
                      <label htmlFor="spoiler">Tiết lộ?</label>
                    </div>
                    <button className="send-btn">Gửi</button>
                  </div>
                </div>

                {/* Comment List */}
                <div className="comment-list">
                  <div className="comment-item">
                    <div className="avatar">
                      <img src="https://i.pravatar.cc/40" alt="avatar" />
                    </div>
                    <div className="comment-content">
                      <div className="user-info">
                        <span className="name">diệu linh hoàng</span>
                        <span className="time">7 ngày trước</span>
                        <span className="episode">P.5 - Tập 1</span>
                      </div>
                      <div className="text">
                        sao phần 5 kh giống phần 4 v mn
                      </div>
                      <div className="actions">
                        <button>👍 4</button>
                        <button>Trả lời</button>
                        <button>Thêm</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT - Recommended Movies */}
              <div className="recommend-section">
                <h3>Đề xuất cho bạn</h3>

                <div className="recommend-item">
                  <img src="https://via.placeholder.com/100x140" alt="poster" />
                  <div className="info">
                    <h4>Đột Kích Đài Truyền Hình</h4>
                    <p>Hoso Kyoku Senkyo</p>
                    <span>T16 • Phần 1 • Tập 6</span>
                  </div>
                </div>

                <div className="recommend-item">
                  <img src="https://via.placeholder.com/100x140" alt="poster" />
                  <div className="info">
                    <h4>Hồ Sơ Bệnh Án Thứ 19</h4>
                    <p>The 19th Medical Chart</p>
                    <span>T13 • Phần 1 • Tập 3</span>
                  </div>
                </div>

                <div className="recommend-item">
                  <img src="https://via.placeholder.com/100x140" alt="poster" />
                  <div className="info">
                    <h4>Anh Hùng Bất Tỉnh Và Công Chúa Ám Sát</h4>
                    <p>The Shy Hero and the Assassin Princesses</p>
                    <span>T16 • Phần 1 • Tập 1</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
