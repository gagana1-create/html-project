# Mock Login API

This is a minimal mock backend for the frontend login page. It accepts POST /login JSON requests and responds with success when the password is `password123`.

Run:

```bash
cd backend
npm install
npm start
```

By default the server listens on port `3000`. The frontend expects `http://localhost:3000/login`.
