# Grovio-AI

# 📝 Markdown Notes Application

## 🚀 Overview

This is a full-stack Markdown Notes Application where users can create, edit, delete, and search notes with real-time preview.

## 🧠 Tech Stack

* Frontend: React.js
* Backend: Node.js (Express)
* Database: SQLite
* Libraries: axios, react-markdown

---

## ✨ Features

* Create, edit, delete notes
* Live Markdown preview (split screen)
* Auto-save with debounce
* Search notes
* Persistent storage using SQLite

---

## 📂 Project Structure

```
project/
├── frontend/
└── backend/
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository

```
git clone <your-repo-link>
cd project
```

---

### 2️⃣ Setup Backend

```
cd backend
npm install
node index.js
```

---

### 3️⃣ Setup Frontend

```
cd frontend
npm install
npm start
```

---

## 🌐 API Endpoints

* GET /notes → fetch all notes
* POST /notes → create note
* PUT /notes/:id → update note
* DELETE /notes/:id → delete note

---

## 🎯 Key Highlights

* Implemented debounced auto-save to optimize performance
* Clean REST API design
* Real-time markdown rendering
* Simple and user-friendly UI

---

## 📽 Demo

(Add your demo video link here)

---

## 🚀 Future Improvements

* Authentication (JWT)
* Dark mode
* Tags & categories
* Deployment

---
