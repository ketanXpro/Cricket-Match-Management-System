let score = 0;
let wickets = 0;
let balls = 0;

function updateScore() {
  let overs = Math.floor(balls / 6) + "." + (balls % 6);

  document.getElementById("scoreDisplay").innerHTML =
    score + "/" + wickets + " (" + overs + ")";
}

function addRun(run) {
  score += run;
  balls++;
  updateScore();
}

function wicket() {
  wickets++;
  balls++;
  updateScore();
}

function extraRun(type) {
  score++;

  updateScore();
}

function startMatch() {
  let team1 = document.getElementById("team1").value;
  let team2 = document.getElementById("team2").value;
  let overs = document.getElementById("overs").value;

  localStorage.setItem("team1", team1);
  localStorage.setItem("team2", team2);
  localStorage.setItem("overs", overs);

  window.location.href = "scoreboard.html";
}
