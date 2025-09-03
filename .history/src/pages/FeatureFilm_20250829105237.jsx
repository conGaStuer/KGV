import React from "react";

export default function FeatureFilm({ featureFilm }) {
  return (
    <section className="feature-film-container">
      <p>Top 10 phim le moi nhat 2025</p>
      <div className="feature-film-list">
        <div className="feature-list">
          <div className="feature-film-bg"></div>
          <div className="feature-film-info">
            <p>1</p>
            <div className="feature-film-info-detail">
              <h4>Film name</h4>
              <h5>Origin name</h5>
              <div className="detail-eposide">
                <span>so tap</span>
                <span>phan</span>
                <span>tap dang chieu</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
