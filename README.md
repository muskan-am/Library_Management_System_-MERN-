# 📚 Library Management System (MERN)

A full-stack **Library Management System** built using the MERN stack (MongoDB, Express.js, React.js, Node.js).  
This system helps manage books, users, and transactions efficiently with features like authentication, email reminders, and fine calculation.

---

## 🌐 Live Demo

🚀 **Frontend (User Interface):**  
👉 https://digitallibrary11.netlify.app  

⚙️ **Backend API:**  
👉 https://library-management-system-mern-9s8j.onrender.com  

---

## ✨ Key Features

### 👤 User Features
- 🔐 Secure Authentication (Login / Register using JWT)
- 📚 View available books
- 📖 Borrow and return books
- ⏰ Track issued books and due dates

### 👩‍💼 Admin Features
- ➕ Add new books
- ✏️ Update book details
- ❌ Delete books
- 📊 Manage all library records

### ⚡ Smart System Features
- 📧 **Email Reminder System**  
  → Users receive an email reminder **1 day before due date** to return books

- ⏳ **Automatic Fine Calculation**  
  → Late returns automatically calculate fines

- 🔄 Borrow & Return Management  
  → Tracks book availability in real-time

- ☁️ Cloud Image Upload  
  → Managed using Cloudinary

---

## 🛠️ Tech Stack

### 🔹 Backend
- Node.js
- Express.js

### 🔹 Database
- MongoDB (Mongoose)

### 🔹 Authentication
- JWT (JSON Web Token)

### 🔹 Tools
- Nodemailer (Emails)
- Cloudinary (Image Storage)
- Node Cron (Scheduled Jobs)

### 🔹 Deployment
- Netlify (Frontend)
- Render (Backend)

---
## 🚧 Future Improvements

- 📩 **Multi-Channel Notifications**
  - Daily alerts via SMS, WhatsApp, and Email
  - Reminders for due dates and overdue books

- 📱 **Barcode / QR Code Integration**
  - Generate QR/Barcode for each book
  - Quick issue/return using scanner
  - Useful for college libraries

- 💳 **Online Payment Integration**
  - Support for fine payment via UPI / Card
  - Automatic fine deduction system

- ⏰ **Smart Due Date Tracking**
  - Show due date at the time of book issue
  - Automatic fine calculation after due date
  - Full charge applied after one month delay

- 📊 **Advanced Notifications System**
  - Reminder before due date
  - Alerts after overdue
  - Daily status updates to users
 
  ---

  ## 📂 Project Structure
  Library-Management-System/
│
├── backend/
├── frontend/
└── README.md


---

## ⚙️ Installation & Setup

### Clone Repo
```bash
git clone https://github.com/your-username/library-management-system.git
cd library-management-system

###  Backend Setup
cd backend
npm install
npm run dev

### Frontend Setup
cd frontend
npm install
npm start
---
## 📌 API Endpoints
| Method | Endpoint       | Description   |
| ------ | -------------- | ------------- |
| GET    | /api/books     | Get all books |
| POST   | /api/books     | Add book      |
| PUT    | /api/books/:id | Update book   |
| DELETE | /api/books/:id | Delete book   |

  ## 👩‍💻 Author

 -   Muskan Kesharwani
