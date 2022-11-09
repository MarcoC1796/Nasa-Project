const { parse } = require("csv-parse");
const fs = require("fs"); // built in file system module

const habitablePlanets = [];

function isHabitablePlanet(planet) {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 && // light limit to sustain water
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6 // limit of radius size of the planet
  );
}

fs.createReadStream("./../data/kepler_data.csv") // will read data as Buffers (collections of bytes)
  // a pipe is an additional processing step of the data stream
  .pipe(
    parse({
      comment: "#",
      columns: true, // will return each row in the csv file as a JavaScript Object
    })
  )
  .on("data", (data) => {
    if (isHabitablePlanet(data)) {
      habitablePlanets.push(data);
    }
  })
  .on("error", (err) => {
    console.log(err);
  })
  .on("end", () => {
    console.log(
      habitablePlanets.map((planet) => {
        return planet["kepler_name"];
      })
    );
    console.log(`${habitablePlanets.length} habitable planets found!`);
  });

module.exports = {
  planets: habitablePlanets,
};
