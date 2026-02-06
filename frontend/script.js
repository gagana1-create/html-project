const API_BASE = 'http://localhost:3000';

function loginAsAdmin() {
  const userType = "admin";
  performLogin(userType);
}

function loginAsProctor() {
  const userType = "proctor";
  performLogin(userType);
}

function loginAsStudent() {
  const userType = "student";
  performLogin(userType);
}

async function performLogin(userType) {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const messageDiv = document.getElementById("message");

  // Validation
  if (!email) {
    messageDiv.innerText = "❌ Please enter email";
    messageDiv.style.color = "red";
    return;
  }

  if (!password) {
    messageDiv.innerText = "❌ Please enter password";
    messageDiv.style.color = "red";
    return;
  }

  if (!email.includes("@")) {
    messageDiv.innerText = "❌ Please enter valid email";
    messageDiv.style.color = "red";
    return;
  }

  // Show loading state
  messageDiv.innerText = "⏳ Logging in as " + userType.toUpperCase() + "...";
  messageDiv.style.color = "blue";

  const url = `${API_BASE}/login`;
  const payload = { email, password, userType };
  console.log('performLogin ->', url, payload);

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      messageDiv.style.color = "red";
      messageDiv.innerText = "❌ " + (data.message || "Login failed (" + res.status + ")");
      console.error('login failed', res.status, data);
      return;
    }

    messageDiv.style.color = "green";
    messageDiv.innerText = "✅ " + (data.message || "Login Successful as " + userType.toUpperCase() + "!");
    console.log('login success', data);
  } catch (err) {
    messageDiv.style.color = "red";
    messageDiv.innerText = "❌ Error: " + (err.message || 'Cannot connect to server.');
    console.error('fetch error', err);
  }
}

function login() {
  const userType = "user";
  performLogin(userType);
}

function autofillTest() {
  document.getElementById('email').value = 'test@a.com';
  document.getElementById('password').value = 'password123';
}
