// The global variable
const bookList = ["The Hound of the Baskervilles", "On The Electrodynamics of Moving Bodies", "Philosophiæ Naturalis Principia Mathematica", "Disquisitiones Arithmeticae"];

// Change code below this line
function add(list, bookName) {
  return [...list, bookName];
  
  // Change code above this line
}

// Change code below this line
function remove(list, bookName) {
  return list.filter(book => book !== bookName);

    // Change code above this line
}