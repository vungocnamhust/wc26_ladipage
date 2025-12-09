# Hướng Dẫn Cài Đặt Google Sheets Integration

## Bước 1: Tạo Google Sheet

1. Truy cập [Google Sheets](https://sheets.google.com)
2. Tạo một Sheet mới với tên: "Tour WC26 Registrations"
3. Tạo header row với các cột sau (ở dòng 1):
   - A1: Timestamp
   - B1: Họ và tên
   - C1: Số điện thoại
   - D1: Email
   - E1: Số người tham gia
   - F1: Gói tour quan tâm
   - G1: Ngày khởi hành
   - H1: Ghi chú

## Bước 2: Tạo Google Apps Script

1. Trong Google Sheet, click **Extensions > Apps Script**
2. Xóa code mặc định và paste code sau:

```javascript
function doPost(e) {
  try {
    // Lấy active spreadsheet
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parse dữ liệu từ request
    var data = JSON.parse(e.postData.contents);
    
    // Tạo row mới với dữ liệu
    var newRow = [
      data.timestamp || new Date(),
      data.fullname || '',
      data.phone || '',
      data.email || '',
      data.participants || '',
      data.tour_package || '',
      data.departure_date || '',
      data.notes || ''
    ];
    
    // Thêm row vào sheet
    sheet.appendRow(newRow);
    
    // Trả về success response
    return ContentService
      .createTextOutput(JSON.stringify({
        'status': 'success',
        'message': 'Data saved successfully'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Trả về error response
    return ContentService
      .createTextOutput(JSON.stringify({
        'status': 'error',
        'message': error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput("Google Apps Script is running!")
    .setMimeType(ContentService.MimeType.TEXT);
}
```

3. Click **Save** (icon đĩa mềm) và đặt tên project: "Tour WC26 Form Handler"

## Bước 3: Deploy Apps Script

1. Click nút **Deploy > New deployment**
2. Click icon gear ⚙️ bên cạnh "Select type"
3. Chọn **Web app**
4. Cấu hình:
   - **Description**: "Tour consultation form handler"
   - **Execute as**: Me (email của bạn)
   - **Who has access**: Anyone
5. Click **Deploy**
6. Authorize app:
   - Click **Authorize access**
   - Chọn tài khoản Google của bạn
   - Click **Advanced** > "Go to [Project Name] (unsafe)"
   - Click **Allow**
7. **QUAN TRỌNG**: Copy **Web app URL** (sẽ có dạng: `https://script.google.com/macros/s/...../exec`)

## Bước 4: Cập Nhật URL trong Website

1. Mở file `index.html`
2. Tìm dòng:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
   ```
3. Thay thế bằng URL bạn vừa copy:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
   ```
4. Lưu file

## Bước 5: Test Form

1. Mở website của bạn
2. Điền thông tin vào form
3. Click "GỬI THÔNG TIN"
4. Kiểm tra Google Sheet - dữ liệu sẽ xuất hiện trong vài giây

## Lưu Ý

### Nếu Form Không Hoạt Động:

1. **Kiểm tra Console**:
   - Mở Developer Tools (F12)
   - Tab Console
   - Xem có lỗi gì không

2. **Kiểm tra Apps Script**:
   - Vào Apps Script > View > Executions
   - Xem log để debug

3. **Kiểm tra Permissions**:
   - Đảm bảo "Who has access" = "Anyone"

### Tính Năng Nâng Cao (Optional):

#### 1. Email Notification khi có đăng ký mới:

Thêm vào cuối function `doPost`:

```javascript
// Gửi email thông báo
MailApp.sendEmail({
  to: 'your-email@example.com',
  subject: 'Đăng ký tour mới - ' + data.fullname,
  body: `
    Có khách hàng mới đăng ký tư vấn tour:
    
    Họ tên: ${data.fullname}
    Số điện thoại: ${data.phone}
    Email: ${data.email}
    Số người: ${data.participants}
    Gói tour: ${data.tour_package}
    Ngày KH: ${data.departure_date}
    Ghi chú: ${data.notes}
  `
});
```

#### 2. Auto-response email cho khách hàng:

```javascript
// Gửi email xác nhận cho khách
MailApp.sendEmail({
  to: data.email,
  subject: 'Xác nhận đăng ký tư vấn Tour World Cup 2026',
  body: `
    Kính chào ${data.fullname},
    
    Cảm ơn bạn đã quan tâm đến các tour World Cup 2026 của Capella Travel.
    
    Chúng tôi đã nhận được thông tin đăng ký của bạn:
    - Gói tour: ${data.tour_package}
    - Số người: ${data.participants}
    
    Đội ngũ tư vấn của chúng tôi sẽ liên hệ với bạn trong vòng 24h.
    
    Trân trọng,
    Capella Travel Team
  `
});
```

## Support

Nếu gặp vấn đề, check:
- Google Apps Script documentation: https://developers.google.com/apps-script
- Stack Overflow với tag `google-apps-script`
