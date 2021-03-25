// FISHER-YATES
export default function shuffle(sourceArray) {
  const array = [...sourceArray];
  let currentIndex = array.length - 1,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
    currentIndex = currentIndex - 1;
  }

  return array;
}
