// Parameters
let inputName = "";
let inputDate = "";
let inputGender = "";

const beforeFirstParagraph = document.querySelector(".beforeFirstParagraph");
const fPfirstColumn = document.querySelector(".firstParagraph-firstColumn");
const fPsecondColumn = document.querySelector(".firstParagraph-secondColumn");
const fPthirdColumn = document.querySelector(".firstParagraph-thirdColumn");
const fPfourthColumn = document.querySelector(".firstParagraph-fourthColumn");
const sPfirstColumn = document.querySelector(".secondParagraph-firstColumn");
const sPsecondColumn = document.querySelector(".secondParagraph-secondColumn");
const sPthirdColumn = document.querySelector(".secondParagraph-thirdColumn");
const sPfourthColumn = document.querySelector(".secondParagraph-fourthColumn");
const tPfirstColumn = document.querySelector(".thirdParagraph-firstColumn");
const tPsecondColumn = document.querySelector(".thirdParagraph-secondColumn");
const table = document.querySelector("table");
const result = document.querySelector(".result");
const exportToWord = document.querySelector(".export");

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
  return "";
}

const jsonKey = (calcNum, gender, string) => {
  if (calcNum === 3 || calcNum === 4) {
    const result1 = `${calcNum}${string}${gender}`;
    console.log(result1);
    return result1;
  }
  const result2 = `${calcNum}${string}`;
  console.log(result2);
  return result2;
};

async function getData() {
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
  const fTableTcolumn = `${showData(
    data,
    jsonKey(calcMonth, inputGender, "plus"),
    fPthirdColumn
  )}`;
  const fTableOcolumn = `${showData(
    data,
    jsonKey(calcMonth, inputGender, "minus"),
    fPfourthColumn
  )}`;
  const sTableFcolumn = `${showData(
    data,
    jsonKey(calcYear, inputGender, "plus"),
    sPfirstColumn
  )}`;
  const sTableScolumn = `${showData(
    data,
    jsonKey(calcYear, inputGender, "minus"),
    sPsecondColumn
  )}`;
  const sTableTcolumn = `${showData(
    data,
    jsonKey(dateToYearSum, inputGender, "plus"),
    sPthirdColumn
  )}`;
  const sTableOcolumn = `${showData(
    data,
    jsonKey(dateToYearSum, inputGender, "minus"),
    sPfourthColumn
  )}`;
  const tTableFcolumn = `${showData(
    data,
    jsonKey(allSum, inputGender, "plus"),
    tPfirstColumn
  )}`;
  const tTableScolumn = `${showData(
    data,
    jsonKey(allSum, inputGender, "minus"),
    tPsecondColumn
  )}`;

  beforeFirstParagraph.insertAdjacentHTML("beforeend", pBeforeFirstParagraph);
  fPfirstColumn.insertAdjacentHTML("beforeend", fTableFcolumn);
  fPsecondColumn.insertAdjacentHTML("beforeend", fTableScolumn);
  fPthirdColumn.insertAdjacentHTML("beforeend", fTableTcolumn);
  fPfourthColumn.insertAdjacentHTML("beforeend", fTableOcolumn);
  sPfirstColumn.insertAdjacentHTML("beforeend", sTableFcolumn);
  sPsecondColumn.insertAdjacentHTML("beforeend", sTableScolumn);
  sPthirdColumn.insertAdjacentHTML("beforeend", sTableTcolumn);
  sPfourthColumn.insertAdjacentHTML("beforeend", sTableOcolumn);
  tPfirstColumn.insertAdjacentHTML("beforeend", tTableFcolumn);
  tPsecondColumn.insertAdjacentHTML("beforeend", tTableScolumn);

  document
    .querySelector(".calcDayPlus")
    .insertAdjacentHTML("afterbegin", `${calcDay} `);
  document
    .querySelector(".calcDayMinus")
    .insertAdjacentHTML("afterbegin", `${calcDay} `);
  document
    .querySelector(".calcMonthPlus")
    .insertAdjacentHTML("afterbegin", `${calcMonth} `);
  document
    .querySelector(".calcMonthMinus")
    .insertAdjacentHTML("afterbegin", `${calcMonth} `);
  document
    .querySelector(".calcYearPlus")
    .insertAdjacentHTML("afterbegin", `${calcYear} `);
  document
    .querySelector(".calcYearMinus")
    .insertAdjacentHTML("afterbegin", `${calcYear} `);
  document
    .querySelector(".dateToYearSumPlus")
    .insertAdjacentHTML("afterbegin", `${dateToYearSum} `);
  document
    .querySelector(".dateToYearSumMinus")
    .insertAdjacentHTML("afterbegin", `${dateToYearSum} `);
  document
    .querySelector(".allSumPlus")
    .insertAdjacentHTML("afterbegin", `${allSum} `);
  document
    .querySelector(".allSumMinus")
    .insertAdjacentHTML("afterbegin", `${allSum} `);
}

function resetData() {
  location.reload();
}

function exportHTML() {
  var header =
    "<html xmlns:o='urn:schemas-microsoft-com:office:office' " +
    "xmlns:w='urn:schemas-microsoft-com:office:word' " +
    "xmlns='http://www.w3.org/TR/REC-html40'>" +
    "<head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title></head><body>";
  var footer = "</body></html>";
  var sourceHTML = header + document.getElementById("word").innerHTML + footer;

  var source =
    "data:application/vnd.ms-word;charset=utf-8," +
    encodeURIComponent(sourceHTML);
  var fileDownload = document.createElement("a");
  document.body.appendChild(fileDownload);
  fileDownload.href = source;
  fileDownload.download = `matrica_${
    document.querySelector(".inputName").value
  }.doc`;
  fileDownload.click();
  document.body.removeChild(fileDownload);
}

// EvenListeners
const calculateButton = document.querySelector(".calculate");
calculateButton.addEventListener("click", () => {
  if (
    document.querySelector(".inputName").value.length == 0 ||
    document.querySelector(".inputDate").value.length == 0
  ) {
    return;
  }
  result.classList.toggle("hidden");
  exportToWord.classList.remove("hidden");
  calculateButton.classList.add("hidden");
  console.clear();
  getData();
});

exportToWord.addEventListener("click", () => {
  exportHTML();
});

const resetButton = document.querySelector(".reset");
resetButton.addEventListener("click", () => {
  result.classList.add("hidden");
  exportToWord.classList.add("hidden");
  calculateButton.classList.remove("hidden");
  console.clear();
  document.querySelector(".inputName").value = "";
  document.querySelector(".inputDate").value = "";
  resetData();
});

// window.onload = (event) => {
//  result.classList.toggle("hidden");
// }

var today = new Date();
var dd = String(today.getDate()).padStart(2, "0");
var mm = String(today.getMonth() + 1).padStart(2, "0");
var yyyy = today.getFullYear();

today = dd + "." + mm + "." + yyyy;
document.getElementById("date").placeholder = today;

//Auth
var o = document.getElementById("protect-overlay");
o.getElementsByTagName("form")[0].onsubmit = function () {
  if (this.answer.value === atob("S2Fra2E4OW1hdHJpY2E=")) {
    o.style.display = "none";
    localStorage.setItem("auth", this.answer.value);
  } else {
    alert("Неправильный пароль!");
  }
  return false;
};

// function setLocalStorage() {
//   localStorage.setItem('lang', lang);
// }
// window.addEventListener('beforeunload', setLocalStorage) // сохранить данные только перед закрытием страницы

function getLocalStorage() {
  if (localStorage.getItem("auth") === atob("S2Fra2E4OW1hdHJpY2E=")) {
    o.style.display = "none";
  }
}
window.addEventListener("load", getLocalStorage);
