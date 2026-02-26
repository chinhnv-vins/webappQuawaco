# 💧 Quawaco Dashboard - Trung tâm Điều hành Thông minh

Ứng dụng điều hành tổng thể mạng lưới cấp nước được xây dựng với **Next.js 14**, **TypeScript**, **NestJS** và **SQLite**.

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript&logoColor=white) ![NestJS](https://img.shields.io/badge/NestJS-10.0-ea2845?logo=nestjs&logoColor=white) ![SQLite](https://img.shields.io/badge/SQLite-3.0-003B57?logo=sqlite&logoColor=white)

---

## ✨ Tính năng (100% hoàn thành)

### ✅ 1. Dashboard (Điều hành đa lĩnh vực)
- ✅ Tổng quan Sản xuất, Mạng lưới, Kinh doanh, Nhân sự
- ✅ Biểu đồ trực quan (Doughnut, Bar, Line charts) với Chart.js
- ✅ Bộ lọc thời gian (Năm 2024 / Năm 2025)
- ✅ Chỉ số KPI thời gian thực, hiển thị theo VNĐ (x1000)
- ✅ Giao diện Dark/Light mode hiện đại (Glassmorphism UI)

### ✅ 2. Plant Management (Quản lý Nhà máy)
- ✅ Hiển thị danh sách nhà máy cấp nước với grid layout
- ✅ Thống kê công suất, chi phí vận hành (VNĐ) và doanh thu
- ✅ ProgressBar hiển thị tỷ lệ sử dụng công suất
- ✅ Thêm / Sửa / Xóa thông tin nhà máy
- ✅ Modals mờ (blur background) hiển thị thông tin chi tiết
- ✅ UI responsive cho mobile và desktop

### ✅ 3. HR Management (Quản lý Nhân sự)
- ✅ Danh sách hồ sơ nhân viên toàn công ty
- ✅ Thống kê số lượng nhân sự (Đang làm việc / Đã nghỉ)
- ✅ Hiển thị mức lương cơ bản (VNĐ), bộ phận, chức vụ
- ✅ Thêm / Sửa / Xóa hồ sơ nhân sự
- ✅ Delete confirmation modal an toàn

### ✅ 4. AI Agent (Nhân viên số)
- ✅ Tích hợp khung chat tương tác với trợ lý ảo bằng AI
- ✅ Giải đáp thông tin điều hành tự động

---

## 🛠 Tech Stack

| Category | Technology |
| :--- | :--- |
| **Frontend Framework** | Next.js 14 (App Router) |
| **Backend Framework** | NestJS 10.0 |
| **Language** | TypeScript |
| **Styling** | CSS Modules + Custom CSS Variables |
| **UI Library** | React 18, Chart.js (react-chartjs-2) |
| **Database** | SQLite (better-sqlite3) |
| **ORM** | TypeORM |
| **Authentication** | JWT (JSON Web Tokens) |
| **Icons & Fonts** | Google Fonts (Inter) |

---

## 📁 Project Structure

```text
webappQuawaco/
├── frontend/               # Next.js App
│   ├── src/
│   │   ├── app/            # App Router (dashboard, login, plants, hr)
│   │   ├── components/     # UI Components (Sidebar, Charts, AI Chat)
│   │   ├── context/        # ThemeContext, AuthContext
│   │   ├── lib/            # api.ts (Fetch wrappers)
│   │   └── globals.css     # CSS Variables (Dark/Light themes)
│   └── package.json
│
└── backend/                # NestJS API
    ├── src/
    │   ├── auth/           # JWT Auth Logic
    │   ├── dashboard/      # Mock data stream services
    │   ├── hr/             # HR CRUD controllers/services
    │   └── plant/          # Plant CRUD controllers/services
    └── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm hoặc yarn

### Installation

**1. Clone repository:**
```bash
git clone <repository-url>
cd webappQuawaco
```

**2. Cài đặt và chạy Backend:**
```bash
cd backend
npm install
npm run start:dev
```
*API sẽ chạy ở `http://localhost:3001/api`*

**3. Cài đặt và chạy Frontend:**
```bash
# Mở một terminal mới
cd frontend
npm install
npm run dev
```

**4. Mở browser:**
```bash
http://localhost:3000
```

> 💡 **Note:** Quá trình đăng nhập sử dụng tài khoản/mật khẩu mặc định là `admin` / `admin`. Dữ liệu nhà máy và nhân sự mẫu (sample data) sẽ tự động có sẵn từ Backend khi khởi động. 
