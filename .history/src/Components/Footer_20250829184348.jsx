import React from "react";
import "../styles/pages/footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <a href="/hoi-dap" className="footer-link">
          Hỏi-Đáp
        </a>
        <a href="/chinh-sach-bao-mat" className="footer-link">
          Chính sách bảo mật
        </a>
        <a href="/dieu-khoan-su-dung" className="footer-link">
          Điều khoản sử dụng
        </a>
        <a href="/gioi-thieu" className="footer-link">
          Giới thiệu
        </a>
        <a href="/lien-he" className="footer-link">
          Liên hệ
        </a>
      </div>
      <div className="footer-bottom">
        <div className="footer-categories">
          <a href="/dongphim" className="footer-link">
            Đôngphim
          </a>
          <a href="/gienphim" className="footer-link">
            Gienphim
          </a>
          <a href="/motphim" className="footer-link">
            Motphim
          </a>
          <a href="/subnhan" className="footer-link">
            Subnhan
          </a>
        </div>
        <p className="footer-description">
          RoPhim - Phim hay cạo - Trang xem phim online chất lượng cao miễn phí
          Vietsub, thuyết minh, lồng tiếng full HD. Kho phim mới nhất hiện nay:
          phim bộ, phim lẻ, phim chiếu rạp, phim bộ hoàn thành từ Việt Nam, Hàn
          Quốc, Trung Quốc, Thái Lan, Nhật Bản, Âu Mỹ... đang được tải, cập nhật
          liên tục trên toàn cầu với tốc độ tuyệ vời nhất 2024 chỉ từ 4K!
        </p>
        <p className="footer-copyright">© 2024 RoPhim</p>
      </div>
    </footer>
  );
};

export default Footer;
