# 🧑‍🎓 Student Management App

A simple web application for managing students, built with:

- 🐹 **Go + Gin + GORM** (REST API)
- 🐘 **PostgreSQL** (Database)
- ⚛️ **React + Vite + TypeScript** (Frontend)
- 🎨 Basic CSS for minimal styling

---

## ✅ Features

- View all students
- Add new students
- Edit existing students
- Delete students
- Reusable form for add/edit
- Basic visual style via `App.css`

---

## 📦 Project Structure

```
student-app/
├── backend/              # Go API
│   ├── main.go
│   └── go.mod
├── frontend/             # React app
│   ├── src/
│   │   ├── components/
│   │   │   └── StudentList.tsx
│   │   ├── App.tsx
│   │   └── App.css
│   └── vite.config.ts
└── README.md
```

---

## 🛠️ Requirements

- [Go](https://golang.org/dl/) ≥ 1.20
- [Node.js](https://nodejs.org/) ≥ 18
- [PostgreSQL](https://www.postgresql.org/)
- (optional) [Homebrew](https://brew.sh/) for macOS users

---

## 🚀 How to Run Locally

### 🐘 1. Database

Ensure PostgreSQL is running and create the database:

```bash
createdb studentdb
```

> ⚠️ Make sure the `dsn` in `main.go` matches your local PostgreSQL user.

---

### 🐹 2. Backend (Go)

```bash
cd backend
go run main.go
```

API will be available at: [http://localhost:8080](http://localhost:8080)

---

### ⚛️ 3. Frontend (React)

```bash
cd frontend
npm install
npm run dev
```

App will be available at: [http://localhost:5173](http://localhost:5173)

---

## 📋 Data Model

```go
type Student struct {
  ID    uint   `json:"id" gorm:"primaryKey"`
  Name  string `json:"name"`
  Grade int    `json:"grade"`
}
```

---

## 🔮 Potential Improvements

- Form validation
- UI error handling
- Confirmation dialog before deleting
- Pagination and search
- Better styling with Tailwind or MUI
- Unit tests for backend

---

## 👤 Author

Built by [Carlos] as a technical interview project.
