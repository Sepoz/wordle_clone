document.addEventListener("DOMContentLoaded", () => {
	createSquares();

	let guessedWords = [[]];
	let availableSpace = 1;

	let word = "dairy";
	let guessedWordCount = 0;

	const keys = document.querySelectorAll("keyboard-row button");

	function getCurrentWordArr() {
		const numberOfGuessedWords = guessedWords.length;
		return guessedWords[numberOfGuessedWords - 1];
	}

	function updateGuessedWords(letter) {
		const currentWordArr = getCurrentWordArr();

		if (currentWordArr && currentWordArr.length < 5) {
			currentWordArr.push(letter);

			const availableSpaceEl = document.getElementById(
				String(availableSpace)
			);
			availableSpace = availableSpace + 1;

			availableSpaceEl.textContent = letter;
		}
	}

	function getTileColor(letter, index) {
		const isCorrectLetter = word.includes(letter);

		if (!isCorrectLetter) {
			return "rgb(58, 58, 60)";
		}

		const letterInThatPosition = word.charAt(index);
		const isCorrectPosition = letter === letterInThatPosition;

		if (isCorrectPosition) {
			return "rgb(181, 159, 59)";
		}
	}

	function handleSubmitWord() {
		const currentWordArr = getCurrentWordArr();
		if (currentWordArr.length !== 5) {
			window.alert("La parola deve essere di 5 lettere");
		}

		const currentWord = currentWordArr.join("");
		const firstLetterID = guessedWordCount * 5 + 1;
		const interval = 200;

		currentWordArr.forEach((letter, index) => {
			setTimeout(() => {
				const titleColor = getTileColor(letter, index);
				const letterID = firstLetterID + index;
				const letterEl = document.getElementById(letterID);
				letterEl.classList.add("animate__flipInX");
				letter.style = `background-color: ${titleColor}; border-color: ${titleColor}`;
			}, interval * index);
		});

		guessedWordCount += 1;

		if (currentWord === word) {
			window.alert("Congratulazioni");
		}

		if (guessedWords.length === 6) {
			window.alert("Hai terminato le prove");
		}

		guessedWords.push([]);
	}

	function createSquares() {
		const gameBoard = document.getElementById("board");

		for (let i = 0; i < 30; i++) {
			let square = document.createElement("div");
			square.classList.add("square");
			square.classList.add("animate__animated");
			square.setAttribute("id", index + 1);
			gameBoard.appendChild(square);
		}
	}

	for (let i = 0; i < keys.length; i++) {
		keys[i].onclick = ({ target }) => {
			const letter = target.getAttribute("data-key");

			if (letter === "enter") {
				handleSubmitWord();
				return;
			}

			updateGuessedWords(letter);
		};
	}
});
