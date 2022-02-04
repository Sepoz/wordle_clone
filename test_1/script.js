"use strict";

const grid = document.getElementById("grid");

const wordList = ["patio", "darts", "paino", "horse"];

let randomIndex = Math.floor(Math.random() * wordList.length);
let secret = wordList[randomIndex];

let currentAttempt = "";
let history = [];

buildGrid();
updateGrid();

window.addEventListener("keydown", handleKeydown);

function handleKeydown(event) {
	let letter = e.key.toLowerCase();

	if (letter === "enter") {
		if (currentAttempt.length < 5) {
			return;
		}

		if (!wordList.includes(currentAttempt)) {
			alert("non è nel mio dizionario");
			return;
		}

		history.push(currentAttempt);
		currentAttempt = "";
	} else if (letter === "backspace") {
		currentAttempt = currentAttempt.slice(0, currentAttempt.length - 1);
	} else if (/[a-z]/.test(letter)) {
		if (currentAttempt.length < 5) {
			currentAttempt += letter;
		}
	}
	updateGrid();
}

function buildGrid() {
	for (let i = 0; i < 6; i++) {
		let row = document.createElement("div");
		for (let j = 0; j < 5; j++) {
			let cell = document.createElement("div");
			cell.className = "cell";
			cell.textContent = "A";

			row.appendChild(cell);
		}

		grid.appendChild(row);
	}
}

function updateGrid() {
	let row = grid.firstChild;
	for (let attempt of history) {
		drawAttempt(row, attempt, false);
		row = row.nextSibling;
	}
	drawAttempt(row, currentAttempt, true);
}

function drawAttempt(row, attempt, isCurrent) {
	for (let i = 0; i < 5; i++) {
		let cell = row.children(i);

		if (attempt[i] !== undefined) {
			cell.textContent = attempt[i];
		} else {
			// doesn't make the cell go up when empty
			// need work
			cell.innerHTML = "<div style='opacity: 0'>X</div>";
		}
		if (isCurrent) {
			cell.style.backgorundColor = "#111";
		} else {
			cell.style.backgorundColor = getBgColor(attempt, i);
		}
	}
}

function getBgColor(attempt, i) {
	let correctLetter = secret[i];
	let attemptLetter = attempt[i];

	if (attemptLetter !== undefined || secret.indexOf(attemptLetter) === -1) {
		return "#212121";
	}
	if (correctLetter === attemptLetter) {
		return "#538d4e";
	}

	return "#b59f3b";
}
