// Dashboard JavaScript
let currentUser = null
let quizResults = []

// Initialize dashboard
document.addEventListener("DOMContentLoaded", () => {
  // Check if user is logged in
  const userData = localStorage.getItem("currentUser")
  if (!userData) {
    window.location.href = "index.html"
    return
  }

  currentUser = JSON.parse(userData)
  loadUserData()
  loadQuizResults()
})

function loadUserData() {
  // Update user info in header
  document.getElementById("userName").textContent = currentUser.name

  const userMeta =
    currentUser.type === "quick"
      ? `${currentUser.institution} • ${currentUser.department}`
      : `${currentUser.email} • ${currentUser.department}`

  document.getElementById("userMeta").textContent = userMeta

  // Update welcome description
  document.getElementById("welcomeDescription").textContent =
    `Ready to test your knowledge in ${currentUser.department} engineering? Each quiz contains 50 randomly selected questions from our comprehensive question bank.`

  // Update department in stats
  document.getElementById("userDepartment").textContent =
    currentUser.department.charAt(0).toUpperCase() + currentUser.department.slice(1)

  // Update user card
  document.getElementById("userCardName").textContent = currentUser.name
  document.getElementById("userCardMeta").textContent =
    currentUser.type === "quick"
      ? `${currentUser.institution} • ${currentUser.department} Engineering`
      : `${currentUser.email} • ${currentUser.department} Engineering`

  // Load subjects
  loadSubjects()
}

function loadSubjects() {
  const subjects = {
    mechanical: [
      { name: "Thermal Engineering", color: "#3b82f6" },
      { name: "Materials Science", color: "#10b981" },
      { name: "Strength of Materials", color: "#8b5cf6" },
    ],
    electrical: [
      { name: "Electrical Machines", color: "#3b82f6" },
      { name: "Network Theory", color: "#10b981" },
      { name: "Power Systems", color: "#8b5cf6" },
    ],
    electronics: [
      { name: "Electronic Devices", color: "#3b82f6" },
      { name: "Circuit Theory", color: "#10b981" },
      { name: "Digital Electronics", color: "#8b5cf6" },
    ],
    civil: [
      { name: "Building Materials", color: "#3b82f6" },
      { name: "Surveying", color: "#10b981" },
      { name: "Fluid Mechanics", color: "#8b5cf6" },
    ],
  }

  const departmentSubjects = subjects[currentUser.department] || []
  const subjectsList = document.getElementById("subjectsList")

  subjectsList.innerHTML = departmentSubjects
    .map(
      (subject) => `
        <div class="subject-item">
            <div class="subject-dot" style="background-color: ${subject.color}"></div>
            <span>${subject.name}</span>
        </div>
    `,
    )
    .join("")
}

function loadQuizResults() {
  // Load quiz results from localStorage
  const allResults = JSON.parse(localStorage.getItem("quizResults") || "[]")
  quizResults = allResults.filter((result) => result.userId === currentUser.id)

  // Update stats
  document.getElementById("quizzesTaken").textContent = quizResults.length
  document.getElementById("totalQuizzes").textContent = quizResults.length

  // Calculate average score
  const averageScore =
    quizResults.length > 0
      ? Math.round(quizResults.reduce((sum, result) => sum + result.percentage, 0) / quizResults.length)
      : 0

  document.getElementById("averageScore").textContent = averageScore + "%"

  // Load recent results
  loadRecentResults()
}

function loadRecentResults() {
  const resultsContent = document.getElementById("resultsContent")

  if (quizResults.length === 0) {
    resultsContent.innerHTML = `
            <div class="no-results">
                <i class="fas fa-award"></i>
                <p class="no-results-title">No assessments yet</p>
                <p class="no-results-description">Take your first quiz to see results here!</p>
            </div>
        `
    return
  }

  // Sort results by date (newest first)
  const sortedResults = [...quizResults].sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt))

  const recentResults = sortedResults.slice(0, 5)

  resultsContent.innerHTML = `
        <div class="results-list">
            ${recentResults
              .map((result, index) => {
                const scoreClass = result.percentage >= 80 ? "excellent" : result.percentage >= 60 ? "good" : "poor"

                const date = new Date(result.completedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })

                return `
                    <div class="result-item">
                        <div class="result-info">
                            <div class="result-number ${scoreClass}">${index + 1}</div>
                            <div class="result-details">
                                <h4>${result.score}/${result.totalQuestions} correct</h4>
                                <p>${date}</p>
                            </div>
                        </div>
                        <div class="result-score ${scoreClass}">${result.percentage}%</div>
                    </div>
                `
              })
              .join("")}
        </div>
        ${
          quizResults.length > 5
            ? `
            <div style="text-align: center; padding-top: 1rem;">
                <p style="color: #6b7280;">And ${quizResults.length - 5} more assessments...</p>
            </div>
        `
            : ""
        }
    `
}

function startQuiz() {
  window.location.href = "quiz.html"
}

function logout() {
  localStorage.removeItem("currentUser")
  window.location.href = "index.html"
}

// Add some animations
function addAnimation(element, animationClass) {
  element.classList.add(animationClass)
  setTimeout(() => {
    element.classList.remove(animationClass)
  }, 600)
}

// Animate elements on load
window.addEventListener("load", () => {
  const elements = document.querySelectorAll(".stat-card, .section-card, .user-card")
  elements.forEach((element, index) => {
    setTimeout(() => {
      addAnimation(element, "slide-up")
    }, index * 100)
  })
})
