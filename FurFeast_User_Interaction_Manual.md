# 🐾 Furfeast

**Furfeast** is a full-stack web application designed to manage donations and distributions for animal welfare, especially tailored for the Regina Humane Society.

---

## 📦 Project Structure

```
furfeast/
├── backend/        # Node.js + Express + MongoDB (Mongoose)
├── frontend/       # React + Chakra UI + Zustand
└── README.md
```

---

## ⚙️ Technologies

### Backend
- Node.js, Express, Mongoose
- JWT Authentication with Refresh Token (via Cookies)
- Role & Permission-based access
- Swagger for API Docs
- Centralized error handling with Winston logging

### Frontend
- React 19, React Router
- Zustand for state management
- Chakra UI
- Axios, React Hook Form, Yup/Zod

---

## 🚀 Getting Started

### 🧰 Prerequisites
- Node.js v18+
- MongoDB running locally or via Atlas

### 🛠 Backend Setup

```bash
cd backend
npm install
cp .env.example .env # or manually create .env
```

**.env content**
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/furfeast
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
ACCESS_TOKEN_EXPIRE=15m
REFRESH_TOKEN_EXPIRE=7d
```

**Start the server**
```bash
npm run start
```

Server runs on: `http://localhost:5000`

Swagger docs at: `http://localhost:5000/api-docs`

---

### 🎨 Frontend Setup

```bash
cd frontend
npm install
npm start
```

App will be served at: `http://localhost:3000`

---

## 📘 API Endpoints (Backend)

- `POST /auth/register` – register a user
- `POST /auth/login` – login and receive tokens
- `GET /inventory` – list all inventory
- `POST /requests` – create a donation/distribution request
- `GET /dashboard/stats` – aggregated dashboard data

> Full Swagger documentation available at `/api-docs`

---

## 🧪 Scripts

### Backend
- `npm run start` – runs with `nodemon`
- `npm run test` – placeholder for test setup

### Frontend
- `npm start` – start dev server
- `npm run build` – builds for production

---

## 👨‍💻 Development Notes

- Default roles are initialized when the server boots
- Token-based auth: access token in memory, refresh token in HTTP-only cookie
- Structured logging using `winston` + daily rotate files

---

## 🤝 Contributing

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/awesome`)
3. Commit your changes (`git commit -m 'feat: add awesome'`)
4. Push to the branch (`git push origin feature/awesome`)
5. Open a Pull Request

---

## 📄 License

MIT

---

