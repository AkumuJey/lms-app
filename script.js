// scripts.js
document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("register-form");
  const loginForm = document.getElementById("login-form");
  const logoutForm = document.getElementById("logout-form");

  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(registerForm);
    const username = formData.get("username");
    const password = formData.get("password");
    const email = formData.get("email");
    const full_name = formData.get("full_name");
    try {
      const response = await fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, email, full_name }),
      });
      if (response.ok) {
        alert("Registration successful");
      } else {
        alert("Registration failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(loginForm);
    const username = formData.get("username");
    const password = formData.get("password");
    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        window.location.href = "/dashboard";
      } else {
        alert("Invalid username or password");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });

  logoutForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/logout", {
        method: "POST",
      });
      if (response.ok) {
        alert("Logout successful");
      } else {
        alert("Logout failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });

  // Check if the current page is the course content page
  if (window.location.pathname === "/course-content") {
    // Call the fetchCourseContent function
    fetchCourseContent();
  }

  // Check if the current page is the course content page
  if (window.location.pathname === "/leader-board") {
    // Fetch course content from server
    fetchLeaderboardData();
  }

  // Check if the current page is the course content page
  if (window.location.pathname === "/dashboard") {
    //fetch Logged in user's full name
    console.log("Hello");
    fetchFullName();
  }
});
