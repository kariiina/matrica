// Parameters
let inputName = "";
let inputDate = "";
let inputGender = "";

const resultContainer = document.querySelector(".result");
const beforeFirstParagraph = document.querySelector(".beforeFirstParagraph");
const fPfirstColumn = document.querySelector(".firstParagraph-firstColumn");
const fPsecondColumn = document.querySelector(".firstParagraph-secondColumn");
const sPfirstColumn = document.querySelector(".secondParagraph-firstColumn");
const sPsecondColumn = document.querySelector(".secondParagraph-secondColumn");
const tPfirstColumn = document.querySelector(".thirdParagraph-firstColumn");
const table = document.querySelector("table");

// Functions
function getBelow22(inputNumber) {
  let number = parseInt(inputNumber);
  if (number > 22) {
    const calcNumber = number.toString();
    number = parseInt(calcNumber[0]) + parseInt(calcNumber[1]);
  }
  return number;
}

function getDaySum(inputDay) {
  return getBelow22(inputDay);
}

function getYearSum(inputYear) {
  const yearToStriing = inputYear.toString();
  const yearResult =
    parseInt(yearToStriing[0]) +
    parseInt(yearToStriing[1]) +
    parseInt(yearToStriing[2]) +
    parseInt(yearToStriing[3]);
  return getBelow22(yearResult);
}

function getAllSum(calcDay, calcMonth, calcYear) {
  return getBelow22(calcDay + calcMonth + calcYear);
}

function showData(data, key, element) {
  for (let d of data[key]) {
    let tableColumn = `<li>${d}</li>`;
    element.insertAdjacentHTML("afterbegin", tableColumn);
  }
}

const jsonKey = (calcNum, gender, string) => {
  if (calcNum === 3 || calcNum === 4) {
    return `${calcNum}${string}${gender}`;
  }
  return `${calcNum}${string}`;
};

async function getData() {
  resetData();

  inputName = document.querySelector(".inputName").value;
  inputDate = document.querySelector(".inputDate").value;
  inputGender = document.querySelector(".inputGender:checked").value;
  console.log(`Input values: ${inputName}, ${inputDate}, ${inputGender}`);

  const inputDay = parseInt(inputDate.slice(0, 2));
  const inputMonth = parseInt(inputDate.slice(3, 5));
  const inputYear = parseInt(inputDate.slice(6, 10));

  const calcDay = getDaySum(inputDay);
  const calcMonth = inputMonth;
  const calcYear = getYearSum(inputYear);
  const dateToYearSum = parseInt(getAllSum(calcDay, calcMonth, calcYear));
  const allSum = getBelow22(
    getDaySum(inputDay) + inputMonth + getYearSum(inputYear) + dateToYearSum
  );
  console.log(
    `Calculated values: ${calcDay}, ${calcMonth}, ${calcYear}, ${dateToYearSum}, ${allSum}`
  );
  const url = "./data.json";
  const res = await fetch(url);
  const data = await res.json();

  const pBeforeFirstParagraph = `
  <p>Имя: ${inputName}</p>
  <p>Дата рождения: ${inputDate}</p>
  <p>Основные числа, энергии матрицы
      ${calcDay},
      ${calcMonth},
      ${calcYear},
      ${dateToYearSum},
      ${allSum}.
  </p>`;

  const fTableFcolumn = `${showData(
    data,
    jsonKey(calcDay, inputGender, "plus"),
    fPfirstColumn
  )}`;
  const fTableScolumn = `${showData(
    data,
    jsonKey(calcDay, inputGender, "minus"),
    fPsecondColumn
  )}`;
  const sTableFcolumn = `${showData(
    data,
    jsonKey(calcDay, inputGender, "plus"),
    sPfirstColumn
  )}`;
  const sTableScolumn = `${showData(
    data,
    jsonKey(calcDay, inputGender, "minus"),
    sPsecondColumn
  )}`;
  const tTableFcolumn = `${showData(
    data,
    jsonKey(calcDay, inputGender, "plus"),
    tPfirstColumn
  )}`;

  beforeFirstParagraph.insertAdjacentHTML("beforeend", pBeforeFirstParagraph);
  fPfirstColumn.insertAdjacentHTML("beforeend", fTableFcolumn);
  fPsecondColumn.insertAdjacentHTML("beforeend", fTableScolumn);
  sPfirstColumn.insertAdjacentHTML("beforeend", sTableFcolumn);
  sPsecondColumn.insertAdjacentHTML("beforeend", sTableScolumn);
  tPfirstColumn.insertAdjacentHTML("beforeend", tTableFcolumn);
}

function resetData() {
  resultContainer.classList.toggle("active");
  // beforeFirstParagraph.innerHTML = "";
  // fPfirstColumn.innerHTML = "";
  // fPsecondColumn.innerHTML = "";
  // sPfirstColumn.innerHTML = "";
  // sPsecondColumn.innerHTML = "";
  // tPfirstColumn.innerHTML = "";
}

// EvenListeners
const calculateButton = document.querySelector(".calculate");
calculateButton.addEventListener("click", () => {
  console.clear();
  getData();
});

const resetButton = document.querySelector(".reset");
resetButton.addEventListener("click", () => {
  console.clear();
  document.querySelector(".inputName").value = "";
  document.querySelector(".inputDate").value = "";
  resetData();
});
