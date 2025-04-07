// script.js

let currentSemester = 1;
const form = document.getElementById("cgpa-form");
const semesterInputs = document.getElementById("semester-inputs");
const overallCGPADisplay = document.getElementById("overall-cgpa");
const popup = document.getElementById("popup");
const popupMessage = document.getElementById("popup-message");
let allSemesters = [];

const sound = new Audio("https://cdn.pixabay.com/download/audio/2022/03/15/audio_a3b6eecba1.mp3");
const congratsSound = new Audio("https://cdn.pixabay.com/download/audio/2022/10/03/audio_8b7e83956b.mp3"); // Congratulatory sound

form.addEventListener("submit", function (e) {
  e.preventDefault();
  semesterInputs.innerHTML = "";
  allSemesters = [];
  const numberOfSemesters = parseInt(document.getElementById("semesters").value);

  for (let i = 1; i <= numberOfSemesters; i++) {
    const semesterDiv = document.createElement("div");
    semesterDiv.className = "bg-gray-800 p-4 rounded shadow-lg fade-in";
    semesterDiv.innerHTML = `
      <h2 class="text-xl font-bold mb-2">Semester ${i}</h2>
      <label for="courses-${i}" class="block mb-1">Number of Courses:</label>
      <input type="number" id="courses-${i}" class="text-black border border-gray-400 p-2 w-full mb-3 glow-input" min="1" required>
      <button onclick="addCourses(${i})" class="bg-blue-600 text-white px-4 py-2 rounded">Add Courses</button>
      <div id="courses-container-${i}" class="mt-4"></div>
    `;
    semesterInputs.appendChild(semesterDiv);
  }
});

function addCourses(sem) {
  const numCourses = parseInt(document.getElementById(`courses-${sem}`).value);
  const container = document.getElementById(`courses-container-${sem}`);
  container.innerHTML = "";
  for (let i = 1; i <= numCourses; i++) {
    container.innerHTML += `
      <div class="mb-3">
        <label class="block mb-1">Course ${i}:</label>
        <input type="text" placeholder="Enter Course Code" class="text-black border border-gray-400 p-2 w-full rounded mb-1" required>
        <input type="number" placeholder="Enter Credits" class="text-black border border-gray-400 p-2 w-full rounded mb-1" required>
        <select class="text-black border border-gray-400 p-2 w-full rounded">
          <option value="10">O</option>
          <option value="9">A+</option>
          <option value="8">A</option>
          <option value="7">B+</option>
          <option value="6">B</option>
          <option value="5">C</option>
          <option value="4">D</option>
          <option value="0">F</option>
        </select>
      </div>
    `;
  }
  container.innerHTML += `<button onclick="calculateSemesterCGPA(${sem})" class="mt-2 bg-green-600 text-white px-4 py-2 rounded">Calculate Semester ${sem} CGPA</button>`;

  const numberOfSemesters = parseInt(document.getElementById("semesters").value);
  if (numberOfSemesters > 1 && !document.getElementById("overall-button")) {
    const calculateOverallBtn = document.createElement("button");
    calculateOverallBtn.id = "overall-button";
    calculateOverallBtn.textContent = "🎓 Calculate Overall CGPA";
    calculateOverallBtn.className = "shiny-button text-white p-2 mt-4 rounded w-full hover:opacity-90";
    calculateOverallBtn.onclick = () => {
      const overall = calculateOverallCGPA();
      if (!isNaN(overall)) {
        overallCGPADisplay.innerHTML = `🎯 Overall CGPA: <span class='text-yellow-300'>${overall.toFixed(2)}</span>`;
        showPopup(`🎯 Congratulations! Overall CGPA: ${overall.toFixed(2)}`);
        congratsSound.play();
      }
    };

    const manualDownloadBtn = document.createElement("button");
    manualDownloadBtn.id = "manual-pdf";
    manualDownloadBtn.textContent = "⬇ Download PDF";
    manualDownloadBtn.className = "bg-purple-600 text-white p-2 mt-2 rounded w-full hover:bg-purple-700";
    manualDownloadBtn.onclick = () => downloadAsPDF();

    semesterInputs.appendChild(calculateOverallBtn);
    semesterInputs.appendChild(manualDownloadBtn);
  }
}

function calculateSemesterCGPA(sem) {
  const inputs = document.querySelectorAll(`#courses-container-${sem} input, #courses-container-${sem} select`);
  let totalCredits = 0;
  let totalPoints = 0;

  for (let i = 0; i < inputs.length; i += 3) {
    const credit = parseFloat(inputs[i + 1].value);
    const grade = parseFloat(inputs[i + 2].value);
    if (!isNaN(credit) && !isNaN(grade)) {
      totalCredits += credit;
      totalPoints += credit * grade;
    }
  }

  const cgpa = totalPoints / totalCredits;
  if (!isNaN(cgpa)) {
    allSemesters[sem - 1] = { totalPoints, totalCredits };
    showPopup(`Semester ${sem} CGPA: ${cgpa.toFixed(2)}`);
    sound.play();
  } else {
    showPopup("Please enter valid inputs.");
  }
}

function calculateOverallCGPA() {
  let overallCredits = 0;
  let overallPoints = 0;
  allSemesters.forEach((s) => {
    overallCredits += s.totalCredits;
    overallPoints += s.totalPoints;
  });

  const overallCGPA = overallPoints / overallCredits;
  return overallCGPA;
}

function showPopup(message) {
  popupMessage.textContent = message;
  popup.classList.remove("hidden");
  popup.classList.add("popup-animate");
  setTimeout(() => {
    popup.classList.remove("popup-animate");
    popup.classList.add("hidden");
  }, 4000);
}

function toggleDarkMode() {
  document.body.classList.toggle("light-mode");
}

function downloadAsPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.html(document.body, {
    callback: function (doc) {
      doc.save("cgpa_result.pdf");
    },
    x: 10,
    y: 10,
    width: 180,
    windowWidth: document.body.scrollWidth
  });
}

function downloadResult() {
  if (allSemesters.length === 0) {
    showPopup("Please calculate at least one semester CGPA before downloading.");
    return;
  }

  let resultText = "📘 CGPA Result Summary\n\n";
  allSemesters.forEach((sem, index) => {
    const semCGPA = sem.totalPoints / sem.totalCredits;
    resultText += `Semester ${index + 1}: CGPA = ${semCGPA.toFixed(2)}\n`;
  });

  const overall = calculateOverallCGPA();
  resultText += `\n🎯 Overall CGPA: ${overall.toFixed(2)}\n\nDesigned by Nani Hanumanthu`;

  const blob = new Blob([resultText], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "CGPA_Result.txt";
  link.click();
}

document.getElementById("undo-button").addEventListener("click", () => {
  semesterInputs.innerHTML = "";
  document.getElementById("semesters").value = "";
  overallCGPADisplay.innerHTML = "";
  allSemesters = [];
});
