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

  const fTableFcolumn = `${showData(data, "1plus", fPfirstColumn)}`;
  const fTableScolumn = `${showData(data, "1minus", fPsecondColumn)}`;
  // <p></p>
  // <table>
  //     <tr>
  //         <td>
  //             <ul></ul>
  //         </td>
  //         <td>
  //             <ul>${showData(data, "1minus")}</ul>
  //         </td>
  //     </tr>
  // </table>
  // <p></p>
  // ${calcYear},
  // ${dateToYearSum}
  // <p></p>
  // ${allSum}

  beforeFirstParagraph.insertAdjacentHTML("beforeend", pBeforeFirstParagraph);
  fPfirstColumn.insertAdjacentHTML("beforeend", fTableFcolumn);
  fPsecondColumn.insertAdjacentHTML("beforeend", fTableScolumn);
}

function resetData() {
  //resultContainer.innerHTML = "";
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
