/* eslint-disable import/prefer-default-export */
export function shuffle(squareNumberay) {
  let currentIndex = squareNumberay.length; let temporaryValue; let
    randomIndex;
  const numberArr = squareNumberay;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = squareNumberay[currentIndex];
    numberArr[currentIndex] = squareNumberay[randomIndex];
    numberArr[randomIndex] = temporaryValue;
  }

  return squareNumberay;
}
