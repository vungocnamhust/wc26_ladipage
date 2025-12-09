# Hướng Dẫn Debug Form Submission

## Tổng Quan

Debug logging đã được thêm vào form để giúp bạn theo dõi từng bước của quá trình gửi dữ liệu đến Google Sheets.

## Cách Sử Dụng Debug Logging

### 1. Bật/Tắt Debug Mode

Trong file `index.html`, tìm dòng:
```javascript
const DEBUG_MODE = true;  // Đang BẬT
```

- **Bật debug**: `const DEBUG_MODE = true;` (để test)
- **Tắt debug**: `const DEBUG_MODE = false;` (khi đã hoạt động tốt)

### 2. Mở Developer Console

#### Chrome/Edge:
- Nhấn `F12` hoặc `Cmd+Option+I` (Mac) hoặc `Ctrl+Shift+I` (Windows)
- Chọn tab **Console**

#### Firefox:
- Nhấn `F12` hoặc `Cmd+Option+K` (Mac) hoặc `Ctrl+Shift+K` (Windows)
- Chọn tab **Console**

#### Safari:
- Enable Developer menu: Safari > Preferences > Advanced > "Show Develop menu"
- Nhấn `Cmd+Option+C`

### 3. Test Form

1. Mở website của bạn
2. Scroll đến form section
3. **Mở Console TRƯỚC KHI submit**
4. Điền thông tin vào form
5. Click "GỬI THÔNG TIN"
6. Theo dõi logs trong Console

## Các Bước Debug Được Log

### Khi Script Load
```
[17:15:30] 🔍 FORM DEBUG: ✅ Form script initialized successfully
📦 Data: https://script.google.com/macros/s/.../exec
═══════════════════════════════════════════
```

### Khi Submit Form

#### Step 1: Thu Thập Dữ Liệu
```
[17:15:45] 🔍 FORM DEBUG: Form submit triggered
[17:15:45] 🔍 FORM DEBUG: Step 1: Collecting form data...
[17:15:45] 🔍 FORM DEBUG: Step 1 ✅: Form data collected
📦 Data: {
  fullname: "Nguyễn Văn A",
  phone: "0912345678",
  email: "test@example.com",
  participants: "4",
  tour_package: "8N7Đ New York - Xem Chung Kết",
  departure_date: "2026-06-15",
  notes: "Test",
  timestamp: "2025-12-09T10:15:45.123Z"
}
```

#### Step 2: Validation
```
[17:15:45] 🔍 FORM DEBUG: Step 2: Validating required fields...
[17:15:45] 🔍 FORM DEBUG: Step 2 ✅: All required fields validated
```

**Nếu thiếu field bắt buộc:**
```
[17:15:45] 🔍 FORM DEBUG: Step 2 ❌: Validation failed - missing fields:
📦 Data: ["fullname", "phone"]
```

#### Step 3: Chuẩn Bị Request
```
[17:15:45] 🔍 FORM DEBUG: Step 3: Preparing request to Google Sheets...
[17:15:45] 🔍 FORM DEBUG: Target URL:
📦 Data: https://script.google.com/macros/s/.../exec
[17:15:45] 🔍 FORM DEBUG: Request options:
📦 Data: {
  method: "POST",
  mode: "no-cors",
  headers: {...},
  body: "{...}"
}
```

#### Step 4: Gửi Request
```
[17:15:45] 🔍 FORM DEBUG: Step 4: Sending request to Google Apps Script...
[17:15:46] 🔍 FORM DEBUG: Step 4 ✅: Request completed in 842.50ms
[17:15:46] 🔍 FORM DEBUG: Response object:
📦 Data: {
  type: "opaque",
  status: 0,
  statusText: "",
  ok: false,
  redirected: false,
  url: ""
}
[17:15:46] 🔍 FORM DEBUG: ℹ️ Note: Using no-cors mode - response is opaque
```

#### Step 5-7: Success Flow
```
[17:15:46] 🔍 FORM DEBUG: Step 5: Showing success message...
[17:15:46] 🔍 FORM DEBUG: Step 5 ✅: Success UI updated
[17:15:46] 🔍 FORM DEBUG: Step 6: Resetting form...
[17:15:46] 🔍 FORM DEBUG: Step 6 ✅: Form reset
[17:15:46] 🔍 FORM DEBUG: Step 7: Scrolling to thank you message...
[17:15:46] 🔍 FORM DEBUG: Step 7 ✅: Scroll completed
[17:15:46] 🔍 FORM DEBUG: 🎉 FORM SUBMISSION SUCCESSFUL!
═══════════════════════════════════════════
```

### Khi Có Lỗi

```
[17:15:46] 🔍 FORM DEBUG: ❌ ERROR: Form submission failed
Error type: TypeError
Error message: Failed to fetch
Error stack: TypeError: Failed to fetch at...
[17:15:46] 🔍 FORM DEBUG: Error details:
📦 Data: {
  name: "TypeError",
  message: "Failed to fetch",
  timestamp: "2025-12-09T10:15:46.123Z"
}
═══════════════════════════════════════════
```

## Các Lỗi Thường Gặp & Cách Fix

### 1. "Failed to fetch"
**Nguyên nhân:**
- Google Apps Script URL sai
- Script chưa được deploy
- Network issue

**Cách fix:**
- Kiểm tra lại URL trong code
- Verify script đã deploy với "Anyone" access
- Test internet connection

**Debug steps:**
1. Copy GOOGLE_SCRIPT_URL từ console log
2. Paste vào browser để test trực tiếp
3. Nếu thấy "Google Apps Script is running!" → URL đúng

### 2. Response type: "opaque", status: 0
**Đây KHÔNG phải lỗi!**
- Với `mode: 'no-cors'`, response sẽ luôn là opaque
- Điều này là normal behavior
- Data vẫn được gửi đến Google Sheets

**Verify:**
- Kiểm tra Google Sheet xem có data mới không
- Nếu có → Form hoạt động tốt!

### 3. Validation failed - missing fields
**Nguyên nhân:**
- User chưa điền đủ thông tin bắt buộc
- Dropdown selector chưa được chọn

**Cách fix:**
- Alert sẽ hiển thị fields nào còn thiếu
- User cần điền đầy đủ trước khi submit

### 4. Request takes too long (>5s)
**Nguyên nhân:**
- Google Apps Script response chậm
- Network lag
- Script có vấn đề

**Debug:**
1. Check request duration trong log: `Request completed in XXXms`
2. Nếu >5000ms → có vấn đề
3. Check Apps Script execution logs

## Tips Debug Nâng Cao

### 1. Filter Logs trong Console

Chỉ xem form logs:
```javascript
// In console, type:
console.log = console.log; // Reset
// Or filter by "FORM DEBUG"
```

### 2. Copy Full Data để Test

Click vào data object trong console → Right click → Copy object
→ Paste vào text editor để inspect

### 3. Test Trực Tiếp Google Script

```bash
# Test bằng curl
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"fullname":"Test","phone":"123","email":"test@test.com","participants":"1","tour_package":"Test Tour","timestamp":"2025-12-09T10:00:00.000Z"}' \
  https://script.google.com/macros/s/.../exec
```

### 4. Monitor Network Tab

1. Mở DevTools > Network tab
2. Submit form
3. Tìm request đến `script.google.com`
4. Click vào request → xem Headers, Payload, Response

### 5. Check Apps Script Logs

1. Mở Apps Script Editor
2. Click **Executions** (icon clock)
3. Xem execution logs
4. Nếu có lỗi → sẽ hiển thị ở đây

## Production Deployment

**QUAN TRỌNG:** Khi deploy production, PHẢI tắt debug mode!

```javascript
const DEBUG_MODE = false;  // TẮT debug trong production
```

**Lý do:**
- Giảm console clutter
- Bảo mật (không expose data ra console)
- Performance tốt hơn

## Troubleshooting Checklist

- [ ] Debug mode đang BẬT?
- [ ] Console đã mở?
- [ ] Có thấy "Form script initialized"?
- [ ] Form submit có trigger logs?
- [ ] Validation pass?
- [ ] Request gửi đi?
- [ ] Response nhận được (opaque OK)?
- [ ] Data xuất hiện trong Google Sheet?

Nếu TẤT CẢ checkboxes đều ✅ → Form hoạt động HOÀN HẢO!

## Support

Nếu vẫn gặp vấn đề:
1. Copy toàn bộ console logs
2. Screenshot error (nếu có)
3. Check Google Sheet xem có data không
4. Check Apps Script execution logs
5. Liên hệ dev team với thông tin trên
