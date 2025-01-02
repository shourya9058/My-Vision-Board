const phases = [
    {
      title: "Phase 1: January - February 2024",
      subtitle: "Exam Focus & Foundation",
      status: "current",
      icon: "📚",
      goals: [
        "Focus on college exams (Jan 4-21)",
        "Review HTML/CSS fundamentals",
        "Start learning JavaScript basics after exams",
        "Set up development environment",
        "Create GitHub account and learn Git basics",
      ],
    },
    {
      title: "Phase 2: March - May 2024",
      subtitle: "Frontend Development",
      icon: "💻",
      goals: [
        "Master JavaScript fundamentals",
        "Learn React.js fundamentals",
        "Build 3 frontend projects",
        "Start learning TypeScript",
        "Basic responsive design patterns",
      ],
    },
    {
      title: "Phase 3: June - August 2024",
      subtitle: "Backend Development",
      icon: "🧠",
      goals: [
        "Learn Node.js and Express",
        "Database fundamentals (MongoDB/SQL)",
        "Build 2 full-stack applications",
        "API development and integration",
        "Learn authentication & authorization",
      ],
    },
    {
      title: "Phase 4: September - October 2024",
      subtitle: "DSA & Interview Prep",
      icon: "🎯",
      goals: [
        "Start DSA fundamentals",
        "Daily LeetCode practice",
        "System design basics",
        "Build portfolio website",
        "Update GitHub with projects",
      ],
    },
    {
      title: "Phase 5: November - December 2024",
      subtitle: "Internship Hunt",
      icon: "💼",
      goals: [
        "Apply for internships",
        "Mock interviews practice",
        "Network on LinkedIn",
        "Contribute to open source",
        "Technical interview preparation",
      ],
    },
  ];

  // Load completed tasks from localStorage
  let completedTasks =
    JSON.parse(localStorage.getItem("completedTasks")) || {};

  function updateProgress(phaseIndex) {
    const phase = phases[phaseIndex];
    const totalTasks = phase.goals.length;
    const completedCount = phase.goals.filter(
      (_, goalIndex) => completedTasks[`${phaseIndex}-${goalIndex}`]
    ).length;

    const progress = Math.round((completedCount / totalTasks) * 100);

    // Update progress bar
    const progressBar = document.querySelector(
      `#phase-${phaseIndex} .progress`
    );
    progressBar.style.width = `${progress}%`;

    // Update stats
    const stats = document.querySelector(
      `#phase-${phaseIndex} .phase-stats`
    );
    stats.innerHTML = `
            <span>Completed: ${completedCount}/${totalTasks}</span>
            <span>Progress: ${progress}%</span>
        `;
  }

  function toggleTask(phaseIndex, goalIndex, checkbox) {
    const taskId = `${phaseIndex}-${goalIndex}`;
    completedTasks[taskId] = checkbox.checked;
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
    updateProgress(phaseIndex);
  }

  function createPhaseCard(phase, index) {
    return `
            <div class="phase-card">
                <div class="phase-header" onclick="togglePhase(${index})">
                    <div class="phase-icon">${phase.icon}</div>
                    <div class="phase-title">
                        <h2>${phase.title}</h2>
                        <p>${phase.subtitle}</p>
                    </div>
                    ${
                      phase.status === "current"
                        ? '<span class="current-phase">Current Phase</span>'
                        : ""
                    }
                </div>
                <div class="phase-content" id="phase-${index}">
                    <div class="phase-stats">
                        <span>Completed: 0/${phase.goals.length}</span>
                        <span>Progress: 0%</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress" style="width: 0%"></div>
                    </div>
                    <ul class="goals-list">
                        ${phase.goals
                          .map(
                            (goal, goalIndex) => `
                            <li>
                                <input type="checkbox" 
                                    class="goal-checkbox" 
                                    id="task-${index}-${goalIndex}"
                                    ${
                                      completedTasks[
                                        `${index}-${goalIndex}`
                                      ]
                                        ? "checked"
                                        : ""
                                    }
                                    onclick="event.stopPropagation(); toggleTask(${index}, ${goalIndex}, this)">
                                <label class="goal-label" for="task-${index}-${goalIndex}">${goal}</label>
                            </li>
                        `
                          )
                          .join("")}
                    </ul>
                </div>
            </div>
        `;
  }

  function togglePhase(index) {
    const content = document.getElementById(`phase-${index}`);
    const allContents = document.querySelectorAll(".phase-content");

    allContents.forEach((el, i) => {
      if (i !== index) {
        el.classList.remove("active");
      }
    });

    content.classList.toggle("active");
    if (content.classList.contains("active")) {
      updateProgress(index);
    }
  }

  // Initialize vision board
  document.getElementById("phases").innerHTML = phases
    .map((phase, index) => createPhaseCard(phase, index))
    .join("");

  // Initialize progress for all phases
  phases.forEach((_, index) => updateProgress(index));