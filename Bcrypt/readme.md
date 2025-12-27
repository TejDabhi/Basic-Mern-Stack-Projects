📝 How bcrypt Works in This Project
1️⃣ Password Hashing (Registration)

When a user registers, the password is hashed using bcrypt before saving it to MongoDB.

Syntax:

bcrypt.hash(password, saltRounds)


Example:

bcrypt.hash(password, 10)

2️⃣ Password Comparison (Login)

When a user logs in, the entered password is compared with the stored hashed password using bcrypt.compare().

Syntax:

bcrypt.compare(plainTextPassword, storedHash)


This ensures that passwords are never stored or compared in plain text, improving application security.

--js
bcrypt.compare(password, user.password)
