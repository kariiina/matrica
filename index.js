// Parameters
let inputName = "";
let inputDate = "";

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

function getData() {
  resultContainer.innerHTML = "";
  inputName = document.querySelector(".inputName").value;
  inputDate = document.querySelector(".inputDate").value;
  console.log(inputDate);

  const date = inputDate.slice(0, 2);
  const month = inputDate.slice(3, 5);
  const year = inputDate.slice(6, 8);
  const dateToYearSum = getAllSum(date, month, year);

  const result = `<p>Имя: ${inputName}</p>
      <p>Дата рождения: ${inputDate}</p>

      <p>Основные числа, энергии матрицы 
      ${date}, 
      ${month}, 
      ${year}, 
      ${dateToYearSum}, 
      ${year}.
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
  returnresultContainer.insertAdjacentHTML("beforeend", result);
  //resultContainer.append(...result);
}

// EvenListeners
const button = document.querySelector("button");
button.addEventListener("click", () => {
  getData();
});
