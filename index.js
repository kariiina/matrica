const inputDate = document.querySelector("#date");
//const inputDate = inputField.querySelector("input[type=date]");

const today = new Date();

const date = today.getDate();
const month = today.getMonth();
const year = today.getFullYear();

console.log(`Today: ${date}.${month}.${year}`);

function getBelow22(number) {
  console.log("input: " + number);
  if (number > 22) {
    const calcNumber = number.toString();
    number = parseInt(calcNumber[0]) + parseInt(calcNumber[1]);
  }
  console.log("calc: " + number);
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
  const result = getBelow22(
    getDaySum(day) + getBelow22(month) + getYearSum(year)
  );
  console.log(result);
  return result;
}

getAllSum(date, month, year);
