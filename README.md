# FIFA World Cup 2026™ NYNJ - Clean Version

Đây là phiên bản website chuẩn (không liên quan WordPress) của FIFA World Cup 2026™ Worldcup 2026 host city.

## 🚀 Chạy Website

### Yêu cầu
- Python 3.x (để chạy local server)
- Browser hiện đại (Chrome, Firefox, Safari, Edge)

### Cách chạy

```bash
# Di chuyển vào thư mục project
cd nynjfwc26-clean

# Khởi động local server
python3 -m http.server 8080

# Mở browser và truy cập
# http://localhost:8080
```

Để dừng server, nhấn `Ctrl+C`

---

## 📁 Cấu Trúc Project

```
nynjfwc26-clean/
├── index.html          # File HTML chính
├── README.md           # File mô tả này
│
├── css/                # Các file CSS
│   ├── main.css        # Styles chính của website
│   ├── fonts.css       # Định nghĩa fonts
│   ├── reset.css       # CSS reset
│   ├── theme-style.css # Theme bổ sung
│   └── swiper-bundle.min.css
│
├── js/                 # Các file JavaScript
│   ├── demo.js         # Logic chính của site
│   ├── jquery-min.js   # Thư viện jQuery
│   ├── swiper.min.js   # Carousel Swiper
│   ├── gsap.min.js     # Animations GSAP
│   ├── ScrollMagic.js  # Scroll animations
│   ├── animation.gsap.js
│   ├── imagesloaded-pkgd-min.js
│   └── jquery.countdown-timer.js
│
├── fonts/              # Custom fonts
│   ├── FWC26-UltraCondensedBold.otf
│   └── FWC26-UltraCondensedBlack.otf
│
├── images/             # Tất cả hình ảnh
│   ├── fifa-wheel.svg
│   └── 2025/           # Media được upload theo tháng
│
├── data/               # Video data files
│   └── HeaderVideo_*.mp4
│
└── videos/             # Video content bổ sung
```

---

## ✨ Tính Năng

- **Responsive Design** - Hoạt động tốt trên desktop, tablet, mobile
- **Smooth Animations** - GSAP + ScrollMagic cho hiệu ứng cuộn
- **Countdown Timer** - Đếm ngược đến FIFA World Cup 2026™
- **Video Backgrounds** - Video tự động phát ở header
- **Custom Typography** - Fonts chính thức FIFA World Cup 2026
- **Carousels** - Swiper.js slider hỗ trợ touch

---

## 🔧 Công Nghệ Sử Dụng

| Công nghệ | Mục đích |
|-----------|----------|
| HTML5 | Cấu trúc trang |
| CSS3 | Styling & animations |
| jQuery | DOM manipulation |
| Swiper.js | Touch carousels |
| GSAP | Advanced animations |
| ScrollMagic | Scroll-based effects |
| Lenis | Smooth scrolling (CDN) |
| Three.js | 3D graphics (CDN) |

---

## 🌐 CDN Dependencies Bên Ngoài

Các thư viện load từ CDN:

- **Lenis** - `cdn.jsdelivr.net/gh/studio-freight/lenis`
- **Three.js** - `cdnjs.cloudflare.com/ajax/libs/three.js`
- **Google Fonts** - `fonts.googleapis.com`

---

## ⚠️ Tính Năng Cần Backend

Các tính năng sau không hoạt động ở phiên bản static:

| Tính năng | Lý do |
|-----------|-------|
| Contact Forms | Cần PHP/Backend |
| Instagram Feed | Cần API |
| Newsletter Signup | Cần backend |
| reCAPTCHA | Cần domain verification |

---

## 📄 Các Phần Chính

1. **Preloader** - Màn hình loading
2. **Header/Navigation** - Navigation responsive
3. **Hero Section** - Video banner toàn màn hình
4. **About Section** - Thông tin sự kiện
5. **Countdown Timer** - Đếm ngày đến kickoff
6. **Match Schedule** - Lịch thi đấu NYNJ
7. **Venues** - Thông tin sân vận động
8. **Partners** - Nhà tài trợ chính thức
9. **News** - Tin tức mới nhất
10. **Footer** - Links & social media

---

## 🎨 Tùy Chỉnh

### Thay Đổi Ngày Countdown
Sửa trong `index.html`:
```javascript
$('.timer').countdownTimer('2026/06/11 12:00', function() {});
```

### Sửa Styles
Styles chính ở `css/main.css`. Theme tùy chỉnh ở `css/theme-style.css`.

---

## 📝 License

Website clone này chỉ để phát triển/xem trước local. Tất cả nội dung, hình ảnh và thương hiệu thuộc về FIFA và FIFA World Cup 2026™ NYNJ Host Committee.

---

## 🔗 Nguồn Gốc

- **Website**: [nynjfwc26.com](https://nynjfwc26.com)
- **Design**: DD.NYC®

---

## 📞 Lưu Ý

- Website này là bản **standalone hoàn toàn**, không phụ thuộc WordPress
- Tất cả assets đã được download và lưu local
- Paths đã được cập nhật để hoạt động offline
- Chỉ cần Python server hoặc bất kỳ static server nào để chạy
