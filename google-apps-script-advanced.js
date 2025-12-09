/**
 * Google Apps Script - Advanced Version
 * Với Email Notifications cho cả Admin và Customer
 */

// ============================================
// CONFIGURATION - Thay đổi các thông tin sau
// ============================================

const CONFIG = {
    // Email của admin nhận thông báo
    adminEmail: 'admin@capellatravel.com',

    // Tên công ty
    companyName: 'Capella Travel',

    // Thông tin liên hệ
    contactPhone: '1900-xxxx',
    contactEmail: 'info@capellatravel.com',
    contactWebsite: 'https://capellatravel.com',

    // Sheet name (tên sheet trong Google Sheets)
    sheetName: 'Tour Registrations'
};

/**
 * Xử lý POST request từ form
 */
function doPost(e) {
    try {
        // Parse dữ liệu từ request
        var data = JSON.parse(e.postData.contents);

        // Lưu vào Google Sheet
        saveToSheet(data);

        // Gửi email cho admin
        sendAdminNotification(data);

        // Gửi email xác nhận cho khách hàng
        sendCustomerConfirmation(data);

        // Trả về success response
        return ContentService
            .createTextOutput(JSON.stringify({
                'status': 'success',
                'message': 'Đã nhận thông tin đăng ký thành công'
            }))
            .setMimeType(ContentService.MimeType.JSON);

    } catch (error) {
        Logger.log('Error: ' + error.toString());

        // Trả về error response
        return ContentService
            .createTextOutput(JSON.stringify({
                'status': 'error',
                'message': error.toString()
            }))
            .setMimeType(ContentService.MimeType.JSON);
    }
}

/**
 * Lưu dữ liệu vào Google Sheet
 */
function saveToSheet(data) {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(CONFIG.sheetName);

    // Nếu sheet chưa tồn tại, tạo mới
    if (!sheet) {
        sheet = ss.insertSheet(CONFIG.sheetName);

        // Tạo header row
        sheet.appendRow([
            'Timestamp',
            'Họ và tên',
            'Số điện thoại',
            'Email',
            'Số người',
            'Gói tour',
            'Ngày KH',
            'Ghi chú',
            'Status'
        ]);

        // Format header
        sheet.getRange(1, 1, 1, 9).setFontWeight('bold')
            .setBackground('#FFCC05')
            .setFontColor('#10164F');
    }

    // Thêm dữ liệu mới
    var newRow = [
        new Date(data.timestamp),
        data.fullname || '',
        data.phone || '',
        data.email || '',
        data.participants || '',
        data.tour_package || '',
        data.departure_date || '',
        data.notes || '',
        'New' // Status mặc định
    ];

    sheet.appendRow(newRow);

    // Auto-resize columns
    sheet.autoResizeColumns(1, 9);
}

/**
 * Gửi email thông báo cho Admin
 */
function sendAdminNotification(data) {
    var subject = '🎫 Đăng ký tour mới - ' + data.fullname;

    var htmlBody = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #FFCC05; color: #10164F; padding: 20px; text-align: center; }
        .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #10164F; }
        .value { color: #333; margin-top: 5px; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        .urgent { background: #ff9800; color: white; padding: 10px; border-radius: 5px; margin-bottom: 15px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>🎫 ĐĂNG KÝ TƯ VẤN TOUR MỚI</h2>
          <p>World Cup 2026</p>
        </div>
        
        <div class="content">
          <div class="urgent">
            ⚡ Khách hàng cần được liên hệ trong vòng 24h
          </div>
          
          <div class="field">
            <div class="label">👤 Họ và tên:</div>
            <div class="value">${data.fullname}</div>
          </div>
          
          <div class="field">
            <div class="label">📞 Số điện thoại:</div>
            <div class="value">${data.phone}</div>
          </div>
          
          <div class="field">
            <div class="label">📧 Email:</div>
            <div class="value">${data.email}</div>
          </div>
          
          <div class="field">
            <div class="label">👥 Số người tham gia:</div>
            <div class="value">${data.participants} người</div>
          </div>
          
          <div class="field">
            <div class="label">🎯 Gói tour quan tâm:</div>
            <div class="value"><strong>${data.tour_package}</strong></div>
          </div>
          
          ${data.departure_date ? `
          <div class="field">
            <div class="label">📅 Ngày khởi hành mong muốn:</div>
            <div class="value">${data.departure_date}</div>
          </div>
          ` : ''}
          
          ${data.notes ? `
          <div class="field">
            <div class="label">📝 Ghi chú:</div>
            <div class="value">${data.notes}</div>
          </div>
          ` : ''}
          
          <div class="field">
            <div class="label">⏰ Thời gian đăng ký:</div>
            <div class="value">${new Date(data.timestamp).toLocaleString('vi-VN')}</div>
          </div>
        </div>
        
        <div class="footer">
          <p>Email này được gửi tự động từ hệ thống đăng ký tour World Cup 2026</p>
          <p>${CONFIG.companyName} | ${CONFIG.contactPhone} | ${CONFIG.contactEmail}</p>
        </div>
      </div>
    </body>
    </html>
  `;

    MailApp.sendEmail({
        to: CONFIG.adminEmail,
        subject: subject,
        htmlBody: htmlBody
    });
}

/**
 * Gửi email xác nhận cho Khách hàng
 */
function sendCustomerConfirmation(data) {
    var subject = '✅ Xác nhận đăng ký tư vấn Tour World Cup 2026';

    var htmlBody = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #FFCC05 0%, #FFD93D 100%); color: #10164F; padding: 30px; text-align: center; }
        .content { background: #ffffff; padding: 30px; border: 1px solid #ddd; }
        .highlight { background: #FFF9E6; padding: 15px; border-left: 4px solid #FFCC05; margin: 20px 0; }
        .info-box { background: #f9f9f9; padding: 15px; border-radius: 5px; margin: 15px 0; }
        .footer { background: #10164F; color: white; padding: 20px; text-align: center; }
        .button { display: inline-block; background: #FFCC05; color: #10164F; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 10px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 Cảm ơn bạn đã quan tâm!</h1>
          <p style="font-size: 18px;">Tour World Cup 2026</p>
        </div>
        
        <div class="content">
          <p>Kính chào <strong>${data.fullname}</strong>,</p>
          
          <p>Chúng tôi đã nhận được thông tin đăng ký tư vấn tour của bạn. Đội ngũ chuyên viên tư vấn của ${CONFIG.companyName} sẽ liên hệ với bạn trong vòng <strong>24 giờ làm việc</strong>.</p>
          
          <div class="highlight">
            <strong>📋 THÔNG TIN ĐĂNG KÝ CỦA BẠN</strong>
          </div>
          
          <div class="info-box">
            <p><strong>🎯 Gói tour:</strong> ${data.tour_package}</p>
            <p><strong>👥 Số người:</strong> ${data.participants} người</p>
            ${data.departure_date ? `<p><strong>📅 Ngày khởi hành:</strong> ${data.departure_date}</p>` : ''}
          </div>
          
          <div class="highlight">
            <strong>💡 ĐIỀU BẠN CẦN BIẾT</strong>
            <ul>
              <li>Visa Mỹ cần làm trước 3-6 tháng</li>
              <li>Vé xem trận đấu được đảm bảo 100%</li>
              <li>Hỗ trợ làm hộ chiếu, visa toàn quốc</li>
              <li>Hướng dẫn viên tiếng Việt suốt hành trình</li>
            </ul>
          </div>
          
          <p style="text-align: center;">
            <a href="${CONFIG.contactWebsite}" class="button">Xem Chi Tiết Các Gói Tour</a>
          </p>
          
          <p>Nếu bạn có bất kỳ câu hỏi nào, đừng ngần ngại liên hệ với chúng tôi:</p>
          <ul>
            <li>📞 Hotline: ${CONFIG.contactPhone}</li>
            <li>📧 Email: ${CONFIG.contactEmail}</li>
            <li>🌐 Website: ${CONFIG.contactWebsite}</li>
          </ul>
        </div>
        
        <div class="footer">
          <p><strong>${CONFIG.companyName}</strong></p>
          <p>Chuyên tổ chức tour du lịch World Cup 2026</p>
          <p style="font-size: 12px; margin-top: 15px;">Email này được gửi tự động. Vui lòng không reply.</p>
        </div>
      </div>
    </body>
    </html>
  `;

    MailApp.sendEmail({
        to: data.email,
        subject: subject,
        htmlBody: htmlBody
    });
}

/**
 * Test function để test email
 */
function testEmails() {
    var testData = {
        timestamp: new Date().toISOString(),
        fullname: 'Nguyễn Văn A',
        phone: '0912345678',
        email: 'test@example.com',
        participants: '4',
        tour_package: '8N7Đ New York - Xem Chung Kết',
        departure_date: '2026-06-15',
        notes: 'Cần tư vấn thêm về visa'
    };

    sendAdminNotification(testData);
    sendCustomerConfirmation(testData);

    Logger.log('Test emails sent successfully!');
}

/**
 * Handle GET requests (for testing)
 */
function doGet(e) {
    return ContentService
        .createTextOutput("Google Apps Script is running! POST to this URL to submit form data.")
        .setMimeType(ContentService.MimeType.TEXT);
}
