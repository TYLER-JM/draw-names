const fs = require("fs");
let arr = ["Bob", "Doug", "Graham", "Allen", "Dave", "Tommy"];

const shuffle = function(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

arr = shuffle(arr);

const promisedText = (receiver, giver) => {
  return new Promise((resolve, reject) => {
    let text = `Merry Christmas ${receiver}! You will receive a gift from ${giver}.`
    fs.writeFile(`./holdFiles/${receiver}.txt`, text, (error) => {
      if (error) {
        reject("failed to write to the file");
      }
    });
    resolve(text);
  });
}

const matchNames = arr => {
  let rand = Math.ceil(Math.random() * (arr.length - 1))

  let shift;
  for (let i = 0; i < arr.length; i++) {
    ((rand + i) < arr.length) ? shift = rand + i : shift = rand + i - arr.length;
    
    promisedText(arr[i], arr[shift])
      .then(res => console.log("done successfully"))
      .catch(error => console.log("failed"))
  }
};

matchNames(arr);