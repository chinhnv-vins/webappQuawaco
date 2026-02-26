# BÁO CÁO DỰ ÁN: TRUNG TÂM ĐIỀU HÀNH THÔNG MINH QUAWACO

## 1. TỔNG QUAN DỰ ÁN
**Tên dự án:** Quawaco Dashboard - Trung tâm Điều hành Thông minh
**Mục tiêu:** Xây dựng một nền tảng quản trị tập trung, giúp ban lãnh đạo và các cấp quản lý tại Quawaco có cái nhìn tổng quan, tức thời và chính xác nhất về mọi hoạt động của mạng lưới cấp nước trên nhiều lĩnh vực khác nhau bao gồm: Sản xuất, Mạng lưới, Kinh doanh, và Nhân sự.
**Công nghệ sử dụng:** Next.js 14, TypeScript, NestJS, SQLite, Chart.js.

## 2. KIẾN TRÚC VÀ GIAO DIỆN (UI/UX)
- **Thiết kế hiện đại:** Giao diện được thiết kế theo phong cách Glassmorphism (hiệu ứng kính mờ) mang lại trải nghiệm tương tác cao cấp, mượt mà và trực quan.
- **Dark/Light Mode:** Hệ thống hỗ trợ chuyển đổi linh hoạt giữa chế độ nền tối (Dark mode) và nền sáng (Light mode) dựa trên sở thích người dùng hoặc thời gian trong ngày.
- **Responsive Design:** Tương thích trên nhiều thiết bị từ màn hình máy tính lớn đến các thiết bị di động.

## 3. CÁC TÍNH NĂNG CỐT LÕI (CORE MODULES)

### 3.1. Phân hệ Điều hành Tổng thể (Dashboard)
- Hiển thị trực quan dữ liệu từ tất cả các phòng ban thông qua hệ thống thẻ KPI (Key Performance Indicators).
- Cung cấp các biểu đồ động (Doughnut, Bar, Line charts) thể hiện tỷ trọng doanh thu, chi phí, mức độ tiêu thụ và sản lượng.
- Có bộ lọc thời gian trực quan (chọn Năm 2024 / 2025) để so sánh đối chiếu dữ liệu giữa các kỳ báo cáo.
- Toàn bộ chỉ số tài chính được đồng bộ chuẩn hóa theo đơn vị **VNĐ**.

### 3.2. Phân hệ Quản lý Nhà máy (Plant Management)
- Số hóa toàn bộ danh sách các nhà máy cấp nước và trạm bơm trực thuộc.
- Quan sát tức thời: Công suất thiết kế vs Sản lượng thực tế, hiển thị qua thanh tiến trình (Progress bar) sinh động.
- Quản lý thông tin chi tiết: Trạng thái hoạt động (Đang hoạt động, Bảo trì, Ngừng hoạt động), thông tin người quản lý, chi phí vận hành và doanh thu mang lại của từng trạm.
- Cho phép thao tác Thêm/Sửa/Xóa dữ liệu nhà máy nhanh chóng qua giao diện hộp thoại (Modal) tinh gọn.

### 3.3. Phân hệ Quản lý Nhân sự (HR Management)
- Hệ thống hóa danh sách hồ sơ nhân viên toàn công ty.
- Tóm tắt biến động nhân sự: Tổng số nhân viên, số người đang làm việc, số người đã nghỉ việc.
- Quản lý chi tiết hồ sơ: Mã NV, Họ tên, Đơn vị, Chức vụ, Mức lương cơ bản (VNĐ), và Trạng thái làm việc.
- Module thao tác Thêm/Sửa/Xóa tích hợp hệ thống cảnh báo (Delete confirmation) an toàn cho người quản trị.

### 3.4. Phân hệ Nhân viên số - Trợ lý AI (AI Agent)
- Tích hợp trí tuệ nhân tạo dưới dạng Trợ lý ảo (Chatbot).
- Ban lãnh đạo có thể truy vấn số liệu, trích xuất báo cáo bằng ngôn ngữ tự nhiên thông qua khung chat tích hợp sẵn trên hệ thống.
- Tiết kiệm thời gian tổng hợp báo cáo thủ công.

## 4. BẢO MẬT & VẬN HÀNH
- **Đăng nhập và Phân quyền:** Sử dụng JWT (JSON Web Tokens) đảm bảo dữ liệu luôn được mã hóa và chỉ cấp quyền truy cập cho những tài khoản hợp lệ (VD: admin).
- **Tính trọn vẹn của dữ liệu:** Backend NestJS mạnh mẽ đảm bảo các luồng dữ liệu CRUD (Thêm, Đọc, Sửa, Xóa) được thực thi nhất quán và lưu trữ an toàn.

## 5. TẦM NHÌN & KẾ HOẠCH PHÁT TRIỂN TIẾP THEO
- Tích hợp kết nối trực tiếp với hệ thống IoT / SCADA tại các nhà máy để lấy dữ liệu cảm biến theo thời gian thực (Real-time IoT Streams).
- Xây dựng hệ thống dự báo AI (Predictive AI) để cảnh báo khả năng rò rỉ mạng lưới ống nước.
- Số hóa quản lý tài sản, vật tư thiết bị mạng lưới.
