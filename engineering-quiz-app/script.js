// Global variables
const currentUser = null

// Utility functions
function showToast(message, type = "info") {
  const toast = document.createElement("div")
  toast.className = `toast toast-${type}`
  toast.textContent = message

  // Add toast styles
  toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        color: white;
        font-weight: 500;
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `

  if (type === "success") {
    toast.style.background = "#10b981"
  } else if (type === "error") {
    toast.style.background = "#ef4444"
  } else {
    toast.style.background = "#3b82f6"
  }

  document.body.appendChild(toast)

  setTimeout(() => {
    toast.style.animation = "slideOut 0.3s ease"
    setTimeout(() => {
      document.body.removeChild(toast)
    }, 300)
  }, 3000)
}

// Modal functions
function showRegisterModal() {
  document.getElementById("registerModal").style.display = "block"
  document.body.style.overflow = "hidden"
}

function showLoginModal() {
  document.getElementById("loginModal").style.display = "block"
  document.body.style.overflow = "hidden"
}

function closeModal(modalId) {
  document.getElementById(modalId).style.display = "none"
  document.body.style.overflow = "auto"
}

// Tab functions
function showTab(tabName) {
  // Hide all tabs
  document.querySelectorAll(".tab-content").forEach((tab) => {
    tab.classList.remove("active")
  })

  // Remove active class from all buttons
  document.querySelectorAll(".tab-button").forEach((btn) => {
    btn.classList.remove("active")
  })

  // Show selected tab
  document.getElementById(tabName + "Tab").classList.add("active")

  // Add active class to clicked button
  event.target.classList.add("active")
}

// Password toggle function
function togglePassword(inputId) {
  const input = document.getElementById(inputId)
  const button = input.nextElementSibling
  const icon = button.querySelector("i")

  if (input.type === "password") {
    input.type = "text"
    icon.className = "fas fa-eye-slash"
  } else {
    input.type = "password"
    icon.className = "fas fa-eye"
  }
}

// Registration functions
function handleQuickRegister(event) {
  event.preventDefault()

  const name = document.getElementById("quickName").value
  const institution = document.getElementById("institution").value
  const department = document.getElementById("quickDepartment").value

  if (!name || !institution || !department) {
    showToast("Please fill in all fields", "error")
    return
  }

  // Create user object
  const user = {
    id: Date.now().toString(),
    name: name,
    institution: institution,
    department: department,
    type: "quick",
    createdAt: new Date().toISOString(),
  }

  // Store user data
  localStorage.setItem("currentUser", JSON.stringify(user))

  showToast("Welcome! You can start taking quizzes now.", "success")

  // Redirect to dashboard
  setTimeout(() => {
    window.location.href = "dashboard.html"
  }, 1000)
}

function handleFullRegister(event) {
  event.preventDefault()

  const name = document.getElementById("fullName").value
  const email = document.getElementById("email").value
  const department = document.getElementById("fullDepartment").value
  const password = document.getElementById("password").value
  const confirmPassword = document.getElementById("confirmPassword").value

  if (!name || !email || !department || !password || !confirmPassword) {
    showToast("Please fill in all fields", "error")
    return
  }

  if (password !== confirmPassword) {
    showToast("Passwords do not match", "error")
    return
  }

  // Check if user already exists
  const existingUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]")
  if (existingUsers.find((user) => user.email === email)) {
    showToast("User already exists with this email", "error")
    return
  }

  // Create user object
  const user = {
    id: Date.now().toString(),
    name: name,
    email: email,
    department: department,
    password: password, // In real app, this should be hashed
    type: "full",
    createdAt: new Date().toISOString(),
  }

  // Store user in registered users
  existingUsers.push(user)
  localStorage.setItem("registeredUsers", JSON.stringify(existingUsers))

  showToast("Account created successfully!", "success")

  // Close modal and show login
  closeModal("registerModal")
  setTimeout(() => {
    showLoginModal()
  }, 500)
}

function handleLogin(event) {
  event.preventDefault()

  const email = document.getElementById("loginEmail").value
  const password = document.getElementById("loginPassword").value

  if (!email || !password) {
    showToast("Please fill in all fields", "error")
    return
  }

  // Check credentials
  const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]")
  const user = registeredUsers.find((u) => u.email === email && u.password === password)

  if (!user) {
    showToast("Invalid credentials", "error")
    return
  }

  // Store current user
  localStorage.setItem("currentUser", JSON.stringify(user))

  showToast("Welcome back!", "success")

  // Redirect to dashboard
  setTimeout(() => {
    window.location.href = "dashboard.html"
  }, 1000)
}

// Scroll function
function scrollToDepartments() {
  document.getElementById("departments").scrollIntoView({
    behavior: "smooth",
  })
}

// Close modals when clicking outside
window.onclick = (event) => {
  const modals = document.querySelectorAll(".modal")
  modals.forEach((modal) => {
    if (event.target === modal) {
      modal.style.display = "none"
      document.body.style.overflow = "auto"
    }
  })
}

// Add CSS animations
const style = document.createElement("style")
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`
document.head.appendChild(style)
