// Parameters
let inputName = "";
let inputDate = "";
let inputGender = "";

const resultContainer = document.querySelector(".result");

// Functions
function getBelow22(inputNumber) {
  let number = parseInt(inputNumber);
  if (number > 22) {
    const calcNumber = number.toString();
    number = parseInt(calcNumber[0]) + parseInt(calcNumber[1]);
  }
  return number;
}

function getDaySum(day) {
  return getBelow22(day);
}

function getYearSum(year) {
  const calcYear = year.toString();
  const yearResult =
    parseInt(calcYear[0]) +
    parseInt(calcYear[1]) +
    parseInt(calcYear[2]) +
    parseInt(calcYear[3]);
  return getBelow22(yearResult);
}

function getAllSum(day, month, year) {
  return getBelow22(getDaySum(day) + parseInt(month) + getYearSum(year));
}

const getJsonData = fetch("./data.json")
  .then((response) => response.json())
  .then((jsondata) => {
    return jsondata;
  });

// const obj = JSON.parse(jsonData);
const jsonToObj = async () => {
  const jsonObj = await getJsonData;
  console.log(jsonObj);
  return jsonObj;
};
//jsonToObj();

//console.log(jsonToObj[name]);

function getData() {
  resetData();

  //get input values
  inputName = document.querySelector(".inputName").value;
  inputDate = document.querySelector(".inputDate").value;
  inputGender = document.querySelector(".inputGender:checked").value;
  console.log(
    `Input values: ${inputName}(name), ${inputDate}(date), ${inputGender}(gender)`
  );

  const date = parseInt(inputDate.slice(0, 2));
  const month = parseInt(inputDate.slice(3, 5));
  const year = parseInt(inputDate.slice(6, 10));
  const dateToYearSum = parseInt(getAllSum(date, month, year));
  const allSum = getBelow22(
    getDaySum(date) + month + getYearSum(year) + dateToYearSum
  );

  const result = `<p>Имя: ${inputName}</p>
      <p>Дата рождения: ${inputDate}</p>

      <p>Основные числа, энергии матрицы 
      ${getDaySum(date)}, 
      ${month}, 
      ${getYearSum(year)}, 
      ${dateToYearSum}, 
      ${allSum}.
      </p>

      <p>Энергии, находящиеся от рождения в плюсовом состоянии. Это основной
      ресурс человека, который будет помогать справляться с трудностями и
      достигать целей.</p>
      
      <p>Энергии от рождения в самом минусовом состоянии. В течение жизни
      человек через события, отношения, поступки выводит их в плюс. По этим
      энергиям будут проходить повторяющиеся события.</p>

      <p>Личная сила. Необходимо раскрывать в себе качества по данной энергии,
      чтобы реализоваться в социуме. От рождения нейтральна.</p>     
      
      `;

  //const img = `<img src="${r.urls.regular}" alt="${r.alt_description}">`;
  return resultContainer.insertAdjacentHTML("beforeend", result);
  //resultContainer.append(...result);
}

//clear representaion for result part
function resetData() {
  resultContainer.innerHTML = "";
}

// EvenListeners
const calculateButton = document.querySelector(".calculate");
calculateButton.addEventListener("click", () => {
  getData();
});

const resetButton = document.querySelector(".reset");
resetButton.addEventListener("click", () => {
  resetData();
});
