/*const {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation,
} = require("./iss");

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }

  console.log("It worked! Returned IP:", ip);
});

fetchCoordsByIP("10.22.100.000", (error, coords) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }

  console.log("It worked! Returned coords:", coords);
});

const coordinates = { latitude: "75.123123", longitude: "-150.62353" };

fetchISSFlyOverTimes(coordinates, (error, passTimes) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }

  console.log("It worked! Returned flyover times:", passTimes);
}); */

const { nextISSTimesForMyLocation } = require("./iss");

const print = function (passTimes) {
  for (times of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(times.risetime);
    const duration = times.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  print(passTimes);
});

module.exports = { print };
