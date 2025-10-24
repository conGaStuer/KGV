import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Hls from "hls.js";
import "../styles/pages/watch.scss";
import { Link } from "react-router-dom";
import NavBar from "./NavBar.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateLeft, faRotateRight } from "@fortawesome/free-solid-svg-icons";
export default function Watch() {
  const { id, ep } = useParams();
  const videoRef = useRef(null);
  const [videoSrc, setVideoSrc] = useState(null);
  const [movie, setMovie] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [resumeTime, setResumeTime] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const [isFavorite, setIsFavorite] = useState(false);

  // 🧩 1️⃣ Lấy link phim + tiến độ xem
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`https://phimapi.com/phim/${id}`);
        const { movie, episodes } = data;
        setMovie(movie);
        setEpisodes(episodes);

        // Tìm link tập
        let found = null;
        for (const server of episodes) {
          const epFound = server.server_data.find((e) => e.slug === ep);
          if (epFound) {
            found = epFound.link_m3u8;
            break;
          }
        }
        setVideoSrc(found);

        // 🔄 Gọi API lấy thời gian xem gần nhất
        if (user) {
          const res = await axios.get(`http://localhost:5000/api/history/get`, {
            params: { user_id: user.id, movie_id: id, episode_slug: ep },
          });

          const lastTime = res.data?.current_time || res.data?.watch_time || 0; // 👈 linh hoạt key

          if (lastTime > 10) {
            setResumeTime(lastTime);
          }
          const favRes = await axios.get(
            `http://localhost:5000/api/favorite/check`,
            { params: { user_id: user.id, movie_id: id } }
          );
          setIsFavorite(favRes.data.isFavorite);
        }
      } catch (err) {
        console.error("API error:", err);
      }
    };
    fetchData();
  }, [id, ep, user]);

  // 🧩 2️⃣ Khởi tạo video khi có link
  useEffect(() => {
    if (!videoSrc || !videoRef.current) return;
    const video = videoRef.current;
    let hls;

    const setupVideo = () => {
      if (Hls.isSupported()) {
        hls = new Hls();
        hls.loadSource(videoSrc);
        hls.attachMedia(video);
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = videoSrc;
      }
    };

    setupVideo();
    return () => hls?.destroy();
  }, [videoSrc]);

  // 🧩 3️⃣ Tự động lưu tiến độ mỗi 15s
  useEffect(() => {
    if (!videoRef.current || !user) return;

    const saveProgress = () => {
      const currentTime = videoRef.current.currentTime;
      if (currentTime > 10) {
        axios.post("http://localhost:5000/api/history/save", {
          user_id: user.id,
          movie_id: id,
          episode_slug: ep,
          current_time: currentTime,
        });
      }
    };

    const interval = setInterval(saveProgress, 15000);
    return () => clearInterval(interval);
  }, [id, ep, user]);

  // 🎬 Xử lý khi user chọn “Tiếp tục xem”
  const handleContinue = () => {
    setShowPopup(false);
    videoRef.current.currentTime = resumeTime;
    videoRef.current.play();
  };

  // 🔁 Xử lý khi user chọn “Xem lại từ đầu”
  const handleRestart = () => {
    setShowPopup(false);
    videoRef.current.currentTime = 0;
    videoRef.current.play();

    axios.post("http://localhost:5000/api/history/save", {
      user_id: user.id,
      movie_id: id,
      episode_slug: ep,
      current_time: 0,
    });
  };
  useEffect(() => {
    if (resumeTime > 10) {
      setShowPopup(true);
    }
  }, [resumeTime]);
  const toggleFavorite = async () => {
    if (!user) return alert("Vui lòng đăng nhập!");
    try {
      if (isFavorite) {
        await axios.post("http://localhost:5000/api/favorite/remove", {
          user_id: user.id,
          movie_id: id,
        });
        setIsFavorite(false);
      } else {
        await axios.post("http://localhost:5000/api/favorite/add", {
          user_id: user.id,
          movie_id: id,
        });
        setIsFavorite(true);
      }
    } catch (error) {
      console.error("Favorite error:", error);
    }
  };
  return (
    <>
      <NavBar />

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
                autoplay
                style={{
                  width: "100%",
                  maxHeight: "660px",
                  backgroundColor: "#000",
                  borderRadius: "8px",
                }}
              />
              <FontAwesomeIcon
                icon={faRotateLeft}
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
              {/* <span
              style={{
                color: "white",
              }}
            >
              {" "}
              -10s
            </span> */}

              {/* <span
              style={{
                color: "white",
                position: "absolute",
                bottom: "-28px",
                left: "170px",
                fontSize: "4px",
              }}
            >
              {" "}
              +10s
            </span> */}
              <div className="watch-controls">
                <div className="control-item">
                  <button
                    onClick={toggleFavorite}
                    style={{
                      backgroundColor: isFavorite ? "red" : "#555",
                      color: "white",
                      borderRadius: "8px",
                      padding: "8px 16px",
                      marginTop: "10px",
                    }}
                  >
                    {isFavorite ? "💔 Bỏ yêu thích" : "❤️ Thêm vào yêu thích"}
                  </button>
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
                  <h2 className="title">{movie.name}</h2>
                  <p className="subtitle">{movie.origin_name}</p>

                  <div className="tags">
                    <span className="imdb">
                      IMDb <b>{movie.tmdb.vote_average}</b>
                    </span>
                    <span className="age">T18</span>
                    <span className="year">{movie.year}</span>
                    <span className="season">Season {movie.tmdb.season}</span>
                    <span className="episode">{movie.episode_current}</span>
                  </div>

                  <div className="genres">
                    {movie.category.map((mo) => (
                      <span>{mo.name}</span>
                    ))}
                  </div>

                  <div className="status">
                    <span>
                      ✔ Đã hoàn thành: {movie.episode_current} /{" "}
                      {movie.episode_total}
                    </span>
                  </div>

                  <p className="description">{movie.content}</p>

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
                  <span className="score">{movie.tmdb.vote_average}</span>
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
                    <img
                      src="https://via.placeholder.com/100x140"
                      alt="poster"
                    />
                    <div className="info">
                      <h4>Đột Kích Đài Truyền Hình</h4>
                      <p>Hoso Kyoku Senkyo</p>
                      <span>T16 • Phần 1 • Tập 6</span>
                    </div>
                  </div>

                  <div className="recommend-item">
                    <img
                      src="https://via.placeholder.com/100x140"
                      alt="poster"
                    />
                    <div className="info">
                      <h4>Hồ Sơ Bệnh Án Thứ 19</h4>
                      <p>The 19th Medical Chart</p>
                      <span>T13 • Phần 1 • Tập 3</span>
                    </div>
                  </div>

                  <div className="recommend-item">
                    <img
                      src="https://via.placeholder.com/100x140"
                      alt="poster"
                    />
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
        {showPopup && (
          <div className="resume-popup">
            <div className="popup-content">
              <p>
                Bạn đã xem đến{" "}
                <b>
                  {Math.floor(resumeTime / 60)} phút{" "}
                  {Math.floor(resumeTime % 60)} giây
                </b>
                . Tiếp tục xem?
              </p>
              <div className="popup-buttons">
                <button className="continue" onClick={handleContinue}>
                  Tiếp tục xem
                </button>
                <button className="restart" onClick={handleRestart}>
                  Xem lại từ đầu
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
