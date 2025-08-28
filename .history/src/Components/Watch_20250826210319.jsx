import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Hls from "hls.js";
import "../styles/pages/watch.scss";

export default function Watch() {
  const { id, ep } = useParams();
  const [videoSrc, setVideoSrc] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    axios
      .get(`https://phimapi.com/phim/${id}`)
      .then((res) => {
        const episodes = res.data.episodes;
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
    <div style={{ width: "100%", height: "auto", margin: "0 auto" }}>
      {!videoSrc ? (
        <p>Đang tải video...</p>
      ) : (
        <video
          ref={videoRef}
          controls
          style={{
            width: "100%",
            maxHeight: "540px",
            backgroundColor: "#000",
            borderRadius: "8px",
          }}
        />
      )}
    </div>
  );
}
