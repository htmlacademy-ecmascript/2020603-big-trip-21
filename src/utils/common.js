function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getRandomInt(a, b) {
  if (a > b || a < 0 || b < 0) {
    return NaN;
  }

  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
}

function updateItem(items, update) {
  return items.map((item) => item.id === update.id ? update : item);
}

function convertFirstLetterToUpperCase(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export { getRandomArrayElement, getRandomInt, updateItem, convertFirstLetterToUpperCase };
