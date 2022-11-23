import fs from "fs";
import csvToJson from "csvtojson/v2";

interface IBook {
  Book: string;
  Author: string;
  Amount: string;
  Price: string;
}

const csvPath = `${__dirname}/csv/task-2-data.csv`;
const onError = (err) => console.log(err);
const writeTxtStream = fs.createWriteStream("output.txt", {
  flags: "w",
  encoding: "utf8",
});

csvToJson({ delimiter: ";" })
  .fromStream(fs.createReadStream(csvPath))
  .subscribe((json: IBook) => {
    writeTxtStream.write(JSON.stringify(json) + "\n");
  }, onError);
