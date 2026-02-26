# Quawaco Intelligent Operations Center

Quawaco Intelligent Operations Center is a comprehensive dashboard application designed for water supply management. It provides real-time monitoring, data analytics, and operational insights across multiple departments including Production, Business, Network, HR, and AI Agents.

## 🚀 Technologies Used

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** CSS Modules with custom theming (Dark/Light mode)
- **Charts:** Chart.js with react-chartjs-2
- **State Management:** React Context API

### Backend
- **Framework:** NestJS
- **Language:** TypeScript
- **Database:** SQLite (better-sqlite3)
- **ORM:** TypeORM
- **Authentication:** JWT (JSON Web Tokens)

## ✨ Key Features

- **Multi-domain Dashboard:** Dedicated views for General Operations, Production, Network, Business, and HR.
- **AI Agent Integration:** Chat interface for intelligent assistance and data querying.
- **Plant Management:** Complete CRUD operations for water treatment plants and pumping stations.
- **HR Management:** Comprehensive employee directory and management system.
- **Real-time Metrics:** KPI tracking, charts, and data visualization.
- **Dark/Light Mode:** Full theming support with glassmorphism UI elements.
- **Role-based Access:** Secure login system with JWT authentication.

## 📦 Project Structure

```
webappQuawaco/
├── frontend/          # Next.js application
│   ├── src/
│   │   ├── app/       # Next.js App Router pages
│   │   ├── components/# Reusable UI components
│   │   ├── context/   # React Context providers (Theme, Auth)
│   │   └── lib/       # Utility functions and API client
│   └── public/        # Static assets
└── backend/           # NestJS API server
    ├── src/
    │   ├── auth/      # JWT Authentication module
    │   ├── dashboard/ # Data aggregation service
    │   ├── plant/     # Plant management CRUD
    │   ├── hr/        # HR management CRUD
    │   └── seed/      # Database seeding utilities
    └── test/          # E2E tests
```

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18 or newer recommended)
- npm or yarn

### 1. Setup Backend
```bash
cd backend
npm install
# Start the development server
npm run start:dev
```
The backend API will run on `http://localhost:3001`

### 2. Setup Frontend
```bash
cd frontend
npm install
# Start the Next.js development server
npm run dev
```
The frontend application will run on `http://localhost:3000`

### 3. Login
- **Username:** admin
- **Password:** admin

## 🤝 Contributing
1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License
This project is proprietary and confidential.
