import React from "react";

export default function CartoonFilm({ cartoonFilmRes }) {
  return (
    <section className="cartoon-film-container">
      <p>Kho Tàng Anime Mới Nhất</p>
      <div className="cartoon-film-list">
        <div className="cartoon-film-card">
          <div className="background"></div>

          <div className="content">
            <div className="poster"></div>
            <div className="cartoon-film-info-detail">
              <div className="title">Dính Lẹo</div>
              <div className="subtitle">Together</div>
              <div className="info">T18 • 2025 • 1h 42m</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
