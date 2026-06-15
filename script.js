let match = JSON.parse(localStorage.getItem("currentMatch"));

if (!match) {
  window.location.href = "index.html";
}

// Elements
const team1ScoreEl = document.getElementById("team1Score");
const team2ScoreEl = document.getElementById("team2Score");
const inningsText = document.getElementById("inningsText");
const targetText = document.getElementById("targetText");
const matchTitle = document.getElementById("matchTitle");

// Format overs
function getOvers(balls) {
  return `${Math.floor(balls / 6)}.${balls % 6}`;
}

// Save match
function saveMatch() {
  localStorage.setItem("currentMatch", JSON.stringify(match));
}

// Update UI
function updateDisplay() {
  matchTitle.innerText = `${match.team1} vs ${match.team2}`;

  team1ScoreEl.innerText = `${match.team1}: ${match.team1Score}/${match.team1Wickets} (${getOvers(match.team1Balls)})`;

  team2ScoreEl.innerText = `${match.team2}: ${match.team2Score}/${match.team2Wickets} (${getOvers(match.team2Balls)})`;

  inningsText.innerText = `Innings ${match.innings}`;

  if (match.innings === 2) {
    targetText.innerText = `Target: ${match.target}`;
  } else {
    targetText.innerText = "";
  }

  saveMatch();
}

// Check innings end
function checkInningsEnd() {
  let maxBalls = match.overs * 6;

  if (match.innings === 1) {
    if (match.team1Balls >= maxBalls || match.team1Wickets >= 10) {
      match.target = match.team1Score + 1;

      alert(`Innings Over!\nTarget for ${match.team2}: ${match.target}`);

      match.innings = 2;

      saveMatch();
      updateDisplay();
    }
  } else {
    if (match.team2Score >= match.target) {
      let wicketsLeft = 10 - match.team2Wickets;

      finishMatch(`${match.team2} won by ${wicketsLeft} wickets`);

      return;
    }

    if (match.team2Balls >= maxBalls || match.team2Wickets >= 10) {
      let runs = match.team1Score - match.team2Score;

      finishMatch(`${match.team1} won by ${runs} runs`);

      return;
    }
  }
}

// Add runs
function addRun(runs) {
  if (match.matchFinished) return;

  if (match.innings === 1) {
    match.team1Score += runs;
    match.team1Balls++;
  } else {
    match.team2Score += runs;
    match.team2Balls++;
  }

  updateDisplay();
  checkInningsEnd();
}

// Wicket
function wicket() {
  if (match.matchFinished) return;

  if (match.innings === 1) {
    match.team1Wickets++;
    match.team1Balls++;
  } else {
    match.team2Wickets++;
    match.team2Balls++;
  }

  updateDisplay();
  checkInningsEnd();
}

// Wide / No Ball
function extraRun() {
  if (match.matchFinished) return;

  if (match.innings === 1) {
    match.team1Score++;
  } else {
    match.team2Score++;
  }

  updateDisplay();
  checkInningsEnd();
}

// Finish match
function finishMatch(result) {
  match.matchFinished = true;

  let history = JSON.parse(localStorage.getItem("matchHistory")) || [];

  history.push({
    team1: match.team1,
    team2: match.team2,
    team1Score: `${match.team1Score}/${match.team1Wickets}`,
    team2Score: `${match.team2Score}/${match.team2Wickets}`,
    result: result,
  });

  localStorage.setItem("matchHistory", JSON.stringify(history));

  localStorage.setItem("currentMatch", JSON.stringify(match));

  alert(result);
}

// Initial load
updateDisplay();
