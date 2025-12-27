## 🔐 Password Security with bcrypt

This project uses **bcrypt** to securely handle user passwords during user registration and login.

### Why bcrypt?
Storing passwords in plain text is insecure and dangerous. If the database is compromised, all user passwords become exposed. **bcrypt** prevents this by hashing passwords before storing them.

bcrypt provides:
- Strong password hashing
- Automatic salting to prevent rainbow-table attacks
- Protection against brute-force attacks

---

## 📝 How bcrypt Works in This Project

### 1️⃣ Password Hashing (Registration)
When a user registers, the password is hashed using bcrypt before saving it to MongoDB.

bcrypt.hash(password, saltRounds, [callback])

```js
bcrypt.hash(password, 10)


### 2️⃣ Password Comparing (Login)
When a user login, it compares with the hashed password  using bcrypt.compare() to MongoDB.

bcrypt.compare(plainTextPassword, storedHash, [callback])

--js
bcrypt.compare(password, user.password)
