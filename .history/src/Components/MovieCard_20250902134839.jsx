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
              <div className="poster-actions">
                <button>
                  <FontAwesomeIcon icon={faHeart} /> Watch Later
                </button>
                <button>
                  <FontAwesomeIcon icon={faPlus} /> Add To List
                </button>
                <button>
                  <FontAwesomeIcon icon={faGlobe} /> Translate
                </button>
              </div>
              <div className="poster-detail">
                <p className="detail-name">{movie.name}</p>
                <p>{movie.origin}</p>
                <p>
                  {movie.time}
                  {movie.year} - phan1 - tap 8
                </p>
                <p>the loai</p>
                <p>da chieu 8/12</p>
                <p>gioi thieu</p>

                <p>thoi luong</p>
                <p>quoc gia</p>

                <p>networks</p>

                <p>san xuat</p>

                <p>dao dien</p>
              </div>
              <div className="poster-actors">
                <p>dien vien</p>
              </div>
            </div>
            <div className="list-ep">
              <div className="list-control">
                <button>xem ngay</button>
                <i>yeu thich</i>
                <i>them vao</i>

                <i>chia se</i>

                <i>binh luan</i>
              </div>
              {episodes.map((server) => (
                <div key={server.server_name} className="episode-list">
                  <h4 style={{ color: "white", marginBottom: "4px" }}>
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
                          width: "70px",
                          height: "32px",
                          backgroundColor: "rgba(255, 255, 255, 0.1)",
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
                          (e.currentTarget.style.backgroundColor =
                            "rgb(221, 0, 0)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.backgroundColor =
                            "rgba(255, 255, 255, 0.1)")
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
