const { nextISSTimesForMyLocation } = require("./iss_promised");
const { print } = require("./index");

nextISSTimesForMyLocation()
  .then((passTimes) => {
    print(passTimes);
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });
