## 🔐 Admin & User Login Using Props (MERN Stack)

This project implements **role-based authentication** in a MERN Stack application, where **Admin** and **User** logins are handled using **props** to control UI access and navigation.

---

## 🛠️ Tech Stack

- **Frontend:** React.js, Axios, Bootstrap
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** Role-based login (Admin / User)

---

## ⚙️ How It Works

### 1️⃣ Login Process
- The user selects a **role** (Admin or User) during login.
- Login credentials and role are sent to the backend using **Axios**.
- The backend verifies:
  - Username existence
  - Password correctness
  - Role validity

---

### 2️⃣ Backend Authentication Logic
- Separate collections (or logic) can be used for Admin and User.
- On successful login, the server returns:
  - `login: true`
  - `role: "admin"` or `"user"`

Example response:
```json
{
  "login": true,
  "role": "admin",
  "message": "Success"
}
```
