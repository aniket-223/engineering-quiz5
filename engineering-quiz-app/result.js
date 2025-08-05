// Result page JavaScript
let currentResult = null

document.addEventListener("DOMContentLoaded", () => {
  loadResult()
})

function loadResult() {
  // Get result from localStorage
  const resultData = localStorage.getItem("currentResult")
  if (!resultData) {
    // Try to get from URL parameter
    const urlParams = new URLSearchParams(window.location.search)
    const resultId = urlParams.get("resultId")

    if (resultId) {
      // Find result in stored results
      const allResults = JSON.parse(localStorage.getItem("quizResults") || "[]")
      currentResult = allResults.find((result) => result.id === resultId)
    }

    if (!currentResult) {
      window.location.href = "dashboard.html"
      return
    }
  } else {
    currentResult = JSON.parse(resultData)
    // Clear the temporary result data
    localStorage.removeItem("currentResult")
  }

  displayResult()
}

function displayResult() {
  // Update score display
  const scorePercentage = document.getElementById("scorePercentage")
  const scoreDetails = document.getElementById("scoreDetails")
  const scoreBadge = document.getElementById("scoreBadge")
  const completionTime = document.getElementById("completionTime")

  // Animate score reveal
  scorePercentage.classList.add("score-reveal")

  // Set score color and badge
  const scoreClass = getScoreClass(currentResult.percentage)
  scorePercentage.className = `score-percentage ${scoreClass}`
  scorePercentage.textContent = currentResult.percentage + "%"

  scoreDetails.textContent = `${currentResult.score} out of ${currentResult.totalQuestions} questions correct`

  // Set badge
  scoreBadge.className = `score-badge ${scoreClass}`
  scoreBadge.textContent = getPerformanceMessage(currentResult.percentage)

  // Set completion time
  const date = new Date(currentResult.completedAt)
  completionTime.textContent = `Completed on ${date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })}`

  // Display subject performance
  displaySubjectPerformance()
}

function getScoreClass(percentage) {
  if (percentage >= 80) return "excellent"
  if (percentage >= 60) return "good"
  return "poor"
}

function getPerformanceMessage(percentage) {
  if (percentage >= 90) return "Excellent! Outstanding performance!"
  if (percentage >= 80) return "Great job! Very good performance!"
  if (percentage >= 70) return "Good work! Above average performance!"
  if (percentage >= 60) return "Fair performance. Keep practicing!"
  return "Needs improvement. Consider reviewing the topics."
}

function displaySubjectPerformance() {
  const subjectStats = document.getElementById("subjectStats")

  // Calculate subject-wise performance
  const subjectPerformance = {}

  currentResult.questions.forEach((question, index) => {
    if (!subjectPerformance[question.subject]) {
      subjectPerformance[question.subject] = {
        correct: 0,
        total: 0,
      }
    }

    subjectPerformance[question.subject].total++

    if (currentResult.answers[index] === question.correctAnswer) {
      subjectPerformance[question.subject].correct++
    }
  })

  // Create subject performance HTML
  const subjectHTML = Object.entries(subjectPerformance)
    .map(([subject, stats]) => {
      const percentage = Math.round((stats.correct / stats.total) * 100)
      const scoreClass = getScoreClass(percentage)

      return `
            <div class="subject-stat">
                <div class="subject-stat-header">
                    <span class="subject-name">${subject}</span>
                    <span class="subject-score">${stats.correct}/${stats.total} (${percentage}%)</span>
                </div>
                <div class="subject-progress">
                    <div class="subject-progress-fill ${scoreClass}" 
                         style="--target-width: ${percentage}%; width: 0%"></div>
                </div>
            </div>
        `
    })
    .join("")

  subjectStats.innerHTML = subjectHTML

  // Animate progress bars
  setTimeout(() => {
    document.querySelectorAll(".subject-progress-fill").forEach((fill) => {
      const targetWidth = fill.style.getPropertyValue("--target-width")
      fill.style.width = targetWidth
      fill.classList.add("progress-animate")
    })
  }, 500)
}

function submitRemarks() {
  const remarksText = document.getElementById("remarksText").value.trim()

  if (!remarksText) {
    showToast("Please enter your remarks before submitting.", "error")
    return
  }

  // Create remarks object
  const remarks = {
    id: Date.now().toString(),
    resultId: currentResult.id,
    remarks: remarksText,
    submittedAt: new Date().toISOString(),
  }

  // Save remarks
  const allRemarks = JSON.parse(localStorage.getItem("quizRemarks") || "[]")
  allRemarks.push(remarks)
  localStorage.setItem("quizRemarks", JSON.stringify(allRemarks))

  showToast("Remarks submitted successfully!", "success")

  // Clear the textarea
  document.getElementById("remarksText").value = ""
}

function takeAnotherQuiz() {
  window.location.href = "quiz.html"
}

function goToDashboard() {
  window.location.href = "dashboard.html"
}

// Toast notification function
function showToast(message, type = "info") {
  const toast = document.createElement("div")
  toast.className = `toast toast-${type}`
  toast.textContent = message

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
      if (document.body.contains(toast)) {
        document.body.removeChild(toast)
      }
    }, 300)
  }, 3000)
}
