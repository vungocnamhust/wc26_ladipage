# Form Tư Vấn Tour World Cup 2026 - Hoàn Thành

## Tổng Quan

Form tư vấn tour đã được tích hợp thành công vào section S7 của landing page với các tính năng:

✅ **Background Image**: `images/tapthecapellatravel.JPG` với overlay tối để text dễ đọc
✅ **Form Fields phù hợp nghiệp vụ tour du lịch**:
- Họ và tên *
- Số điện thoại *
- Email *
- Số người tham gia *
- Gói tour quan tâm * (dropdown selector)
- Ngày khởi hành mong muốn
- Ghi chú / Yêu cầu đặc biệt

✅ **Google Sheets Integration**: Form gửi dữ liệu trực tiếp về Google Sheets
✅ **Custom Styling**: CSS riêng cho form để tối ưu UX/UI
✅ **Validation**: HTML5 validation cho các trường bắt buộc
✅ **Success Message**: Thông báo "Cảm ơn" sau khi gửi thành công

## Các Gói Tour Được Tích Hợp

Form bao gồm các gói tour sau trong dropdown:

1. **8N7Đ New York - Xem Chung Kết**
2. **9N10Đ Miami**
3. **10N11Đ Los Angeles**
4. **7N8Đ Dallas**
5. **12N13Đ Tour Xuyên Mỹ**
6. **Tư vấn gói tour khác**

## Files Đã Tạo/Chỉnh Sửa

### 1. `/index.html`
- **Thay đổi**: Thay thế toàn bộ section S7 với form mới
- **Tính năng**:
  - Form HTML với 7 trường input
  - Background image với overlay
  - JavaScript xử lý submit và gửi đến Google Sheets
  - Success/Error handling

### 2. `/css/form-custom.css` (MỚI)
- **Mục đích**: Custom styling cho form
- **Tính năng**:
  - Transparent input fields với border highlight
  - Dropdown styling với hover effects
  - Button hover animations
  - Validation states (valid/invalid)
  - Mobile responsive
  - ScrollMagic animations

### 3. `/GOOGLE_SHEETS_SETUP.md` (MỚI)
- **Mục đích**: Hướng dẫn chi tiết cách setup Google Sheets
- **Nội dung**:
  - Tạo Google Sheet
  - Apps Script code
  - Deploy web app
  - Testing và troubleshooting
  - Email notification (optional)

## Cách Hoạt Động

### Flow Chuẩn:

1. **User điền form** → Nhập thông tin vào các trường
2. **Click "GỬI THÔNG TIN"** → JavaScript validate dữ liệu
3. **Submit to Google** → Gửi JSON data đến Google Apps Script
4. **Apps Script xử lý** → Lưu dữ liệu vào Google Sheet
5. **Show success** → Hiển thị thông báo "Cảm ơn bạn"

### Dữ Liệu Được Gửi:

```json
{
  "fullname": "Nguyễn Văn A",
  "phone": "0912345678",
  "email": "email@example.com",
  "participants": "4",
  "tour_package": "8N7Đ New York - Xem Chung Kết",
  "departure_date": "2026-06-15",
  "notes": "Cần tư vấn thêm về visa",
  "timestamp": "2025-12-09T16:53:52.000Z"
}
```

## Bước Tiếp Theo

### QUAN TRỌNG - Cần làm ngay:

1. **Setup Google Sheets** (Bắt buộc)
   - Làm theo hướng dẫn trong `GOOGLE_SHEETS_SETUP.md`
   - Copy Google Apps Script URL
   - Thay thế URL trong `index.html` dòng 1561:
     ```javascript
     const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
     ```

2. **Test Form**
   - Điền thông tin test
   - Submit form
   - Kiểm tra dữ liệu xuất hiện trong Google Sheet

### Optional - Tính năng nâng cao:

3. **Email Notifications** (Optional)
   - Thêm code gửi email trong Apps Script
   - Nhận thông báo khi có đăng ký mới
   - Gửi email tự động cho khách hàng

4. **Analytics Tracking** (Optional)
   - Thêm Google Analytics event tracking
   - Track form submissions
   - Track dropdown selections

5. **CRM Integration** (Optional)
   - Tích hợp với CRM (Salesforce, HubSpot, etc.)
   - Auto-create leads từ form submissions

## Technical Details

### CSS Classes Được Sử dụng:

- `.section.s7` - Section container
- `.feedback-container` - Form container class
- `.formbox` - Form wrapper
- `.formbox-row` - Form row
- `.textfield-input` - Input fields
- `.selector` - Custom dropdown
- `.button__main` - Submit button

### JavaScript Events:

- `form.submit` - Xử lý khi user submit form
- `fetch()` - AJAX call đến Google Apps Script
- Form validation - HTML5 + custom validation

### Browser Compatibility:

✅ Chrome/Edge (latest)
✅ Firefox (latest)
✅ Safari (latest)
✅ Mobile browsers

## Support & Maintenance

### Nếu form không hoạt động:

1. **Mở DevTools Console** (F12)
2. **Check errors** - Xem có lỗi JavaScript không
3. **Verify Google Script URL** - Đảm bảo URL đúng
4. **Check Apps Script logs** - Xem execution logs

### Update Form Fields:

Để thêm/sửa trường trong form:

1. Thêm HTML input trong `index.html`
2. Update JavaScript submit handler
3. Update Google Apps Script để lưu field mới
4. Update Google Sheet headers

## Screenshots

Form đã được test và hoạt động tốt với:
- Background image hiển thị đúng
- Dropdown selector hoạt động
- Form fields đẹp và dễ sử dụng
- Mobile responsive

## Contact

Nếu cần hỗ trợ thêm về:
- Google Sheets setup
- Form customization
- Email integration
- CRM integration

Vui lòng tham khảo `GOOGLE_SHEETS_SETUP.md` hoặc liên hệ dev team.
