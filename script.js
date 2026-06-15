let match = JSON.parse(localStorage.getItem("currentMatch"));

if (!match) {
    window.location.href = "schedule.html";
}

const team1ScoreEl = document.getElementById("team1Score");
const team2ScoreEl =
