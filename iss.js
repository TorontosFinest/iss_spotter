const request = require("request");
const fetchMyIP = function (callback) {
  const website = "https://api.ipify.org/?format=json";
  request(`${website}`, (error, response, body) => {
    if (error) {
      return callback(error, null);
    }

    if (response.statusCode !== 200) {
      callback(
        Error(`status code ${response.statusCode} when fetching IP: ${body}`),
        null
      );
      return;
    }

    const ip = JSON.parse(body)["ip"];
    callback(null, ip);
  });
};

const fetchCoordsByIP = function (ip, callback) {
  const website = `https://freegeoip.app/json/${ip}`;
  request(website, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      callback(
        Error(` Code ${response.statusCode} when fetching :${body}`),
        null
      );
      return;
    }

    const { latitude, longitude } = JSON.parse(body);

    callback(null, { latitude, longitude });
  });
};

const fetchISSFlyOverTimes = function (coords, callback) {
  request(
    `https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`,
    (err, response, body) => {
      if (err) {
        callback(err, null);
      }

      if (response.statusCode !== 200) {
        callback(
          Error(`Code ${response.statusCode} when fetching times: ${body}`),
          null
        );
        return;
      }

      const passings = JSON.parse(body).response;
      callback(null, passings);
    }
  );
};

const nextISSTimesForMyLocation = function (callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }
    fetchCoordsByIP(ip, (err, location) => {
      if (err) {
        return callback(err, null);
      }
      fetchISSFlyOverTimes(location, (err, nextTime) => {
        if (err) {
          return callback(err, null);
        }
        callback(null, nextTime);
      });
    });
  });
};

module.exports = {
  nextISSTimesForMyLocation,
};
