const jsonfile = require("jsonfile");
const moment = require("moment");
const { simpleGit } = require("simple-git");
const FILE_PATH = "./data.json";

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const makeCommit = (n) => {
  if (n === 0) return simpleGit().push();

  // Set a default start date (August 1, 2023)
  const startDate = moment("2023-08-01");

  // Generate a random duration within the specified range (until January 31, 2024)
  const duration = getRandomInt(0, moment("2024-01-31").diff(startDate, 'days'));

  // Calculate the next date
  const nextDate = startDate.clone().add(duration, 'days');

  // Generate random hours, minutes, and seconds
  const hours = getRandomInt(0, 23);
  const minutes = getRandomInt(0, 59);
  const seconds = getRandomInt(0, 59);

  const DATE = nextDate.format(`YYYY-MM-DDT${hours}:${minutes}:${seconds}`) + nextDate.format("Z");

  const data = {
    date: DATE,
  };
  console.log(DATE);

  jsonfile.writeFile(FILE_PATH, data, () => {
    simpleGit().add(FILE_PATH).commit(DATE, { "--date": DATE }, makeCommit.bind(this, --n));
  });
};

makeCommit(50);
