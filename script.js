const quizQuestions = [
  {
    question: "India is a federal union comprising of how many states?",
    options: ["Twenty-eight", "Twenty-nine", "Twenty-six", "Twenty-four"],
    answer: "Twenty-eight",
    answered: false,
  },
  {
    question: "India has how many union territories?",
    options: ["Eight", "Six", "Nine", "Seven"],
    answer: "Eight",
    answered: false,
  },
  {
    question: "What is the name of India's largest river?",
    options: ["Godavari", "Krishna", "Ganga", "Mahanadi"],
    answer: "Ganga",
    answered: false,
  },
  {
    question: "Which is the largest coffee-producing state of India?",
    options: ["Kerala", "Tamil Nadu", "Karnataka", "Arunachal Pradesh"],
    answer: "Karnataka",
    answered: false,
  },
  {
    question: "Which state has the largest area?",
    options: ["Maharashtra", "Madhya Pradesh", "Uttar Pradesh", "Rajasthan"],
    answer: "Rajasthan",
    answered: false,
  },
];

let currentQuestion = 0;
let score = 0;
let alreadyAnswered = false;

const container = document.querySelector(".container");
const child = document.querySelector(".child");
const message = document.querySelector(".message");
const question = document.getElementById("questions");
const answer = document.getElementById("answers");
const option = document.querySelectorAll(".options");
const prevBtn = document.querySelector(".left");
const nextBtn = document.querySelector(".right");
const submit = document.getElementById("submit");

function displayQuestion() {
  const currentQuizQuestions = quizQuestions[currentQuestion];
  if (currentQuestion === 0) {
    prevBtn.style.display = "none";
  }
  question.innerText = currentQuizQuestions.question;
  option.forEach((options, index) => {
    options.innerText = currentQuizQuestions.options[index];
  });
}

function nextQuestion() {
  currentQuestion++;
  // location.reload();
  alreadyAnswered = false;
  clearOptions();
  // console.log(quizQuestions.length);
  if (currentQuestion < quizQuestions.length) {
    displayQuestion();
    if (currentQuestion === quizQuestions.length - 1) {
      // hide the button by setting its display property to none
      nextBtn.style.display = "none";
      prevBtn.style.display = "inline-block";
    } else {
      // console.log('here');
      prevBtn.style.display = "inline-block";
      nextBtn.style.display = "inline-block";
    }
  }
}

function prevQuestion() {
  currentQuestion--;
  alreadyAnswered = false;
  clearOptions();
  if (currentQuestion === 0) {
    prevBtn.style.display = "hidden";
    nextBtn.style.display = "inline-block";
  } else {
    nextBtn.style.display = "inline-block";
    prevBtn.style.display = "inline-block";
  }
  if (currentQuestion >= 0) {
    displayQuestion();
  }
}

function checkAnswer(e, index) {
  if (quizQuestions[currentQuestion].answered === true) {
    message.innerText = "You have already answered this question";
    message.style.color = "red";
    setTimeout(messageDisplay, 3000);
    return;
  }
  let correctAnswer = quizQuestions[currentQuestion].answer;
  let selectedOption = quizQuestions[currentQuestion].options[index];
  if (
    e.target.classList.contains("red") ||
    e.target.classList.contains("green")
  ) {
    window.reload();
  }
  // console.log(selectedOption === correctAnswer);
  // console.log(index);s
  if (selectedOption === correctAnswer) {
    score++;
    e.target.classList.add("green");
  } else {
    e.target.classList.add("red");
    option.forEach((options) => {
      // console.log(options.innerText);
      if (options.innerText === correctAnswer) {
        options.classList.add("green");
      }
    });
  }
  // quizQuestions[currentQuestion].answered = selectedOption;
  // console.log(quizQuestions[currentQuestion].answered);

  quizQuestions[currentQuestion].answered = true;
  console.log(alreadyAnswered, index);
}

function messageDisplay() {
  message.innerText = "";
}

function clearOptions() {
  option.forEach((options) => {
    if (options.classList.contains("red")) {
      options.classList.remove("red");
    } else if (options.classList.contains("green")) {
      options.classList.remove("green");
    }
  });
}

function submitAnswers() {
  container.innerText = "";
  container.innerHTML = `
  <div>
    <h1 id="score">Total Score: ${score}</h1>
  </div>
   <div>
    <button id="playAgain">Play Again</button>
    </div>
  `;
  playAgain.addEventListener("click", pyAgain);
}

function pyAgain() {
  location.reload();
}

// submit option
submit.addEventListener("click", submitAnswers);

// option.addEventListener('click', checkAnswer);
option.forEach((options, index) => {
  options.addEventListener("click", (e) => checkAnswer(e, index));
});

// for next question
nextBtn.addEventListener("click", nextQuestion);

// for prev question
prevBtn.addEventListener("click", prevQuestion);

//  to display 1st question
displayQuestion();
