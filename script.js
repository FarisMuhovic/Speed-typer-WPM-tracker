const textwritting = document.getElementById("textwritting");
const paragraph = document.getElementById("paragraph");
const timerUi = document.getElementById("timerUI");
const wpmDisplay = document.getElementById("WpmDisplay");
const paragraphsList = [
  "I have a tiny garden area on my patio. Is it enough room to plant the three sisters - corn, beans, and squash - in the spring? Will there be enough corn for it to pollinate? Will there be enough room for the squash to spread? And most important of all, will I feel more connected to the earth and the gift of food if my garden grows well?",
  "I don't miss writing checks to pay for everything and mailing them off in stamped envelopes to pay my bills. I don't miss getting a whole chicken to cut up and then having to find someone foolish enough to eat the giblets. I don't miss unairconditioned houses. I don't miss twisting the handle on a mimeograph machine to make copies. I don't miss those aspects of my youth. But I do miss my youth.",
  "Remember back in the 1950s when we used to iron and starch jeans so that they had a crease in the front and back? When you hung up pants you'd just ironed you lined up the inseams and carefully laid them over the hanger with the creases held in place.The other day I realized I'm still lining up inseams and hanging jeans as if they had a crease to protect. As if my no-iron denim would hold a shape. As if I hadn't thought about how to hang pants in 60 years. ",
  "The first election I recall being aware of was Stevenson vs. Eisenhower back in the 1950s when I was in junior high. My parents liked Ike, but my friend Judy was adamant about Stevenson. The interesting thing to me back then was that she cared so much, thought it was so important. Now I realize why - Judy was Jewish and the election mattered to her in ways I didn't understand then. Since I turned 21, I've voted in every election. Have you?",
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos eveniet voluptates possimus dolores quod est nostrum sapiente repellat maiores. Rerum corporis veritatis doloribus dolore impedit doloremque blanditiis placeat omnis voluptates aspernatur facilis, amet cumque? Ipsa laboriosam deleniti, exercitationem id fugiat assumenda itaque facilis dicta rem ex? Asperiores consectetur id error.",
];
function startRun() {
  textwritting.value = "";
  // generate random number
  let randomNum = Math.floor(Math.random() * paragraphsList.length);
  const words = paragraphsList[randomNum].split("");
  // focus on text writting area
  textwritting.focus();
  // make paragraph into each letter
  words.forEach(word => {
    paragraph.innerHTML += `<span>${word}</span>`;
  });
  // timer
  let seconds = 0;
  let minutes = 0;
  setInterval(() => {
    seconds++;
    if (seconds == 60) {
      minutes++;
      seconds = 0;
    }
    // timer into gui
    if (seconds < 10 && minutes < 10) {
      timerUi.innerHTML = `0${minutes}:0${seconds}`;
    } else if (seconds < 10 && minutes > 10) {
      timerUi.innerHTML = `${minutes}:0${seconds}`;
    } else if (seconds > 10 && minutes < 10) {
      timerUi.innerHTML = `0${minutes}:${seconds}`;
    } else {
      timerUi.innerHTML = `${minutes}:${seconds}`;
    }
  }, 1000);
  textwritting.addEventListener("keyup", e => {
    let textval = textwritting.value;
    // Color functionality
    let guess = "";
    for (let i = 0; i < textval.length; i++) {
      if (textval[i] == paragraphsList[randomNum][i]) {
        paragraph.childNodes[i].classList.remove("wrong");
        paragraph.childNodes[i].classList.add("correct");
        guess += paragraphsList[randomNum][i];
      } else {
        paragraph.childNodes[i].classList.add("wrong");
        paragraph.childNodes[i].classList.remove("correct");
        guess = "";
      }
    }
    if (e.key == "Backspace") {
      for (let i = guess.length; i < paragraph.childElementCount; i++) {
        paragraph.childNodes[i].classList.remove("correct", "wrong");
      }
    }
    // When user deletes everything change colors back to default
    if (textval == "") {
      for (let i = 0; i < paragraph.childElementCount; i++) {
        paragraph.childNodes[i].classList.remove("correct", "wrong");
      }
    }
    wordsCount = guess.split(" ");
    // wpm calculator(words per minute)
    let wpm = wordsCount.length / (minutes + seconds / 60);
    // round to 2 decimals
    setInterval(() => {
      let wpm2 = wordsCount.length / (minutes + seconds / 60);
      wpmDisplay.innerHTML = Math.round(wpm2 * 100) / 100;
    }, 3500);
    wpmDisplay.innerHTML = Math.round(wpm * 100) / 100;
    // end the session if all letters are correct
    if (paragraphsList[randomNum] == guess) {
      alert(`Your WPM was ${wpm} words per minute.`);
      if (window.confirm){
        location.reload()
      }
    }
  });
}
function restart() {
  location.reload();
}
