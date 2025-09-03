import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Hls from "hls.js";
import "../styles/pages/watch.scss";

export default function Watch() {
  const { id, ep } = useParams();
  const [videoSrc, setVideoSrc] = useState(null);
  const videoRef = useRef(null);
  const [movie, setMovie] = useState(null); // 👈 lưu thông tin phim

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
          </div>
        )}
      </div>
    </div>
  );
}
