# 📰 News & Podcast API

This is a RESTful API built with Express and MongoDB that serves curated news articles and podcast entries across multiple categories. It’s designed for frontend developers and students who need a reliable backend for learning, prototyping, or building portfolio projects.

---

## 🚀 Features

- ✅ Latest news by category (World, Politics, Business, Technology, Health, Sports, Culture)
- ✅ Latest podcasts across categories
- ✅ Pagination support for scalable data fetching
- ✅ Image and video URLs included for frontend rendering
- ✅ MongoDB Atlas integration

---

## 📦 Technologies Used

- Node.js
- Express.js
- MongoDB (via Mongoose)
- CORS
- dotenv

---

## 📂 API Endpoints

### 🔹 News
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET`  | `/api/news/latest` | Fetch latest news (supports `?page=` and `?limit=`) |

### 🔹 Podcasts
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET`  | `/api/podcasts/latest` | Fetch latest podcasts (supports `?page=` and `?limit=`) |

---

## ⚙️ Environment Variables

Create a `.env` file with the following:

```env
MONGO_URI=your-mongodb-atlas-uri


"node seed.js"

This will insert 70 news articles and 10 podcast entries across various categories.