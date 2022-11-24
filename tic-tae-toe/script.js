let btnRef = document.querySelectorAll(".btn-option");
let popupRef = document.querySelector(".popup");
let newgame = document.getElementById("new");
let restart = document.getElementById("reset");
let msgRef = document.getElementById("message");

let winningCombinations = [
  [0, 1, 2],
  [0, 3, 6],
  [2, 5, 8],
  [6, 7, 8],
  [3, 4, 5],
  [1, 4, 7],
  [0, 4, 8],
  [2, 4, 6],
];

const winFunction = (letter) => {
  disableButtons(letter);
};

const disableButtons = (letter) => {
  btnRef.forEach((element) => (element.disabled = true));
  popupRef.classList.remove("hide");
  document.getElementById("message").innerText = `${letter} wins`;
};

const enableButtons = () => {
  btnRef.forEach((ele) => {
    ele.innerText = "";
    ele.disabled = false;
  });
  popupRef.classList.add("hide");
  count = 0
  xTurn = true
};

const winChecker = () => {
  for (let i of winningCombinations) {
    let [element1, element2, element3] = [
      btnRef[i[0]].innerText,
      btnRef[i[1]].innerText,
      btnRef[i[2]].innerText,
    ];

    if (element1 != "" && element2 != "" && element3 != "") {
      if (element1 == element2 && element1 == element3) {
        winFunction(element1);
      }
    }
  }
};

let xTurn = true;
let count = 0;

btnRef.forEach((ele) => {
  ele.addEventListener("click", () => {
    if (xTurn) {
      xTurn = false;
      ele.innerText = "X";
      ele.disabled = true;
    } else {
      xTurn = true;
      ele.innerText = "O";
      ele.disabled = true;
    }

    count += 1;
    if (count === 9) {
        winChecker()
        popupRef.classList.remove("hide");
        document.getElementById("message").innerText = `Its a Draw`;
    }
    winChecker();
  });
});

newgame.onclick = enableButtons
restart.onclick = enableButtons

