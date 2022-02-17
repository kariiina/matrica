// Parameters
let inputName = "";
let inputDate = "";
let inputGender = "";

const resultContainer = document.querySelector(".result");
const beforeFirstParagraph = document.querySelector(".beforeFirstParagraph");
const fPfirstColumn = document.querySelector(".firstParagraph-firstColumn");

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

// const getJsonData = fetch("./data.json")
//   .then((response) => response.json())
//   .then((jsondata) => {
//     return jsondata;
//   });
// const jsonToObj = async () => {
//   const jsonObj = await getJsonData;
//   return jsonObj;
// };
// jsonToObj();

function showData(data, key, element) {
  //console.log("showData in grid: " + data);
  for (let d of data[key]) {
    let tableColumn = `<li>${d}</li>`;
    element.insertAdjacentHTML("afterbegin", tableColumn);
  }
}

async function getData() {
  //clear previous result
  resetData();
  //get input values
  inputName = document.querySelector(".inputName").value;
  inputDate = document.querySelector(".inputDate").value;
  inputGender = document.querySelector(".inputGender:checked").value;
  console.log(`Input values: ${inputName}, ${inputDate}, ${inputGender}`);
  //calculate input values
  const inputDay = parseInt(inputDate.slice(0, 2));
  const inputMonth = parseInt(inputDate.slice(3, 5));
  const inputYear = parseInt(inputDate.slice(6, 10));
  //calculate result values
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
  //return true;
}

//clear representaion for result part
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
