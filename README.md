# 📚 Library Management System (MERN)

A full-stack **Library Management System** built using the MERN stack (MongoDB, Express.js, React.js, Node.js).  
The system enables efficient book management, user authentication, borrowing/return tracking, and automated notifications.

---

## 🌐 Live Demo

🚀 **Frontend:**  
https://digitallibrary11.netlify.app  

⚙️ **Backend:**  
https://library-management-system-mern-9s8j.onrender.com  

---

## ✨ Key Features

### 👤 User Features
- 🔐 Secure Authentication (JWT आधारित)
- 📚 Browse and view books
- 📖 Borrow & return books
- ⏰ Track due dates

### 👩‍💼 Admin Features
- ➕ Add / Update / Delete books
- 📊 Manage library records
- 👥 Admin controls

### ⚡ Smart Features
- 📧 Email reminder before due date (1 day prior)
- ⏳ Automatic fine calculation for late returns
- ☁️ Cloud image upload (Cloudinary)
- 🔄 Real-time book availability tracking

---

## 🔐 First Admin Bootstrap (One-Time Setup)

A secure mechanism to create the **first admin account only once**.

- Allows initial admin creation if no admin exists  
- Requires a secret setup key (stored in environment variables)  
- Automatically disables after first admin is created  
- Issues JWT token after successful setup  

### 🔒 Security Highlights
- One-time access restriction  
- Environment-based secret validation  
- Password validation  
- Role-based access for future admin creation  

---

## 🛠️ Tech Stack

**Frontend:** React.js, Redux Toolkit  
**Backend:** Node.js, Express.js  
**Database:** MongoDB (Mongoose)  
**Auth:** JWT  
**Tools:** Nodemailer, Cloudinary, Node Cron  

---

## 📂 Project Structure
Library-Management-System/
│
├── backend/
├── frontend/
└── README.md


---

## ⚙️ Setup

```bash
git clone https://github.com/your-username/library-management-system.git
cd library-management-system

### Backend
- cd backend
- npm install
- npm run dev

### Frontend
- cd frontend
- npm install
- npm start

---
### 🚧 Future Improvements
- 📱 SMS / WhatsApp notifications
- 📷 QR / Barcode scanning for books
- 💳 Online payment integration
- 🔍 Advanced search & filters

---
### 👩‍💻 Author

- Muskan Kesharwani
