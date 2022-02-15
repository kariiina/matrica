//const inputDate = document.querySelector("#date");
//const inputDate = inputField.querySelector("input[type=date]");

const today = new Date();

const date = today.getDate();
const month = today.getMonth();
const year = today.getFullYear();

function getBelow22(number) {
  if (number > 22) {
    const calcNumber = number.toString();
    number = parseInt(calcNumber[0]) + parseInt(calcNumber[1]);
  }
  return number;
}

function getDaySum(day) {
  return getBelow22(parseInt(day));
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
  const result = getBelow22(
    getDaySum(day) + getBelow22(month) + getYearSum(year)
  );
  return result;
}

getAllSum(date, month, year);

//console.log(document.querySelector('.inputName'));
let inputName = "";
let inputDate = "";

const resultContainer = document.querySelector(".result");

function getData() {
  resultContainer.innerHTML = "";
  inputName = document.querySelector(".inputName").value;
  inputDate = document.querySelector(".inputDate").value;
  //console.log(inputDate.slice(3,2));

  const result = `<p>Имя: ${inputName}</p>
      <p>Дата рождения: ${inputDate}</p>

      <p>Основные числа, энергии матрицы 
      ${getDaySum(inputDate.slice(0, 2))}, 
      ${getBelow22(inputDate.slice(3, 2))}, 6, 18, 9.</p>

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
  resultContainer.insertAdjacentHTML("beforeend", result);
  //resultContainer.append(...result);

  return 1;
}

const button = document.querySelector("button");
button.addEventListener("click", () => {
  getData();
});
